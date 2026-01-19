"use client";

import { useEffect } from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import About from "../components/About";
import ProductCategories from "../components/ProductCategories";
import Contact from "../components/Contact";
import Footer from "../components/Footer";

export default function Home() {
  useEffect(() => {
    // Handle hash navigation when coming from catalogue page
    const hash = window.location.hash;
    if (hash) {
      const sectionId = hash.replace("#", "");
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    }
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <About />
      <ProductCategories />
      <Contact />
      <Footer />
    </div>
  );
}
