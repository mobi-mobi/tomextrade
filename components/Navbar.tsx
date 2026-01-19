"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    // If we're on the catalogue page, navigate to home first
    if (pathname === "/catalogue") {
      router.push(`/#${sectionId}`);
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
    setIsMenuOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-white/95 backdrop-blur-md shadow-lg" : "bg-transparent"
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <Link
              href="/"
              className="text-2xl font-bold text-blue-800 hover:text-blue-600 transition-colors"
            >
              TomexTrade
            </Link>
          </div>

          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <button
                onClick={() => scrollToSection("hero")}
                className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors"
              >
                Domov
              </button>
              <button
                onClick={() => scrollToSection("about")}
                className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors"
              >
                O nás
              </button>
              <Link
                href="/catalogue"
                className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors"
              >
                Produkty
              </Link>
              <button
                onClick={() => scrollToSection("contact")}
                className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors"
              >
                Kontakt
              </button>
            </div>
          </div>

          <div className="hidden md:block">
            <Link
              href="/catalogue"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              Zistiť viac
            </Link>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-blue-600 p-2"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-md shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <button
              onClick={() => scrollToSection("hero")}
              className="text-gray-700 hover:text-blue-600 block px-3 py-2 text-base font-medium w-full text-left"
            >
              Domov
            </button>
            <button
              onClick={() => scrollToSection("about")}
              className="text-gray-700 hover:text-blue-600 block px-3 py-2 text-base font-medium w-full text-left"
            >
              O nás
            </button>
            <Link
              href="/catalogue"
              className="text-gray-700 hover:text-blue-600 block px-3 py-2 text-base font-medium w-full text-left"
            >
              Produkty
            </Link>
            <button
              onClick={() => scrollToSection("contact")}
              className="text-gray-700 hover:text-blue-600 block px-3 py-2 text-base font-medium w-full text-left"
            >
              Kontakt
            </button>
            <Link
              href="/catalogue"
              className="bg-blue-600 hover:bg-blue-700 text-white block px-3 py-2 text-base font-medium w-full text-left rounded-lg mt-4"
            >
              Zistiť viac
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
