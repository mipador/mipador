import React, { useState } from "react";
import Accordion from "../components/Accordion";
import { faqData } from "../data/faqs";
import type { FAQ } from "../data/faqs";

type Category = FAQ["category"];

const FaqsPage: React.FC = () => {
  const [activeCategory, setActiveCategory] =
    useState<Category>("Technical Support");

  const categories: Category[] = [
    "Technical Support",
    "Shopping & Orders",
    "Payment & billing",
  ];

  const filteredFaqs = faqData.filter(
    (faq: FAQ) => faq.category === activeCategory,
  );

  return (
    <div className="bg-[#F6F4F1] min-h-screen px-6 py-24 md:py-36">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="text-center mb-20">
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-[#3D1A12]/40 mb-4">
            Mipador Studio
          </p>
          <h1 className="text-5xl md:text-7xl font-black text-[#3D1A12] tracking-tight leading-none mb-6">
            Questions.
          </h1>
          <p className="text-[#3D1A12]/40 text-base font-light max-w-sm mx-auto leading-relaxed">
            Everything you need to know before bringing a Mipador piece into your space.
          </p>
        </div>

        {/* Category tabs */}
        <div className="flex flex-wrap justify-center gap-10 mb-16 border-b border-[#3D1A12]/10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`pb-4 text-xs font-black uppercase tracking-widest transition-all duration-300 relative ${
                activeCategory === cat
                  ? "text-[#3D1A12]"
                  : "text-[#3D1A12]/30 hover:text-[#3D1A12]/60"
              }`}
            >
              {cat}
              {activeCategory === cat && (
                <span className="absolute bottom-0 left-0 w-full h-px bg-[#3D1A12]" />
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
              Nothing here yet.
            </p>
          </div>
        )}

        {/* Bottom CTA */}
        <div className="mt-24 text-center border-t border-[#3D1A12]/10 pt-16">
          <p className="text-[#3D1A12]/40 text-sm mb-2">Still have a question?</p>
          <a
            href="mailto:mipadorofficial@gmail.com"
            className="text-[#3D1A12] font-black text-sm uppercase tracking-widest border-b border-[#3D1A12]/30 hover:border-[#3D1A12] transition-colors pb-0.5"
          >
            Write to us directly
          </a>
        </div>

      </div>
    </div>
  );
};

export default FaqsPage;