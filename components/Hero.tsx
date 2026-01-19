"use client";

import { motion } from "framer-motion";
import { ArrowRight, Shield, Award, Users } from "lucide-react";
import Link from "next/link";

const Hero = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200"></div>

      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-32 h-32 bg-blue-600 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-blue-500 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-blue-400 rounded-full blur-2xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight"
          >
            Prémiové hygienické
            <span className="block text-blue-600">produkty</span>
            <span className="block text-2xl sm:text-3xl lg:text-4xl font-medium text-gray-600 mt-4">
              pre vaše podnikanie
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
          >
            Kvalitné utierky, dávkovače a ostatné hygienické produkty, ktoré
            udržujú vaše pracovisko čisté, bezpečné a v súlade s najvyššími
            štandardmi.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link
              href="/catalogue"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Zobraziť produkty
              <ArrowRight size={20} />
            </Link>
            <button
              onClick={() => scrollToSection("contact")}
              className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300"
            >
              Kontaktujte nás
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto pt-16 pb-20"
          >
            <div className="flex flex-col items-center space-y-2">
              <div className="bg-blue-100 p-4 rounded-full">
                <Shield className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900">Zaručená kvalita</h3>
              <p className="text-sm text-gray-600 text-center">
                Dôkladne testované a kvalitné materiály
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <div className="bg-blue-100 p-4 rounded-full">
                <Award className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900">
                Dôveryhodné značky
              </h3>
              <p className="text-sm text-gray-600 text-center">
                Ponuka kvalitných značiek
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <div className="bg-blue-100 p-4 rounded-full">
                <Users className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900">Odborná podpora</h3>
              <p className="text-sm text-gray-600 text-center">
                Skvelé poradenstvo a služby
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="absolute bottom-4 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-blue-600 rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-3 bg-blue-600 rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
