"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { removeAuthToken } from "../../utils/page";
import { useRouter } from "next/navigation";
import logo from "./image/logo.png";

const Nav2 = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  const handleLogout = () => {
    removeAuthToken();
    router.push("/admin/login");
  };

  return (
    <nav className="bg-black text-white shadow-md mb-5 relative w-full z-50 top-0 left-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/admin/dashboard" className="flex items-center">
            <Image src={logo} alt="logo" width={160} height={40} className="object-contain" />
          </Link>

          <div className="md:hidden">
            <button
              type="button"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-300 hover:text-white focus:outline-none transition-transform transform"
            >
              {isMenuOpen ? "✖" : "☰"}
            </button>
          </div>

          <div className={`md:flex md:space-x-6 hidden space-y-2 md:space-y-0`}>
            {[
              { href: "/admin/dashboard", label: "Home" },
              { href: "/admin/contact", label: "Contact" },
              { href: "/admin/project", label: "Projects" },
              { href: "/admin/product", label: "Products" },
              { href: "/admin/aboutUs", label: "About Us" },
            ].map(({ href, label }) => (
              <Link key={href} href={href} className="py-2 px-3 text-sm font-medium hover:text-blue-400 transition-colors">
                {label}
              </Link>
            ))}
            <button
              onClick={handleLogout}
              className="py-2 px-3 text-sm font-medium text-red-500 hover:text-red-600 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className={`md:hidden bg-black text-white shadow-md absolute top-16 left-0 right-0 transition-all duration-300 ${isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}>
        <div className="px-4 pt-4 flex flex-col items-center pb-4 space-y-2">
          {[
            { href: "/admin/dashboard", label: "Home" },
            { href: "/admin/contact", label: "Contact" },
            { href: "/admin/project", label: "Projects" },
            { href: "/admin/product", label: "Products" },
          ].map(({ href, label }) => (
            <Link key={href} href={href} className="py-2 px-3 text-sm font-medium hover:text-blue-400 transition-colors" onClick={() => setIsMenuOpen(false)}>
              {label}
            </Link>
          ))}
          <button
            onClick={() => {
              handleLogout();
              setIsMenuOpen(false);
            }}
            className="py-2 px-3 text-sm font-medium text-red-500 hover:text-red-600 transition-colors"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Nav2;
