"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Building2 } from "lucide-react";
import { stats } from "@/data/statsSectionData";
import { values } from "@/data/valuesSectionData";

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            O spoločnosti TomexTrade
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Váš nový dôveryhodný partner v hygienických riešeniach
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-blue-100 p-3 rounded-full">
                <Building2 className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Prečo my?</h3>
            </div>

            <p className="text-gray-600 leading-relaxed">
              S našou víziou poskytovať výnimočné hygienické riešenia,
              spoločnosť TomexTrade pravidelne zásobuje podniky v celom regióne.
              Chápeme, že udržiavanie vysokých hygienických štandardov je
              kľúčové pre úspech vášho podnikania a spokojnosť zákazníkov.
            </p>

            <p className="text-gray-600 leading-relaxed">
              Naše záväzky k kvalite, spoľahlivosti a zákazníckym službám nás
              urobili dôveryhodným partnerom pre reštaurácie, hotely,
              kancelárie, zdravotnícke zariadenia a mnoho ďalších podnikov,
              ktoré uprednostňujú čistotu a hygienu.
            </p>

            <p className="text-gray-600 leading-relaxed">
              Neustále investujeme do najnovších a najkvalitnejších produktov,
              aby sme zabezpečili, že naši klienti majú prístup k
              najefektívnejším a najúčinnejším hygienickým produktom dostupným
              na trhu.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid grid-cols-2 gap-8"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={
                  isInView
                    ? { opacity: 1, scale: 1 }
                    : { opacity: 0, scale: 0.8 }
                }
                transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                className="text-center p-6 bg-blue-50 rounded-lg"
              >
                <div className="text-3xl font-bold text-blue-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-sm text-gray-600 font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 1 + index * 0.2 }}
              className="text-center p-6 bg-gray-50 rounded-lg hover:bg-blue-50 transition-colors duration-300"
            >
              <div className="flex justify-center mb-4">{value.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {value.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {value.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default About;
