import React, { useState } from "react";
import { supabase } from "../../supabase";
import { motion, AnimatePresence } from "framer-motion";

export default function AdmissionModal({ isOpen, onClose }) {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");

    const [formData, setFormData] = useState({
        studentName: "",
        parentName: "",
        mobile: "",
        classApplying: "",
        email: "",
        message: "",
    });

    if (!isOpen) return null;

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const validate = () => {
        if (!formData.studentName.trim()) return "Student Name is required";
        if (!formData.parentName.trim()) return "Parent Name is required";
        if (!formData.mobile.trim()) return "Mobile Number is required";
        if (!/^\d{10}$/.test(formData.mobile)) return "Mobile Number must be 10 digits";
        if (!formData.classApplying.trim()) return "Class is required";
        if (formData.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) return "Invalid Email Format";
        return null;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        const validationError = validate();
        if (validationError) {
            setError(validationError);
            return;
        }

        setLoading(true);

        try {
            const { error: insertError } = await supabase.from("admission_enquiries").insert([
                {
                    student_name: formData.studentName.trim(),
                    parent_name: formData.parentName.trim(),
                    mobile_number: formData.mobile.trim(),
                    class_applying_for: formData.classApplying,
                    email: formData.email.trim().toLowerCase() || null,
                    message: formData.message.trim() || null,
                },
            ]);

            if (insertError) throw insertError;

            setSuccess(true);
            setFormData({
                studentName: "",
                parentName: "",
                mobile: "",
                classApplying: "",
                email: "",
                message: "",
            });

            // Auto close after 3 seconds
            setTimeout(() => {
                setSuccess(false);
                onClose();
            }, 3000);

        } catch (err) {
            console.error(err);
            setError(err.message || "Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">

                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden max-h-[90vh] flex flex-col"
                    >

                        {/* Header */}
                        <div className="bg-primary px-4 sm:px-6 py-3 sm:py-4 flex justify-between items-center text-white shrink-0">
                            <h2 className="text-lg sm:text-xl font-bold">Admission Enquiry</h2>
                            <button
                                onClick={onClose}
                                className="text-white/80 hover:text-white text-3xl leading-none p-1 focus:outline-none"
                                aria-label="Close"
                            >
                                &times;
                            </button>
                        </div>

                        {/* Scrollable Body */}
                        <div className="p-4 sm:p-6 overflow-y-auto">
                            {success ? (
                                <div className="text-center py-10">
                                    <div className="text-5xl mb-4">🎉</div>
                                    <h3 className="text-2xl font-bold text-green-600">Request Sent!</h3>
                                    <p className="text-gray-600 mt-2">Thank you for your interest. Our admissions team will contact you shortly.</p>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-4">

                                    {error && <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm border border-red-100">{error}</div>}

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {/* Student Name */}
                                        <div className="form-control">
                                            <label className="label text-sm font-semibold text-gray-700 mb-1">Student Name <span className="text-red-500">*</span></label>
                                            <input
                                                type="text"
                                                name="studentName"
                                                value={formData.studentName}
                                                onChange={handleChange}
                                                className="input input-bordered w-full text-base focus:ring-2 focus:ring-primary/20 focus:border-primary"
                                                placeholder="Enter student's name"
                                            />
                                        </div>

                                        {/* Class */}
                                        <div className="form-control">
                                            <label className="label text-sm font-semibold text-gray-700 mb-1">Class Applying For <span className="text-red-500">*</span></label>
                                            <select
                                                name="classApplying"
                                                value={formData.classApplying}
                                                onChange={handleChange}
                                                className="select select-bordered w-full text-base focus:ring-2 focus:ring-primary/20 focus:border-primary"
                                            >
                                                <option value="">Select Class</option>
                                                <option value="Pre-Primary">Pre-Primary</option>
                                                <option value="Class 1">Class 1</option>
                                                <option value="Class 2">Class 2</option>
                                                <option value="Class 3">Class 3</option>
                                                <option value="Class 4">Class 4</option>
                                                <option value="Class 5">Class 5</option>
                                                <option value="Class 6">Class 6</option>
                                                <option value="Class 7">Class 7</option>
                                                <option value="Class 8">Class 8</option>
                                                <option value="Class 9">Class 9</option>
                                                <option value="Class 10">Class 10</option>
                                                <option value="Class 11">Class 11</option>
                                                <option value="Class 12">Class 12</option>
                                            </select>
                                        </div>
                                    </div>

                                    {/* Parent Name */}
                                    <div className="form-control">
                                        <label className="label text-sm font-semibold text-gray-700 mb-1">Parent/Guardian Name <span className="text-red-500">*</span></label>
                                        <input
                                            type="text"
                                            name="parentName"
                                            value={formData.parentName}
                                            onChange={handleChange}
                                            className="input input-bordered w-full text-base focus:ring-2 focus:ring-primary/20 focus:border-primary"
                                            placeholder="Enter parent's name"
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {/* Mobile */}
                                        <div className="form-control">
                                            <label className="label text-sm font-semibold text-gray-700 mb-1">Mobile Number <span className="text-red-500">*</span></label>
                                            <input
                                                type="tel"
                                                name="mobile"
                                                value={formData.mobile}
                                                onChange={handleChange}
                                                maxLength="10"
                                                className="input input-bordered w-full text-base focus:ring-2 focus:ring-primary/20 focus:border-primary"
                                                placeholder="10-digit number"
                                            />
                                        </div>

                                        {/* Email */}
                                        <div className="form-control">
                                            <label className="label text-sm font-semibold text-gray-700 mb-1">Email <span className="text-xs text-gray-400">(Optional)</span></label>
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                className="input input-bordered w-full text-base focus:ring-2 focus:ring-primary/20 focus:border-primary"
                                                placeholder="parent@example.com"
                                            />
                                        </div>
                                    </div>

                                    {/* Message */}
                                    <div className="form-control">
                                        <label className="label text-sm font-semibold text-gray-700 mb-1">Message / Notes <span className="text-xs text-gray-400">(Optional)</span></label>
                                        <textarea
                                            name="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            className="textarea textarea-bordered h-24 w-full text-base focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none"
                                            placeholder="Any specific questions regarding admissions..."
                                        ></textarea>
                                    </div>

                                    {/* Submit Button */}
                                    <div className="pt-2">
                                        <button
                                            type="submit"
                                            disabled={loading}
                                            className="btn bg-primary hover:bg-green-800 text-white w-full text-lg border-none"
                                        >
                                            {loading ? (
                                                <span className="loading loading-spinner loading-md"></span>
                                            ) : (
                                                "Book Your Admission Inquiry"
                                            )}
                                        </button>
                                    </div>

                                </form>
                            )}
                        </div>

                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
