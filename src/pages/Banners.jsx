// src/pages/Banners.jsx

import React, { useState, useEffect } from "react";
import AdminLayout from "./AdminLayout";
import { supabase } from "../supabase";
import Loader from "../Components/Loader";
import { showToast } from "../Components/Toast";
import ConfirmModal from "../Components/ConfirmModal";

export default function Banners() {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);

  // Form State
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [uploading, setUploading] = useState(false);

  // Delete State
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [bannerToDelete, setBannerToDelete] = useState(null);

  // Load banners from Supabase
  const loadBanners = async () => {
    try {
      const { data, error } = await supabase
        .from("banners")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setBanners(data || []);
    } catch (error) {
      console.error("Error fetching banners:", error);
      showToast.error("Failed to fetch banners.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBanners();
  }, []);

  // Handle File Selection
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
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      // Reuse validation logic manually since we can't easily trigger the input's onChange
      if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
        showToast.error("Only JPG, PNG, and WebP images are allowed.");
        return;
      }
      if (file.size > 2 * 1024 * 1024) {
        showToast.error("Image must be smaller than 2MB.");
        return;
      }
      setImageFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  // Add Banner
  const handleAdd = async (e) => {
    e.preventDefault();

    if (!imageFile) {
      showToast.error("Please select an image!");
      return;
    }

    setUploading(true);
    let uploadedPath = null;

    try {
      // 1. Safe filename
      const fileExt = imageFile.name.split(".").pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `${fileName}`;

      // 2. Upload to Supabase Storage
      const { error: uploadErr } = await supabase.storage
        .from("banners")
        .upload(filePath, imageFile);

      if (uploadErr) throw uploadErr;

      uploadedPath = filePath; // Track for rollback

      // 3. Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from("banners")
        .getPublicUrl(filePath);

      // 4. Insert into DB
      const { error: dbError } = await supabase.from("banners").insert([{ image_url: publicUrl }]);

      if (dbError) throw dbError;

      showToast.success("Banner added successfully!");

      // Reset
      setImageFile(null);
      setPreview(null);

      // Clear file input
      const fileInput = document.getElementById("bannerInput");
      if (fileInput) fileInput.value = "";

      loadBanners();
    } catch (error) {
      console.error("Error adding banner:", error);
      showToast.error("Failed to add banner: " + error.message);

      // Rollback
      if (uploadedPath) {
        await supabase.storage.from("banners").remove([uploadedPath]);
      }
    } finally {
      setUploading(false);
    }
  };

  const handleDeleteClick = (banner) => {
    setBannerToDelete(banner);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!bannerToDelete) return;

    try {
      // 1. Extract file name from URL
      const segments = bannerToDelete.image_url.split("/");
      const imageName = segments[segments.length - 1];

      // 2. Delete from storage
      if (imageName) {
        const { error: storageError } = await supabase.storage.from("banners").remove([imageName]);
        if (storageError) console.warn("Storage delete warning:", storageError);
      }

      // 3. Delete from DB
      const { error: dbError } = await supabase.from("banners").delete().eq("id", bannerToDelete.id);

      if (dbError) throw dbError;

      showToast.success("Banner deleted successfully.");
      loadBanners();
    } catch (error) {
      console.error("Error deleting banner:", error);
      showToast.error("Failed to delete banner.");
    } finally {
      setIsDeleteModalOpen(false);
      setBannerToDelete(null);
    }
  };

  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold mb-6 text-green-700">
        Hero Banners
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

        {/* Add Banner Form */}
        <form
          onSubmit={handleAdd}
          className="bg-white p-6 rounded-xl border shadow h-fit"
        >
          <h2 className="text-lg font-semibold mb-4">Add Banner</h2>

          {/* Drag Drop Zone */}
          <div
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
            className={`h-40 border-2 border-dashed rounded-xl flex flex-col items-center justify-center cursor-pointer relative transition-colors ${uploading ? 'bg-gray-50 border-gray-300' : 'border-green-400 hover:bg-green-50'
              }`}
          >
            <p className="text-gray-500">Drag & Drop Image</p>
            <p className="text-gray-400 text-sm">or click to choose</p>

            <input
              id="bannerInput"
              type="file"
              accept="image/png, image/jpeg, image/webp"
              onChange={handleFileChange}
              className="absolute inset-0 opacity-0 cursor-pointer"
              disabled={uploading}
            />
          </div>

          {preview && (
            <div className="mt-4 relative">
              <img src={preview} loading="lazy" decoding="async" className="w-full rounded-xl shadow object-cover h-48" alt="Preview" />
              <button
                type="button"
                onClick={() => {
                  setImageFile(null);
                  setPreview(null);
                  document.getElementById("bannerInput").value = "";
                }}
                className="absolute top-2 right-2 btn btn-circle btn-xs btn-error text-white"
              >✕</button>
            </div>
          )}

          <button
            className={`w-full mt-4 btn btn-primary ${uploading ? 'loading' : ''}`}
            disabled={uploading || !imageFile}
          >
            {uploading ? "Uploading..." : "Upload Banner"}
          </button>
        </form>

        {/* Banner List */}
        <div className="bg-white p-6 rounded-xl border shadow">
          <h2 className="text-lg font-semibold mb-4">Existing Banners</h2>

          {loading ? (
            <Loader />
          ) : (
            <div className="space-y-4">
              {banners.length === 0 ? (
                <p className="text-gray-400 text-center py-8">No banners uploaded yet.</p>
              ) : (
                banners.map((b) => (
                  <div
                    key={b.id}
                    className="p-3 border rounded-xl flex flex-col sm:flex-row sm:justify-between items-center gap-3 bg-gray-50 mb-4"
                  >
                    <img
                      src={b.image_url}
                      loading="lazy"
                      decoding="async"
                      className="w-full sm:w-32 h-20 object-cover rounded-lg shadow"
                      alt="Banner"
                      onError={(e) => { e.target.src = 'https://placehold.co/600x400?text=No+Image' }}
                    />

                    <button
                      onClick={() => handleDeleteClick(b)}
                      className="btn btn-sm btn-error btn-outline flex items-center gap-2"
                    >
                      🗑️ Delete
                    </button>
                  </div>
                ))
              )}
            </div>
          )}
        </div>

      </div>

      <ConfirmModal
        isOpen={isDeleteModalOpen}
        title="Delete Banner"
        message="Are you sure you want to delete this banner? This action cannot be undone."
        onConfirm={confirmDelete}
        onCancel={() => setIsDeleteModalOpen(false)}
        isDangerous={true}
      />
    </AdminLayout>
  );
}
