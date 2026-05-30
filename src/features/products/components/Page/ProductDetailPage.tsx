import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  ArrowLeft,
  ShoppingBag,
  MessageCircle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { products } from "../../../../data/products";
import { useProductStore } from "../../../../store/product.store";
import { Check } from "lucide-react";

const ProductDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { addToCart } = useProductStore();
  const [imgIndex, setImgIndex] = useState(0);

  const product = products.find((p) => p.slug === slug);
  const [added, setAdded] = useState(false);

  if (!product) {
    return (
      <div className="min-h-screen bg-[#F6F4F1] flex flex-col items-center justify-center text-center px-6">
        <p className="text-[#3D1A12]/30 font-black text-sm uppercase tracking-widest mb-6">
          This piece doesn't exist.
        </p>
        <Link
          to="/products"
          className="text-[10px] font-black uppercase tracking-widest text-[#C9922A] border-b border-[#C9922A]/40 pb-0.5"
        >
          Back to Collection
        </Link>
      </div>
    );
  }

  const isComingSoon = product.status === "coming-soon";
  const isOutOfStock = product.status === "out-of-stock";
  const isUnavailable = isComingSoon || isOutOfStock;

  const handleWhatsApp = () => {
    const msg = encodeURIComponent(
      `Hello, I would like more information about the ${product.name} (${product.collection}) — ${product.price.toLocaleString()} MAD.`,
    );
    window.open(`https://wa.me/212612918900?text=${msg}`, "_blank");
  };

  const handleAddToCart = () => {
    if (!isUnavailable) {
      addToCart(product.id);
      setAdded(true);
      setTimeout(() => setAdded(false), 2000);
    }
  };

  // Related products — same collection or category, exclude current
  const related = products
    .filter(
      (p) =>
        p.id !== product.id &&
        (p.collection === product.collection ||
          p.category === product.category),
    )
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-[#F6F4F1]">
      <div className="max-w-7xl mx-auto px-4 md:px-6 pt-28 md:pt-32 pb-24">
        {/* Back */}
        <Link
          to="/products"
          className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[#3D1A12]/40 hover:text-[#3D1A12] transition-colors mb-10 md:mb-16"
        >
          <ArrowLeft size={13} /> Back to Collection
        </Link>

        {/* Main layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20">
          {/* Images */}
          <div className="flex flex-col gap-3">
            {/* Main image */}
            <div className="relative aspect-[4/5] rounded-2xl bg-[#EFEBE9] overflow-hidden">
              {product.images[imgIndex] ? (
                <img
                  src={product.images[imgIndex]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <p className="text-[#3D1A12]/20 text-xs font-black uppercase tracking-widest">
                    {product.collection}
                  </p>
                </div>
              )}

              {/* Status badge */}
              {isUnavailable && (
                <div className="absolute top-4 left-4 px-3 py-1 bg-white/90 backdrop-blur rounded-full">
                  <p className="text-[9px] font-black uppercase tracking-widest text-[#3D1A12]">
                    {isComingSoon ? "Coming Soon" : "Sold Out"}
                  </p>
                </div>
              )}

              {/* Prev/next on mobile */}
              {product.images.length > 1 && (
                <>
                  <button
                    onClick={() => setImgIndex((i) => Math.max(0, i - 1))}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/80 rounded-full flex items-center justify-center hover:bg-white transition-colors md:hidden"
                  >
                    <ChevronLeft size={15} className="text-[#3D1A12]" />
                  </button>
                  <button
                    onClick={() =>
                      setImgIndex((i) =>
                        Math.min(product.images.length - 1, i + 1),
                      )
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/80 rounded-full flex items-center justify-center hover:bg-white transition-colors md:hidden"
                  >
                    <ChevronRight size={15} className="text-[#3D1A12]" />
                  </button>
                </>
              )}
            </div>

            {/* Thumbnail strip — desktop */}
            {product.images.length > 1 && (
              <div className="hidden md:flex gap-3">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setImgIndex(i)}
                    className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${
                      i === imgIndex
                        ? "border-[#3D1A12]"
                        : "border-transparent opacity-50 hover:opacity-80"
                    }`}
                  >
                    <img
                      src={img}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Dot nav — mobile */}
            {product.images.length > 1 && (
              <div className="flex md:hidden justify-center gap-2 mt-1">
                {product.images.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setImgIndex(i)}
                    className={`transition-all duration-300 rounded-full ${
                      i === imgIndex
                        ? "bg-[#3D1A12] w-6 h-1.5"
                        : "bg-[#3D1A12]/20 w-1.5 h-1.5"
                    }`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div className="flex flex-col">
            <p className="text-[9px] font-black uppercase tracking-[0.3em] text-[#3D1A12]/35 mb-3">
              {product.collection} · {product.location}
            </p>

            <h1 className="text-3xl md:text-4xl font-black text-[#3D1A12] tracking-tight leading-tight">
              {product.name}
            </h1>
            <p className="text-[#3D1A12]/50 italic text-sm mt-2">
              {product.tagline}
            </p>

            <p className="text-3xl font-black text-[#3D1A12] mt-6">
              {product.price.toLocaleString()} MAD
            </p>

            {/* Tags */}
            <div className="flex gap-2 mt-4 flex-wrap">
              {product.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-[#3D1A12]/8 text-[#3D1A12]/50 text-[9px] font-black uppercase tracking-widest rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Description */}
            <p className="text-[#3D1A12]/60 text-sm leading-relaxed mt-6 font-light">
              {product.description}
            </p>

            {/* Divider */}
            <div className="border-t border-[#3D1A12]/10 my-6" />

            {/* Details */}
            <div className="space-y-4">
              {/* Materials */}
              <div>
                <p className="text-[9px] font-black uppercase tracking-widest text-[#3D1A12]/35 mb-2">
                  Materials
                </p>
                <div className="flex flex-wrap gap-2">
                  {product.materials.map((m, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-white border border-[#3D1A12]/10 rounded-full text-[10px] font-black uppercase tracking-wider text-[#3D1A12]/50"
                    >
                      {m}
                    </span>
                  ))}
                </div>
              </div>

              {/* Dimensions */}
              <div>
                <p className="text-[9px] font-black uppercase tracking-widest text-[#3D1A12]/35 mb-2">
                  Dimensions
                </p>
                <p className="text-sm text-[#3D1A12]/60 font-light">
                  {product.dimensions.width} W × {product.dimensions.depth} D ×{" "}
                  {product.dimensions.height} H cm &nbsp;·&nbsp;{" "}
                  {product.dimensions.weight} kg
                </p>
              </div>

              {/* Colors */}
              <div>
                <p className="text-[9px] font-black uppercase tracking-widest text-[#3D1A12]/35 mb-2">
                  Available in
                </p>
                <p className="text-sm text-[#3D1A12]/60 font-light">
                  {product.colors.join(", ")}
                </p>
              </div>

              {/* Lead time */}
              <div>
                <p className="text-[9px] font-black uppercase tracking-widest text-[#3D1A12]/35 mb-2">
                  Lead time
                </p>
                <p className="text-sm text-[#3D1A12]/60 font-light">
                  Handcrafted to order · Ships in {product.leadTime}
                </p>
              </div>
            </div>

            <div className="border-t border-[#3D1A12]/10 my-6" />

            {/* Care */}
            <div>
              <p className="text-[9px] font-black uppercase tracking-widest text-[#3D1A12]/35 mb-3">
                Care instructions
              </p>
              <ul className="space-y-2">
                {product.care.map((c, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-sm text-[#3D1A12]/50 font-light"
                  >
                    <span className="text-[#C9922A] mt-1 shrink-0">·</span>
                    {c}
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-t border-[#3D1A12]/10 my-6" />

            {/* CTAs — sticky on mobile */}
            <div className="flex flex-col gap-3">
              <button
                onClick={handleAddToCart}
                disabled={isUnavailable || added}
                className={`w-full py-4 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 transition-all duration-300 active:scale-95 ${
                  added
                    ? "bg-[#C9922A] text-white"
                    : isUnavailable
                      ? "bg-[#3D1A12]/10 text-[#3D1A12]/30 cursor-not-allowed"
                      : "bg-[#3D1A12] text-white hover:bg-[#4D2A22]"
                }`}
              >
                {added ? (
                  <>
                    <Check size={13} /> Added to Cart
                  </>
                ) : isComingSoon ? (
                  "Coming Soon"
                ) : isOutOfStock ? (
                  "Sold Out"
                ) : (
                  <>
                    <ShoppingBag size={13} /> Add to Cart
                  </>
                )}
              </button>

              {!isUnavailable && (
                <button
                  onClick={handleWhatsApp}
                  className="w-full py-4 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 bg-[#25D366] text-white hover:bg-[#1ebe5d] active:scale-95 transition-all"
                >
                  <MessageCircle size={13} /> Order via WhatsApp
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Related products */}
        {related.length > 0 && (
          <div className="mt-24 md:mt-32">
            <div className="border-t border-[#3D1A12]/10 pt-16 mb-10">
              <p className="text-[10px] font-black uppercase tracking-[0.4em] text-[#3D1A12]/35 mb-2">
                You may also like
              </p>
              <h2 className="text-2xl md:text-3xl font-black text-[#3D1A12] tracking-tight">
                From the same world.
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {related.map((p) => (
                <Link
                  key={p.id}
                  to={`/products/${p.slug}`}
                  className="flex flex-col group"
                  onClick={() => setImgIndex(0)}
                >
                  <div className="aspect-[3/4] rounded-2xl bg-[#EFEBE9] overflow-hidden">
                    {p.images[0] ? (
                      <img
                        src={p.images[0]}
                        alt={p.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <p className="text-[#3D1A12]/20 text-xs font-black uppercase tracking-widest">
                          {p.collection}
                        </p>
                      </div>
                    )}
                  </div>
                  <div className="mt-4">
                    <p className="text-[9px] font-black uppercase tracking-widest text-[#3D1A12]/35">
                      {p.collection}
                    </p>
                    <p className="text-sm font-black text-[#3D1A12] tracking-tight mt-1">
                      {p.name}
                    </p>
                    <p className="text-sm font-black text-[#3D1A12] mt-2">
                      {p.price.toLocaleString()} MAD
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetailPage;
