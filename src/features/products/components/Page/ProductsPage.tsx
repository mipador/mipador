import React, { useState } from "react";
import { useProductStore } from "../../../../store/product.store";
import { SlidersHorizontal, X } from "lucide-react";
import { useTranslation } from "react-i18next";
import ProductToolbar from "../ProductToolbar/ProductToolbar";
import ProductGrid from "../ProductGrid/ProductGrid";
import ProductFilters from "../ProductFilters/ProductFilters";
import Pagination from "../Pagination/Pagination";
import { AnimatePresence, motion } from "framer-motion";
import ScrollToTop from "../../../../components/ScrollToTop";

export const ITEMS_PER_PAGE = 9;

const ProductsPage: React.FC = () => {
  const {
    getFilteredProducts, currentPage,
    hasActiveFilters, resetFilters,
  } = useProductStore();
  const { t } = useTranslation();
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const filteredData = getFilteredProducts();
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentItems = filteredData.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <div className="min-h-screen bg-[#F6F4F1]">
      <ScrollToTop />

      <div className="max-w-7xl mx-auto px-4 md:px-6 pt-28 md:pt-32 pb-24">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-10 md:mb-16 flex flex-col md:flex-row md:items-end justify-between gap-4"
        >
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-[#3D1A12]/35 mb-2">
              {t("products.studio")}
            </p>
            <h1 className="text-4xl md:text-7xl font-black text-[#3D1A12] tracking-tight leading-none">
              {t("products.heading")}
            </h1>
            <p className="mt-2 text-[#3D1A12]/40 text-sm font-light">
              {t("products.pieces", { count: filteredData.length })}
              {hasActiveFilters() && (
                <button
                  onClick={resetFilters}
                  className="ml-3 text-[#C9922A] font-black text-xs uppercase tracking-widest hover:text-[#3D1A12] transition-colors"
                >
                  {t("products.clearFilters")}
                </button>
              )}
            </p>
          </div>

          {/* Mobile filter trigger */}
          <button
            onClick={() => setMobileFiltersOpen(true)}
            className="lg:hidden self-start flex items-center gap-2 bg-white border border-[#3D1A12]/10 px-4 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest text-[#3D1A12]"
          >
            <SlidersHorizontal size={13} />
            {t("products.filtersButton")}
            {hasActiveFilters() && <span className="w-1.5 h-1.5 rounded-xl bg-[#C9922A] inline-block" />}
          </button>
        </motion.div>

        <ProductToolbar />

        <div className="flex gap-10 lg:gap-16">
          <ProductFilters />

          <div className="flex-1 min-w-0">
            {filteredData.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-32 text-center">
                <p className="text-[#3D1A12]/30 font-black text-sm uppercase tracking-widest mb-4">
                  {t("products.noResults")}
                </p>
                <button
                  onClick={resetFilters}
                  className="text-[10px] font-black uppercase tracking-widest text-[#C9922A] hover:text-[#3D1A12] transition-colors border-b border-[#C9922A]/40 pb-0.5"
                >
                  {t("products.clearAllFilters")}
                </button>
              </div>
            ) : (
              <>
                <ProductGrid products={currentItems} />
                <Pagination />
              </>
            )}
          </div>
        </div>
      </div>

      {/* Mobile filter bottom sheet */}
      <AnimatePresence>
        {mobileFiltersOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileFiltersOpen(false)}
              className="fixed inset-0 bg-[#3D1A12]/20 backdrop-blur-sm z-[60] lg:hidden"
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed bottom-0 left-0 right-0 bg-[#F6F4F1] rounded-t-3xl z-[61] lg:hidden max-h-[85vh] overflow-y-auto"
            >
              <div className="flex justify-center pt-3 pb-1">
                <div className="w-10 h-1 rounded-xl bg-[#3D1A12]/15" />
              </div>
              <div className="flex items-center justify-between px-6 py-4 border-b border-[#3D1A12]/10">
                <p className="text-sm font-black uppercase tracking-widest text-[#3D1A12]">
                  {t("products.filtersButton")}
                </p>
                <button
                  onClick={() => setMobileFiltersOpen(false)}
                  className="w-8 h-8 flex items-center justify-center rounded-xl hover:bg-[#3D1A12]/8 transition-colors"
                >
                  <X size={16} className="text-[#3D1A12]" />
                </button>
              </div>
              <div className="px-6 py-6 pb-12">
                <ProductFilters mobile />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProductsPage;
