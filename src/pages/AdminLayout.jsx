import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function AdminLayout({ children }) {
  const navigate = useNavigate();
  const { signOut } = useAuth();

  const handleLogout = async () => {
    await signOut();
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex bg-gray-100">

      {/* SIDEBAR — hide on mobile */}
      <aside className="hidden md:flex flex-col w-64 bg-white shadow-lg border-r p-6">
        <h2 className="text-xl font-bold text-green-700 mb-6">Admin Panel</h2>

        <nav className="space-y-3">
          <Link
            to="/dashboard"
            className="block p-2 rounded hover:bg-green-50"
          >
            Dashboard
          </Link>

          <Link
            to="/admin/banners"
            className="block p-2 rounded hover:bg-green-50"
          >
            Hero Banners
          </Link>

          <Link
            to="/admin/events"
            className="block p-2 rounded hover:bg-green-50"
          >
            Recent Events
          </Link>

          <Link
            to="/admin/queries"
            className="block p-2 rounded hover:bg-green-50"
          >
            Admission Queries
          </Link>
          <button
            onClick={handleLogout}
            className="block w-full text-left p-2 rounded hover:bg-red-50 text-red-600 mt-auto"
          >
            Logout
          </button>
        </nav>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-2 md:p-8">
        {children}
      </main>

    </div>
  );
}
