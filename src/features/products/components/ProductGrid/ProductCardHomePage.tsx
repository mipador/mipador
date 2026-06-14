import React from "react";
import type { Product } from "../../../../store/product.store";
import { useProductStore } from "../../../../store/product.store";
import { useParams, Link } from "react-router-dom";
import { Heart } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { toWebp } from "../../../../utils/image";
import { localizeProduct } from "../../../../utils/localizeProduct";

const ProductCardHomePage: React.FC<{ product: Product }> = ({ product: rawProduct }) => {
  const toggleWishlist = useProductStore((s) => s.toggleWishlist);
  const wishlist = useProductStore((s) => s.wishlist);
  const wishlisted = wishlist.includes(rawProduct.id);
  const isComingSoon = rawProduct.status === "coming-soon";
  const isOutOfStock = rawProduct.status === "out-of-stock";
  const isUnavailable = isComingSoon || isOutOfStock;
  const { t } = useTranslation();

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(rawProduct.id);
  };

  const { lang } = useParams();
  const currentLang = lang || "en";
  const product = localizeProduct(rawProduct, currentLang);

  return (
    <motion.div
      whileHover={isUnavailable ? {} : { y: -6 }}
      transition={{ type: "spring", stiffness: 280, damping: 22 }}
    >
      <Link
        to={`/${currentLang}/products/${product.slug}`}
        className="flex flex-col group"
      >
        {/* Image */}
        <div className="relative aspect-[3/4] rounded-xl bg-[#EFEBE9] overflow-hidden shadow-sm transition-shadow duration-500 group-hover:shadow-[0_16px_48px_rgba(61,26,18,0.12)]">
          {/* Badges */}
          <div className="absolute top-3 left-3 z-20 flex flex-col gap-1.5">
            {product.tags.includes("new") && (
              <span className="px-2.5 py-1 bg-[#C9922A] text-[#3D1A12] text-[9px] font-black uppercase tracking-widest rounded-xl">
                {t("card.new")}
              </span>
            )}
            {product.tags.includes("bestseller") && (
              <span className="px-2.5 py-1 bg-[#3D1A12] text-white text-[9px] font-black uppercase tracking-widest rounded-xl">
                {t("card.bestseller")}
              </span>
            )}
            {isComingSoon && (
              <span className="px-2.5 py-1 bg-white/90 text-[#3D1A12] text-[9px] font-black uppercase tracking-widest rounded-xl">
                {t("card.comingSoon")}
              </span>
            )}
            {isOutOfStock && (
              <span className="px-2.5 py-1 bg-white/90 text-[#3D1A12]/60 text-[9px] font-black uppercase tracking-widest rounded-xl">
                {t("card.soldOut")}
              </span>
            )}
          </div>

          {/* Location badge */}
          <div className="absolute top-3 right-3 z-20 px-2.5 py-1 bg-white/80 backdrop-blur-md rounded-xl">
            <p className="text-[9px] font-black uppercase tracking-widest text-[#3D1A12]/50">
              {product.location}
            </p>
          </div>

          {/* Image */}
          <div
            className={`w-full h-full transition-all duration-700 ${
              !isUnavailable && "group-hover:scale-105"
            } ${isComingSoon ? "blur-lg opacity-40" : ""}`}
          >
            {product.images[0] ? (
              <picture style={{ display: "contents" }}>
                <source
                  srcSet={toWebp(product.images[0])}
                  type="image/webp"
                  sizes="(max-width: 640px) calc(100vw - 32px), (max-width: 1024px) calc(50vw - 56px), 370px"
                />
                <img
                  src={product.images[0]}
                  alt={product.name}
                  loading="lazy"
                  decoding="async"
                  sizes="(max-width: 640px) calc(100vw - 32px), (max-width: 1024px) calc(50vw - 56px), 370px"
                  className="w-full h-full object-cover"
                />
              </picture>
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <p className="text-[#3D1A12]/20 text-xs font-black uppercase tracking-widest">
                  {product.collection}
                </p>
              </div>
            )}
          </div>

          {/* Desktop hover cue */}
          {!isUnavailable && (
            <div className="absolute inset-0 bg-[#3D1A12]/15 opacity-0 group-hover:opacity-100 transition-all duration-300 hidden md:flex items-end justify-center pb-6">
              <span className="bg-white text-[#3D1A12] text-[10px] font-black uppercase tracking-widest px-5 py-2.5 rounded-xl shadow-sm">
                {t("card.viewDetails")}
              </span>
            </div>
          )}

          {/* Wishlist toggle */}
          <motion.button
            onClick={handleWishlist}
            whileTap={{ scale: 1.3 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            aria-label={wishlisted ? t("wishlist.remove") : t("wishlist.add")}
            className="absolute bottom-2 right-2 z-30 w-11 h-11 rounded-xl bg-white/80 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-colors shadow-sm"
          >
            <Heart
              size={14}
              className={`transition-all duration-200 ${
                wishlisted
                  ? "text-[#3D1A12] fill-[#3D1A12]"
                  : "text-[#3D1A12]/40"
              }`}
            />
          </motion.button>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCardHomePage;
