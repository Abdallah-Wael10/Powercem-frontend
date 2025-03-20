"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import logo from "../nav2/image/logo.png";
import Link from "next/link";
import { useContext } from "react";
import { ProductsContext } from "@/app/context/ProductContext";

const throttle = (func, limit) => {
  let inThrottle;
  return (...args) => {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

const Nav = () => {
  const { Products } = useContext(ProductsContext);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [dropdownTimeout, setDropdownTimeout] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = throttle(() => {
      setIsScrolled(window.scrollY > 50);
    }, 100);

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      const mobileMenu = document.querySelector(".mobile-menu-container");
      const toggleButton = document.querySelector(".mobile-toggle-button");
      
      if (mobileMenu && !mobileMenu.contains(e.target) && 
          toggleButton && !toggleButton.contains(e.target)) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isMobileMenuOpen]);

  const handleMouseEnter = () => {
    if (dropdownTimeout) clearTimeout(dropdownTimeout);
    setIsDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    const timeout = setTimeout(() => {
      setIsDropdownOpen(false);
    }, 200);
    setDropdownTimeout(timeout);
  };

  return (
    <div className="w-full h-[100px] fixed top-0 z-50 flex justify-center items-center max-600:items-start max-600:pt-2">
      <nav
        className={`w-[90%] h-[75px] text-[16px] flex items-center rounded-full transition-all duration-300 ease-in-out max-600:h-[45px] ${
          isScrolled ? "bg-white shadow-lg" : "bg-white/10 backdrop-blur-md"
        }`}
      >
        {/* Mobile Header */}
        <div className="hidden max-900:flex justify-between items-center w-full px-4">
          <Link href="/" className="w-[120px] h-[60px] max-600:w-[110px] max-600:h-[34px]">
            <Image className="w-full h-full" src={logo} priority alt="logo" />
          </Link>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-2xl p-2 text-black mobile-toggle-button"
          >
            {isMobileMenuOpen ? "✕" : "☰"}
          </button>
        </div>

        {/* Desktop Content */}
        <div className="w-full flex items-center max-900:hidden">
          <Link href="/" className="w-[20%] flex justify-center">
            <Image
              className="w-[60%] h-[60px]"
              src={logo}
              priority
              alt="logo"
            />
          </Link>

          <div className="w-[60%] h-[80px] flex justify-center text-[22px] font-semibold gap-8 items-center">
            <Link
              className={`transition-colors duration-300 ease-in-out hover:text-[#0058A3] ${
                isScrolled ? "text-[#0058A3]" : "text-white"
              }`}
              href="/"
            >
              Home
            </Link>

            <div
              className="relative"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <Link
                className={`transition-colors duration-300 ease-in-out hover:text-[#0058A3] ${
                  isScrolled ? "text-[#0058A3]" : "text-white"
                }`}
                href="/"
              >
                Our Products
              </Link>
              <div
                className={`absolute top-full left-0 mt-1 w-[200px] rounded-lg shadow-lg transition-all duration-300 ease-out transform ${
                  isDropdownOpen
                    ? "opacity-100 translate-y-0 visible"
                    : "opacity-0 -translate-y-2 invisible"
                } ${isScrolled ? "bg-white" : "bg-white/10 backdrop-blur-md"}`}
              >
                {Products &&
                  Products.map((product) => (
                    <Link
                      key={product._id}
                      href={`/pages/products/${product._id}`}
                      className={`block px-4 py-2 text-[16px] transition-colors duration-200 ease-in-out ${
                        isScrolled
                          ? "text-[#0058A3] hover:bg-[#0058A3] hover:text-white"
                          : "text-white hover:bg-[#0058A3] hover:text-white"
                      }`}
                    >
                      {product.name}
                    </Link>
                  ))}
              </div>
            </div>

            <Link
              className={`transition-colors duration-300 ease-in-out hover:text-[#0058A3] ${
                isScrolled ? "text-[#0058A3]" : "text-white"
              }`}
              href="/pages/project"
            >
              Projects
            </Link>
            <Link
              className={`transition-colors duration-300 ease-in-out hover:text-[#0058A3] ${
                isScrolled ? "text-[#0058A3]" : "text-white"
              }`}
              href="/pages/aboutUs"
            >
              About Us
            </Link>
          </div>

          <div className="w-[20%] flex justify-center">
            <Link
              className={`w-[50%] h-[40px] bg-[#4EABE9] text-white text-[16px] font-medium flex justify-center items-center rounded-full transition-all duration-300 ease-in-out hover:bg-[#0058A3] hover:shadow-md ${
                isScrolled ? "" : "animate-bounce"
              }`}
              href="/pages/contactus"
            >
              Contact
            </Link>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}

<div
  className={`fixed top-[80px]  left-0 w-full bg-white shadow-lg transition-all duration-300 mobile-menu-container ${
    isMobileMenuOpen
      ? "opacity-100 translate-y-0 visible z-50"
      : "opacity-0 -translate-y-4 invisible z-50"
  } max-900:block hidden`}
>
  <div className="flex flex-col items-center py-4 space-y-4">
    <Link
      href="/"
      className="text-[#0058A3] w-full text-center py-2 hover:bg-gray-100"
      onClick={() => setIsMobileMenuOpen(false)}
    >
      Home
    </Link>
    
    <div className="w-full text-center">
      <div className="text-[#0058A3] py-2">Our Products</div>
      <div className="flex flex-col bg-gray-50">
        {Products &&
          Products.map((product) => (
            <Link
              key={product._id}
              href={`/pages/products/${product._id}`}
              className="text-[#0058A3] py-2 hover:bg-[#0058A3] hover:text-white transition-colors relative z-50"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {product.name}
            </Link>
          ))}
      </div>
    </div>

    <Link
      href="/pages/project"
      className="text-[#0058A3] w-full text-center py-2 hover:bg-gray-100"
      onClick={() => setIsMobileMenuOpen(false)}
    >
      Projects
    </Link>
    <Link
      href="/pages/aboutUs"
      className="text-[#0058A3] w-full text-center py-2 hover:bg-gray-100"
      onClick={() => setIsMobileMenuOpen(false)}
    >
      About Us
    </Link>
    <Link
      href="/pages/contactus"
      className="w-[50%] text-center py-2 bg-[#4EABE9] text-white rounded-full hover:bg-[#0058A3] transition-colors relative z-50"
      onClick={() => setIsMobileMenuOpen(false)}
    >
      Contact
    </Link>
  </div>
</div>


{isMobileMenuOpen && (
  <div 
    className="fixed inset-0 bg-black/30 z-40 max-900:block hidden" 
    onClick={() => setIsMobileMenuOpen(false)}
  />
)}

     
    </div>
  );
};

export default Nav;