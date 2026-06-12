import React, { useState } from "react";
import Accordion from "../components/Accordion";
import { faqData } from "../data/faqs";
import type { FAQ } from "../data/faqs";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

type Category = FAQ["category"];

const CATEGORIES: { key: Category; labelKey: string }[] = [
  { key: "Technical Support", labelKey: "faqs.catTechnical" },
  { key: "Shopping & Orders", labelKey: "faqs.catShopping" },
  { key: "Payment & billing", labelKey: "faqs.catPayment" },
];

const FaqsPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<Category>("Technical Support");
  const { t } = useTranslation();

  const filteredFaqs = faqData.filter((faq: FAQ) => faq.category === activeCategory);

  return (
    <div className="bg-[#F6F4F1] min-h-screen px-6 py-24 md:py-36">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE }}
          className="text-center mb-20"
        >
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-[#3D1A12]/40 mb-4">
            {t("faqs.studio")}
          </p>
          <h1 className="text-5xl md:text-7xl font-black text-[#3D1A12] tracking-tight leading-none mb-6">
            {t("faqs.heading")}
          </h1>
          <p className="text-[#3D1A12]/40 text-base font-light max-w-sm mx-auto leading-relaxed">
            {t("faqs.body")}
          </p>
        </motion.div>

        {/* Category tabs */}
        <div className="flex flex-wrap justify-center gap-10 mb-16 border-b border-[#3D1A12]/10">
          {CATEGORIES.map(({ key, labelKey }) => (
            <button
              key={key}
              onClick={() => setActiveCategory(key)}
              className={`pb-4 text-xs font-black uppercase tracking-widest transition-all duration-300 relative ${
                activeCategory === key
                  ? "text-[#3D1A12]"
                  : "text-[#3D1A12]/30 hover:text-[#3D1A12]/60"
              }`}
            >
              {t(labelKey)}
              {activeCategory === key && (
                <motion.span
                  layoutId="faq-tab-indicator"
                  className="absolute bottom-0 left-0 w-full h-px bg-[#3D1A12]"
                />
              )}
            </button>
          ))}
        </div>

        {/* Accordion */}
        {filteredFaqs.length > 0 ? (
          <Accordion key={activeCategory} items={filteredFaqs} />
        ) : (
          <div className="text-center py-20">
            <p className="text-[#3D1A12]/30 text-sm uppercase tracking-widest font-black">
              {t("faqs.empty")}
            </p>
          </div>
        )}

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-24 text-center border-t border-[#3D1A12]/10 pt-16"
        >
          <p className="text-[#3D1A12]/40 text-sm mb-2">{t("faqs.stillQuestion")}</p>
          <a
            href="mailto:mipadorofficial@gmail.com"
            className="text-[#3D1A12] font-black text-sm uppercase tracking-widest border-b border-[#3D1A12]/30 hover:border-[#3D1A12] transition-colors pb-0.5"
          >
            {t("faqs.writeDirectly")}
          </a>
        </motion.div>

      </div>
    </div>
  );
};

export default FaqsPage;
