// src/pages/Queries.jsx

import React, { useEffect, useState } from "react";
import AdminLayout from "./AdminLayout";
import { supabase } from "../supabase";
import Loader from "../Components/Loader";
import { showToast } from "../Components/Toast";
import ConfirmModal from "../Components/ConfirmModal";
import {
  Search,
  Trash2,
  Phone,
  Calendar,
  User,
  Mail,
  ChevronLeft,
  ChevronRight,
  Filter,
  GraduationCap
} from "lucide-react";

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
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <div className="text-center md:text-left">
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Admission Enquiries</h1>
          <p className="text-sm text-gray-500 mt-1">Manage and track student admission requests</p>
        </div>

        {/* Search Bar */}
        <div className="relative w-full max-w-sm mx-auto md:mx-0 md:w-80 group">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400 group-focus-within:text-primary transition-colors" />
          </div>
          <input
            type="text"
            placeholder="Search students..."
            className="input input-bordered w-full pl-11 bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all rounded-full h-11"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Responsive Table View (All Screens) */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {loading ? (
          <div className="p-12"><Loader /></div>
        ) : queries.length === 0 ? (
          <div className="p-16 text-center flex flex-col items-center justify-center text-gray-500">
            <div className="bg-gray-50 p-4 rounded-full mb-3">
              <Filter className="w-8 h-8 text-gray-300" />
            </div>
            <h3 className="text-lg font-medium text-gray-900">No enquiries found</h3>
            <p className="text-sm">Try adjusting your search terms.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="table w-full whitespace-nowrap">
              <thead className="bg-gray-50/50 border-b border-gray-200">
                <tr>
                  <th className="text-xs font-semibold text-gray-500 uppercase tracking-wider py-2 pl-3 md:py-3 md:pl-5">Student Info</th>
                  <th className="text-xs font-semibold text-gray-500 uppercase tracking-wider py-3 hidden md:table-cell">Parent Details</th>
                  <th className="text-xs font-semibold text-gray-500 uppercase tracking-wider py-3 hidden md:table-cell">Class</th>
                  <th className="text-xs font-semibold text-gray-500 uppercase tracking-wider py-3 hidden md:table-cell">Submitted On</th>
                  <th className="text-right text-xs font-semibold text-gray-500 uppercase tracking-wider py-2 pr-3 md:py-3 md:pr-5">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {queries.map((q) => (
                  <tr key={q.id} className="hover:bg-gray-50/80 transition-colors group">

                    {/* Student Info (Expanded on Mobile) */}
                    <td className="pl-3 py-2.5 md:pl-5 md:py-3 align-top">
                      <div className="flex items-start gap-2.5">
                        <div className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold shrink-0 mt-0.5 text-sm md:text-base">
                          {q.student_name.charAt(0).toUpperCase()}
                        </div>
                        <div className="flex flex-col gap-0.5">
                          <div className="font-semibold text-gray-900 text-sm">{q.student_name}</div>
                          {q.email && <div className="text-xs text-gray-400 hidden md:block">{q.email}</div>}

                          {/* Mobile Only Details Stack */}
                          <div className="md:hidden flex flex-col gap-0.5 mt-0.5">
                            <div className="text-[10px] text-primary font-medium bg-primary/5 px-1.5 py-0.5 rounded w-fit leading-none mb-0.5">
                              {q.class_applying_for}
                            </div>
                            <div className="text-xs text-gray-500 flex items-center gap-1">
                              <User className="w-3 h-3 text-gray-400" /> {q.parent_name}
                            </div>
                            <div className="text-xs text-gray-500 flex items-center gap-1">
                              <Phone className="w-3 h-3 text-gray-400" />
                              <a href={`tel:${q.mobile_number}`} className="hover:text-primary transition-colors">{q.mobile_number}</a>
                            </div>
                            <div className="text-[10px] text-gray-400 mt-0.5">
                              {new Date(q.created_at).toLocaleDateString()} • {new Date(q.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </div>
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Parent Details (Desktop Only) */}
                    <td className="py-3 hidden md:table-cell align-middle">
                      <div className="flex flex-col gap-0.5">
                        <div className="text-sm font-medium text-gray-700 flex items-center gap-1.5">
                          <User className="w-3.5 h-3.5 text-gray-400" />
                          {q.parent_name}
                        </div>
                        <div className="text-xs text-gray-500 flex items-center gap-1.5">
                          <Phone className="w-3.5 h-3.5 text-gray-400" />
                          <a href={`tel:${q.mobile_number}`} className="hover:text-primary transition-colors">{q.mobile_number}</a>
                        </div>
                      </div>
                    </td>

                    {/* Class (Desktop Only) */}
                    <td className="py-3 hidden md:table-cell align-middle">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100">
                        <GraduationCap className="w-3 h-3 mr-1.5" />
                        {q.class_applying_for}
                      </span>
                    </td>

                    {/* Date (Desktop Only) */}
                    <td className="py-3 hidden md:table-cell align-middle">
                      <div className="text-sm text-gray-600">
                        {new Date(q.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                      </div>
                      <div className="text-xs text-gray-400">
                        {new Date(q.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="text-right pr-3 py-2.5 md:pr-5 md:py-3 align-middle">
                      <button
                        onClick={() => handleDeleteClick(q)}
                        className="btn btn-sm btn-ghost btn-square text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors h-8 w-8 min-h-0"
                        title="Delete Enquiry"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Pagination Controls */}
      {!loading && queries.length > 0 && (
        <div className="flex justify-center mt-8 gap-2">
          <button
            className="btn btn-sm btn-outline border-gray-300 text-gray-600 hover:bg-gray-50 hover:border-gray-400"
            disabled={page === 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
          >
            <ChevronLeft className="w-4 h-4" />
            Prev
          </button>

          <div className="flex items-center px-4 text-sm font-medium text-gray-600 bg-white border border-gray-200 rounded-lg shadow-sm">
            {page} <span className="text-gray-400 mx-1">/</span> {totalPages}
          </div>

          <button
            className="btn btn-sm btn-outline border-gray-300 text-gray-600 hover:bg-gray-50 hover:border-gray-400"
            disabled={page >= totalPages}
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          >
            Next
            <ChevronRight className="w-4 h-4" />
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
