import React, { useState } from "react";
import logo from "../../assets/logo-upscaled.png";
import AdmissionModal from "../AdmissionModal/AdmissionModal";

const Navbar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "/#" },
    { name: "About Us", href: "#about" },
    { name: "Academics", href: "#academics" },
    { name: "Events", href: "#events" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <>
      <header className="bg-card-light sticky top-0 z-[49] shadow-md">
        <nav className="container mx-auto px-6 py-4 flex justify-between items-center">

          {/* Logo */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            <img
              src={logo}
              alt="Mayoor International School Logo"
              className="h-10 w-10 sm:h-16 sm:w-16 object-contain"
            />
            <span className="text-md sm:text-lg md:text-xl lg:text-2xl font-bold text-primary whitespace-nowrap">
              Mayoor International School
            </span>
          </div>

          {/* Menu */}
          <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-text-light-secondary">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="hover:text-primary transition"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* CTA Button */}
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-primary text-white px-3 py-1.5 text-xs sm:px-4 sm:py-2 sm:text-sm md:px-6 md:py-2.5 md:text-base font-bold rounded-full shadow-md hover:bg-green-800 hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer whitespace-nowrap"
          >
            Admissions Open
          </button>
        </nav>
      </header>

      <AdmissionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default Navbar;
