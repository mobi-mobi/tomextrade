import { getAllProducts } from "@/utils/getAllProducts";
import React from "react";
import CatalogueSearch from "@/components/CatalogueSearch";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";



const page = async () => {
  const { products, total } = await getAllProducts();

  return (
    <div className="min-h-screen">
      <Navbar />
      <CatalogueSearch initialProducts={products} total={total} />
      <Footer />
    </div>
  );
};

export default page;
