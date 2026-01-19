"use client";

import { motion } from "framer-motion";
import { Building2, Phone, Mail, MapPin, ArrowUp } from "lucide-react";
import { footerLinks } from "@/data/footerSectionData";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="lg:flex-1"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Building2 className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold">TomexTrade</h3>
            </div>
            <p className="text-gray-300 leading-relaxed mb-6">
              Váš nový dôveryhodný partner v hygienických riešeniach.
              Poskytujeme prémiové produkty a výnimočné služby podnikom v celom
              regióne.
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-gray-300">
                <Phone className="w-4 h-4 text-blue-400" />
                <span>+421 905 846 677</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <Mail className="w-4 h-4 text-blue-400" />
                <span>tomextrade81@gmal.com</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <MapPin className="w-4 h-4 text-blue-400" />
                <span>Južná trieda 1598/82, 040 12 Košice</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="lg:flex-1"
          >
            <h4 className="text-lg font-semibold mb-6">Spoločnosť</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link, index) => (
                <li key={link.name}>
                  <button
                    onClick={link.action}
                    className="text-gray-300 hover:text-blue-400 transition-colors duration-300 text-left"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="lg:flex-1"
          >
            <h4 className="text-lg font-semibold mb-6">Služby</h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link, index) => (
                <li key={link.name}>
                  <button
                    onClick={link.action}
                    className="text-gray-300 hover:text-blue-400 transition-colors duration-300 text-left"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>

      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-gray-400 text-sm"
            >
              © {currentYear} TomexTrade. Všetky práva vyhradené.
            </motion.p>

            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              onClick={scrollToTop}
              className="bg-blue-600 hover:bg-blue-700 p-3 rounded-full transition-colors duration-300 shadow-lg hover:shadow-xl"
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-5 h-5" />
            </motion.button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
