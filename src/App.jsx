// src/App.jsx

import "./App.css";

import Navbar from "./Components/Navbar/Navbar";
import Hero from "./Components/Hero/Hero";
import About from "./Components/About/About";
import VirtualTour from "./Components/VirtualTour/VirtualTour";
import Curriculum from "./Components/Curriculum/Curriculum";
import Events from "./Components/RecentEvents/Events";
import Facilities from "./Components/Facilities/Facilities";
import AdmissionCTA from "./Components/AdmissionCTA/AdmissionCTA";
import Footer from "./Components/Footer/Footer";

// admin panel files
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Banners from "./pages/Banners";
import AdminEvents from "./pages/AdminEvents";
import Queries from "./pages/Queries";

import ProtectedRoute from "./Components/ProtectedRoute";
import { ToastContainer } from "./Components/Toast";

import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="font-display bg-background-light dark:bg-background-dark text-text-light-primary dark:text-dark-primary transition-colors duration-300">
      <ToastContainer />

      <Routes>
        {/* ===================== Landing Page ===================== */}
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <main>
                <Hero />
                <About />
                <Curriculum />
                <Events />
                <VirtualTour />
                <Facilities />
                <AdmissionCTA />
              </main>
              <Footer />
            </>
          }
        />

        {/* ===================== Admin Login ===================== */}
        <Route path="/login" element={<Login />} />

        {/* ===================== OLD /dashboard ===================== */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* ===================== NEW ADMIN PANEL ROUTES ===================== */}

        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/banners"
          element={
            <ProtectedRoute>
              <Banners />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/events"
          element={
            <ProtectedRoute>
              <AdminEvents />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/queries"
          element={
            <ProtectedRoute>
              <Queries />
            </ProtectedRoute>
          }
        />

      </Routes>
    </div>
  );
}

export default App;
