import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import About from "../components/About";
import ProductCategories from "../components/ProductCategories";
import Contact from "../components/Contact";
import Footer from "../components/Footer";

export default function Home() {
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
