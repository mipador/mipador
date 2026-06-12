import React from "react";
import type { Product } from "../../../../store/product.store";
import ProductCard from "./ProductCard";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const gridVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: EASE },
  },
};

const ProductGrid: React.FC<{ products: Product[] }> = ({ products }) => {
  const { t } = useTranslation();

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-40 bg-white/50 rounded-3xl border-2 border-dashed border-[#3D1A12]/10">
        <p className="text-[#3D1A12]/40 font-black italic text-sm">
          {t("products.noResults")}
        </p>
        <p className="text-[#3D1A12]/25 text-xs mt-2 uppercase tracking-widest">
          {t("products.clearAllFilters")}
        </p>
      </div>
    );
  }

  return (
    <motion.div
      key={products.map((p) => p.id).join(",")}
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-24"
      variants={gridVariants}
      initial="hidden"
      animate="visible"
    >
      {products.map((p) => (
        <motion.div key={p.id} variants={cardVariants}>
          <ProductCard product={p} />
        </motion.div>
      ))}
    </motion.div>
  );
};

export default ProductGrid;
