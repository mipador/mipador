import React, { useState } from "react";
import { useProductStore } from "../../../../store/product.store";
import { SlidersHorizontal, X, ShoppingBag } from "lucide-react";
import ProductToolbar from "../ProductToolbar/ProductToolbar";
import ProductGrid from "../ProductGrid/ProductGrid";
import ProductFilters from "../ProductFilters/ProductFilters";
import Pagination from "../Pagination/Pagination";
import CartDrawer from "../Cart/CartDrawer";
import { AnimatePresence, motion } from "framer-motion";

export const ITEMS_PER_PAGE = 9;

const ProductsPage: React.FC = () => {
  const {
    getFilteredProducts, currentPage,
    hasActiveFilters, resetFilters,
    getCartCount, setCartOpen,
  } = useProductStore();
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const filteredData = getFilteredProducts();
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentItems = filteredData.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  const cartCount = getCartCount();

  return (
    <div className="min-h-screen bg-[#F6F4F1]">
      <CartDrawer />

      {/* Floating cart button */}
      {cartCount > 0 && (
        <button
          onClick={() => setCartOpen(true)}
          className="fixed bottom-6 right-6 z-40 bg-[#3D1A12] text-white px-5 py-3.5 rounded-2xl flex items-center gap-3 shadow-xl shadow-[#3D1A12]/20 hover:bg-[#4D2A22] active:scale-95 transition-all"
        >
          <ShoppingBag size={16} />
          <span className="text-[10px] font-black uppercase tracking-widest">
            Cart · {cartCount}
          </span>
        </button>
      )}

      <div className="max-w-7xl mx-auto px-4 md:px-6 pt-28 md:pt-32 pb-24">

        {/* Header */}
        <div className="mb-10 md:mb-16 flex flex-col md:flex-row md:items-end justify-between gap-4">
          {/* <div
            className="absolute inset-0 opacity-8"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%23C9922A' stroke-width='1.5'%3E%3Cpath d='M40 0L80 40L40 80L0 40Z'/%3E%3Cpath d='M40 20L60 40L40 60L20 40Z'/%3E%3C/g%3E%3C/svg%3E")`,
              backgroundSize: "80px 80px",
            }}
          /> */}
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-[#3D1A12]/35 mb-2">
              Mipador Studio
            </p>
            <h1 className="text-4xl md:text-7xl font-black text-[#3D1A12] tracking-tight leading-none">
              Collection
            </h1>
            <p className="mt-2 text-[#3D1A12]/40 text-sm font-light">
              {filteredData.length} {filteredData.length === 1 ? "piece" : "pieces"}
              {hasActiveFilters() && (
                <button
                  onClick={resetFilters}
                  className="ml-3 text-[#C9922A] font-black text-xs uppercase tracking-widest hover:text-[#3D1A12] transition-colors"
                >
                  Clear filters ×
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
            Filters {hasActiveFilters() && <span className="w-1.5 h-1.5 rounded-full bg-[#C9922A] inline-block" />}
          </button>
        </div>

        <ProductToolbar />

        <div className="flex gap-10 lg:gap-16">
          {/* Desktop sidebar filters */}
          <ProductFilters />

          {/* Grid */}
          <div className="flex-1 min-w-0">
            {filteredData.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-32 text-center">
                <p className="text-[#3D1A12]/30 font-black text-sm uppercase tracking-widest mb-4">
                  No pieces match your selection.
                </p>
                <button
                  onClick={resetFilters}
                  className="text-[10px] font-black uppercase tracking-widest text-[#C9922A] hover:text-[#3D1A12] transition-colors border-b border-[#C9922A]/40 pb-0.5"
                >
                  Clear all filters
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
              {/* Handle */}
              <div className="flex justify-center pt-3 pb-1">
                <div className="w-10 h-1 rounded-full bg-[#3D1A12]/15" />
              </div>

              <div className="flex items-center justify-between px-6 py-4 border-b border-[#3D1A12]/10">
                <p className="text-sm font-black uppercase tracking-widest text-[#3D1A12]">
                  Filters
                </p>
                <button
                  onClick={() => setMobileFiltersOpen(false)}
                  className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#3D1A12]/8 transition-colors"
                >
                  <X size={16} className="text-[#3D1A12]" />
                </button>
              </div>

              <div className="px-6 py-6 pb-12">
                {/* Pass mobile prop so filters render without hidden lg:flex */}
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