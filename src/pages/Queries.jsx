// src/pages/Queries.jsx

import React, { useEffect, useState } from "react";
import AdminLayout from "./AdminLayout";
import { supabase } from "../supabase";
import Loader from "../Components/Loader";
import { showToast } from "../Components/Toast";
import ConfirmModal from "../Components/ConfirmModal";

export default function Queries() {
  const [queries, setQueries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const PAGE_SIZE = 10;

  // Modal State
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [queryToDelete, setQueryToDelete] = useState(null);

  const fetchQueries = async () => {
    setLoading(true);
    try {
      let query = supabase
        .from("admission_enquiries")
        .select("*", { count: "exact" })
        .eq("is_admin_visible", true)
        .order("created_at", { ascending: false });

      // Apply Search
      if (search) {
        query = query.or(`student_name.ilike.%${search}%,parent_name.ilike.%${search}%,mobile_number.ilike.%${search}%`);
      }

      // Apply Pagination
      const from = (page - 1) * PAGE_SIZE;
      const to = from + PAGE_SIZE - 1;
      query = query.range(from, to);

      const { data, count, error } = await query;

      if (error) throw error;

      setQueries(data || []);
      setTotalPages(Math.ceil((count || 0) / PAGE_SIZE));
    } catch (error) {
      console.error("Error fetching queries:", error);
      showToast.error("Failed to fetch enquiries.");
    } finally {
      setLoading(false);
    }
  };

  // Debounce Search
  useEffect(() => {
    const timer = setTimeout(() => {
      setPage(1); // Reset to page 1 on search
      fetchQueries();
    }, 500);
    return () => clearTimeout(timer);
  }, [search]); // Trigger on search change

  // Trigger on page change
  useEffect(() => {
    fetchQueries();
  }, [page]);

  const handleDeleteClick = (query) => {
    setQueryToDelete(query);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!queryToDelete) return;

    try {
      // Soft delete: set is_admin_visible = false
      const { error } = await supabase
        .from("admission_enquiries")
        .update({ is_admin_visible: false })
        .eq("id", queryToDelete.id);

      if (error) throw error;

      showToast.success("Query deleted successfully.");
      fetchQueries(); // Refresh list
    } catch (error) {
      console.error("Error deleting query:", error);
      showToast.error("Failed to delete query.");
    } finally {
      setIsDeleteModalOpen(false);
      setQueryToDelete(null);
    }
  };

  return (
    <AdminLayout>
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold text-gray-800">Admission Enquiries</h1>

        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search by name or mobile..."
          className="input input-bordered w-full md:w-64"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {loading ? (
        <Loader />
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          {queries.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              No enquiries found.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="table w-full">
                <thead className="bg-gray-50 text-gray-700">
                  <tr>
                    <th>Date</th>
                    <th>Student Name</th>
                    <th>Parent Name</th>
                    <th>Class</th>
                    <th>Mobile</th>
                    <th className="text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {queries.map((q) => (
                    <tr key={q.id} className="hover:bg-gray-50">
                      <td>
                        {new Date(q.created_at).toLocaleDateString()}
                        <br />
                        <span className="text-xs text-gray-500">
                          {new Date(q.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </td>
                      <td className="font-medium">{q.student_name}</td>
                      <td>{q.parent_name}</td>
                      <td>
                        <span className="badge badge-ghost date-badge font-normal">
                          {q.class_applying_for}
                        </span>
                      </td>
                      <td>{q.mobile_number}</td>
                      <td className="text-right">
                        <button
                          onClick={() => handleDeleteClick(q)}
                          className="btn btn-sm btn-ghost text-red-600 hover:bg-red-50"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* Pagination Controls */}
      {!loading && queries.length > 0 && (
        <div className="flex justify-center mt-6 space-x-2">
          <button
            className="btn btn-sm"
            disabled={page === 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
          >
            « Prev
          </button>
          <span className="btn btn-sm btn-disabled bg-transparent border-none text-gray-600">
            Page {page} of {totalPages}
          </span>
          <button
            className="btn btn-sm"
            disabled={page >= totalPages}
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          >
            Next »
          </button>
        </div>
      )}

      <ConfirmModal
        isOpen={isDeleteModalOpen}
        title="Delete Enquiry"
        message={`Are you sure you want to delete the enquiry for ${queryToDelete?.student_name}?`}
        onConfirm={confirmDelete}
        onCancel={() => setIsDeleteModalOpen(false)}
        isDangerous={true}
      />
    </AdminLayout>
  );
}
