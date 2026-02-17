// src/pages/AdminEvents.jsx

import React, { useEffect, useState } from "react";
import AdminLayout from "./AdminLayout";
import { supabase } from "../supabase";
import Loader from "../Components/Loader";
import { showToast } from "../Components/Toast";
import ConfirmModal from "../Components/ConfirmModal";

export default function AdminEvents() {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    // Form State
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const [imageFile, setImageFile] = useState(null);
    const [uploading, setUploading] = useState(false);

    // Delete State
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [eventToDelete, setEventToDelete] = useState(null);

    const fetchEvents = async () => {
        try {
            const { data, error } = await supabase
                .from("recent_events")
                .select("*")
                .order("created_at", { ascending: false });

            if (error) throw error;
            setEvents(data || []);
        } catch (error) {
            console.error("Error fetching events:", error);
            showToast.error("Failed to fetch events.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEvents();
    }, []);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Validate Type
            if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
                showToast.error("Only JPG, PNG, and WebP images are allowed.");
                e.target.value = "";
                return;
            }
            // Validate Size (2MB)
            if (file.size > 2 * 1024 * 1024) {
                showToast.error("Image must be smaller than 2MB.");
                e.target.value = "";
                return;
            }
            setImageFile(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title || !description || !imageFile) {
            showToast.error("Please fill all fields and select an image.");
            return;
        }

        setUploading(true);
        let uploadedPath = null;

        try {
            // 1. Upload Image
            const fileExt = imageFile.name.split(".").pop();
            const fileName = `${Date.now()}.${fileExt}`;
            const filePath = `${fileName}`;

            const { error: uploadError } = await supabase.storage
                .from("events")
                .upload(filePath, imageFile);

            if (uploadError) throw uploadError;

            uploadedPath = filePath; // Track for rollback

            // 2. Get Public URL
            const { data: { publicUrl } } = supabase.storage
                .from("events")
                .getPublicUrl(filePath);

            // 3. Insert into DB
            const { error: dbError } = await supabase.from("recent_events").insert([
                {
                    title,
                    description,
                    image: publicUrl,
                },
            ]);

            if (dbError) throw dbError;

            showToast.success("Event added successfully!");

            // Reset Form
            setTitle("");
            setTitle("");
            setImageFile(null);
            document.getElementById("eventInput").value = "";

            fetchEvents();

        } catch (error) {
            console.error("Error adding event:", error);
            showToast.error("Failed to add event: " + error.message);

            // Rollback: Delete uploaded file if DB insert failed
            if (uploadedPath) {
                await supabase.storage.from("events").remove([uploadedPath]);
            }
        } finally {
            setUploading(false);
        }
    };

    const handleDeleteClick = (event) => {
        setEventToDelete(event);
        setIsDeleteModalOpen(true);
    };

    const confirmDelete = async () => {
        if (!eventToDelete) return;

        try {
            // 1. Delete from Storage
            // Extract filename from URL
            const urlParts = eventToDelete.image.split("/");
            const fileName = urlParts[urlParts.length - 1];

            if (fileName) {
                const { error: storageError } = await supabase.storage
                    .from("events")
                    .remove([fileName]);

                if (storageError) console.warn("Storage delete warning:", storageError);
            }

            // 2. Delete from DB
            const { error: dbError } = await supabase
                .from("recent_events")
                .delete()
                .eq("id", eventToDelete.id);

            if (dbError) throw dbError;

            showToast.success("Event deleted successfully.");
            fetchEvents();
        } catch (error) {
            console.error("Error deleting event:", error);
            showToast.error("Failed to delete event.");
        } finally {
            setIsDeleteModalOpen(false);
            setEventToDelete(null);
        }
    };

    return (
        <AdminLayout>
            <h1 className="text-2xl font-bold mb-6 text-gray-800">Manage Events</h1>

            {/* Add New Event Form */}
            <div className="bg-white p-6 rounded-xl border shadow mb-8">
                <h2 className="text-lg font-semibold mb-4 text-green-700">Add New Event</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Event Title</label>
                        <input
                            type="text"
                            className="input input-bordered w-full"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="e.g., Annual Sports Day"
                            disabled={uploading}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                        <textarea
                            className="textarea textarea-bordered w-full"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Enter event details..."
                            disabled={uploading}
                            rows="3"
                        ></textarea>
                    </div>



                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Event Image (Max 2MB)</label>
                        <input
                            id="eventInput"
                            type="file"
                            accept="image/png, image/jpeg, image/webp"
                            className="file-input file-input-bordered w-full"
                            onChange={handleFileChange}
                            disabled={uploading}
                        />
                    </div>

                    <button
                        type="submit"
                        className={`btn btn-primary w-full ${uploading ? 'loading' : ''}`}
                        disabled={uploading}
                    >
                        {uploading ? "Uploading..." : "Add Event"}
                    </button>
                </form>
            </div>

            {/* List Events */}
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Recent Events List</h2>

            {loading ? (
                <Loader />
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {events.length === 0 ? (
                        <p className="text-gray-500 col-span-3 text-center py-8">No events found.</p>
                    ) : (
                        events.map((event) => (
                            <div key={event.id} className="bg-white rounded-xl shadow border overflow-hidden flex flex-col">
                                <div className="md:h-48 h-40 bg-gray-200 overflow-hidden relative">
                                    <img
                                        src={event.image}
                                        alt={event.title}
                                        className="w-full h-full object-cover"
                                        onError={(e) => { e.target.src = 'https://placehold.co/600x400?text=No+Image' }}
                                    />
                                    <div className="absolute top-2 right-2">
                                        <button
                                            onClick={() => handleDeleteClick(event)}
                                            className="btn btn-circle btn-xs btn-error text-white opacity-90 hover:opacity-100 shadow-md"
                                            title="Delete Event"
                                        >
                                            ✕
                                        </button>
                                    </div>
                                </div>
                                <div className="p-4 flex-1 flex flex-col">

                                    <h3 className="font-bold text-gray-800 text-lg mb-2">{event.title}</h3>
                                    <p className="text-gray-600 text-sm line-clamp-3">{event.description}</p>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            )}

            <ConfirmModal
                isOpen={isDeleteModalOpen}
                title="Delete Event"
                message={`Are you sure you want to delete "${eventToDelete?.title}"?`}
                onConfirm={confirmDelete}
                onCancel={() => setIsDeleteModalOpen(false)}
                isDangerous={true}
            />
        </AdminLayout>
    );
}
