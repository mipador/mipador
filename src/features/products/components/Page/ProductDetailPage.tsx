import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  ArrowLeft, ShoppingBag, ChevronLeft, ChevronRight,
  Check, AlertTriangle, Clock, Minus, Plus, Star, X,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { products } from "../../../../data/products";
import { useProductStore } from "../../../../store/product.store";
import OrderForm from "../Order/OrderForm";
import ScrollToTop from "../../../../components/ScrollToTop";
import TrustBadges from "../../../../components/TrustBadges";

// ── Collapsible product detail section ────────────────────
const DetailSection: React.FC<{
  label: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
}> = ({ label, defaultOpen = false, children }) => {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-t border-[#3D1A12]/8">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center justify-between py-4 text-left"
      >
        <span className="text-[10px] font-black uppercase tracking-widest text-[#3D1A12]/55">
          {label}
        </span>
        <span
          className={`shrink-0 w-6 h-6 rounded-lg flex items-center justify-center transition-all duration-200 ${
            open ? "bg-[#3D1A12] text-white" : "bg-[#3D1A12]/8 text-[#3D1A12]/40"
          }`}
        >
          {open ? <Minus size={10} /> : <Plus size={10} />}
        </span>
      </button>
      <div
        className={`grid transition-all duration-300 ease-in-out ${
          open ? "grid-rows-[1fr] opacity-100 pb-5" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">{children}</div>
      </div>
    </div>
  );
};

// ── Stock alert ───────────────────────────────────────────
const StockAlert: React.FC<{ stock: number }> = ({ stock }) => {
  const { t } = useTranslation();
  if (stock <= 0) return null;

  if (stock <= 3) {
    return (
      <div className="flex items-center gap-2 bg-red-50 border border-red-200 rounded-xl px-4 py-3">
        <AlertTriangle size={14} className="text-red-500 shrink-0" />
        <p className="text-xs font-black text-red-600 uppercase tracking-wider">
          {t("product.onlyLeft", { count: stock })}
        </p>
      </div>
    );
  }

  if (stock <= 8) {
    return (
      <div className="flex items-center gap-2 bg-[#C9922A]/8 border border-[#C9922A]/20 rounded-xl px-4 py-3">
        <Clock size={14} className="text-[#C9922A] shrink-0" />
        <p className="text-xs font-black text-[#C9922A] uppercase tracking-wider">
          {t("product.lowStock", { count: stock })}
        </p>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <div className="w-2 h-2 rounded-xl bg-green-500" />
      <p className="text-xs font-black text-green-600 uppercase tracking-widest">
        {t("product.inStock")}
      </p>
    </div>
  );
};

// ── Star rating (static — reviews feature coming in B1) ───
const StarRating: React.FC = () => (
  <div className="flex items-center gap-2">
    <div className="flex gap-0.5">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          size={13}
          className={i < 4 ? "text-[#C9922A] fill-[#C9922A]" : "text-[#3D1A12]/20"}
        />
      ))}
    </div>
    <p className="text-xs text-[#3D1A12]/40 font-light">
      4.8 · <span className="font-black text-[#3D1A12]">24 orders</span>
    </p>
  </div>
);

// ── Main page ─────────────────────────────────────────────
const ProductDetailPage: React.FC = () => {
  const { slug, lang } = useParams<{ slug: string; lang: string }>();
  const { addToCart } = useProductStore();
  const { t } = useTranslation();
  const shouldReduce = useReducedMotion();
  const currentLang = lang || "en";

  const [imgIndex, setImgIndex] = useState(0);
  const [added, setAdded] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [zoomed, setZoomed] = useState(false);

  const product = products.find((p) => p.slug === slug);

  // Close zoom on Escape
  useEffect(() => {
    if (!zoomed) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setZoomed(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [zoomed]);

  // Scroll lock while zoomed
  useEffect(() => {
    document.body.style.overflow = zoomed ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [zoomed]);

  if (!product) {
    return (
      <div className="min-h-screen bg-[#F6F4F1] flex flex-col items-center justify-center text-center px-6">
        <p className="text-[#3D1A12]/30 font-black text-sm uppercase tracking-widest mb-6">
          {t("product.notFound")}
        </p>
        <Link
          to={`/${currentLang}/products`}
          className="text-[10px] font-black uppercase tracking-widest text-[#C9922A] border-b border-[#C9922A]/40 pb-0.5"
        >
          {t("product.backToCollection")}
        </Link>
      </div>
    );
  }

  const isComingSoon = product.status === "coming-soon";
  const isOutOfStock = product.status === "out-of-stock";
  const isUnavailable = isComingSoon || isOutOfStock;
  const stock = product.stock ?? 12;
  const totalPrice = product.price * quantity;
  const currentImage = product.images[imgIndex];

  const handleAddToCart = () => {
    if (!isUnavailable) {
      for (let i = 0; i < quantity; i++) addToCart(product.id);
      setAdded(true);
      setTimeout(() => setAdded(false), 2000);
    }
  };

  const related = products
    .filter(
      (p) =>
        p.id !== product.id &&
        (p.collection === product.collection || p.category === product.category)
    )
    .slice(0, 3);

  return (
    <div className="relative min-h-screen bg-[#F6F4F1] overflow-hidden">
      <ScrollToTop />

      {/* ── Image zoom lightbox ── */}
      <AnimatePresence>
        {zoomed && currentImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            onClick={() => setZoomed(false)}
            className="fixed inset-0 z-[90] bg-black/85 flex items-center justify-center p-4 cursor-zoom-out"
            role="dialog"
            aria-modal="true"
            aria-label={t("product.zoomClose")}
          >
            <motion.img
              initial={shouldReduce ? {} : { scale: 0.88, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={shouldReduce ? {} : { scale: 0.88, opacity: 0 }}
              transition={{ type: "spring", stiffness: 280, damping: 26 }}
              src={currentImage}
              alt={product.name}
              onClick={(e) => e.stopPropagation()}
              className="max-w-full max-h-full object-contain rounded-xl shadow-2xl"
              style={{ maxHeight: "90vh" }}
            />
            <button
              onClick={() => setZoomed(false)}
              className="absolute top-4 right-4 w-10 h-10 rounded-xl bg-white/15 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/25 transition-colors"
              aria-label={t("product.zoomClose")}
            >
              <X size={18} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-4 md:px-6 pt-24 md:pt-32 pb-24">

        {/* Back */}
        <Link
          to={`/${currentLang}/products`}
          className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[#3D1A12]/40 hover:text-[#3D1A12] transition-colors mb-8 md:mb-14"
        >
          <ArrowLeft size={13} /> {t("product.backToCollection")}
        </Link>

        {/* ── Main grid: image | info ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 lg:gap-24">

          {/* ── Images ── */}
          <div className="flex flex-col gap-3">

            {/* Main image — click to zoom */}
            <div className="relative aspect-[4/5] rounded-xl bg-[#EFEBE9] overflow-hidden">
              <div
                className={`w-full h-full ${currentImage ? "cursor-zoom-in" : ""}`}
                onClick={() => currentImage && setZoomed(true)}
                role={currentImage ? "button" : undefined}
                tabIndex={currentImage ? 0 : undefined}
                onKeyDown={(e) => e.key === "Enter" && currentImage && setZoomed(true)}
                aria-label={currentImage ? t("product.zoomClose") : undefined}
              >
                {currentImage ? (
                  <img
                    src={currentImage}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-[1.02]"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <p className="text-[#3D1A12]/20 text-xs font-black uppercase tracking-widest">
                      {product.collection}
                    </p>
                  </div>
                )}
              </div>

              {isUnavailable && (
                <div className="absolute top-4 left-4 px-3 py-1 bg-white/90 backdrop-blur rounded-xl pointer-events-none">
                  <p className="text-[9px] font-black uppercase tracking-widest text-[#3D1A12]">
                    {isComingSoon ? t("card.comingSoon") : t("card.soldOut")}
                  </p>
                </div>
              )}

              {product.tags.includes("bestseller") && (
                <div className="absolute top-4 right-4 px-3 py-1 bg-[#3D1A12] rounded-xl pointer-events-none">
                  <p className="text-[9px] font-black uppercase tracking-widest text-white">
                    {t("card.bestseller")}
                  </p>
                </div>
              )}

              {product.images.length > 1 && (
                <>
                  <button
                    onClick={() => setImgIndex((i) => Math.max(0, i - 1))}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/80 rounded-xl flex items-center justify-center hover:bg-white transition-colors"
                    aria-label="Previous image"
                  >
                    <ChevronLeft size={15} className="text-[#3D1A12]" />
                  </button>
                  <button
                    onClick={() =>
                      setImgIndex((i) => Math.min(product.images.length - 1, i + 1))
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/80 rounded-xl flex items-center justify-center hover:bg-white transition-colors"
                    aria-label="Next image"
                  >
                    <ChevronRight size={15} className="text-[#3D1A12]" />
                  </button>
                </>
              )}

              {product.images.length > 1 && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 pointer-events-none">
                  {product.images.map((_, i) => (
                    <button
                      key={i}
                      onClick={(e) => { e.stopPropagation(); setImgIndex(i); }}
                      className={`pointer-events-auto transition-all duration-300 rounded-xl ${
                        i === imgIndex ? "bg-white w-6 h-1.5" : "bg-white/40 w-1.5 h-1.5"
                      }`}
                      aria-label={`Image ${i + 1}`}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Thumbnails — scrollable on all screen sizes */}
            {product.images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-1 snap-x snap-mandatory">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setImgIndex(i)}
                    className={`shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-all snap-start ${
                      i === imgIndex
                        ? "border-[#3D1A12]"
                        : "border-transparent opacity-50 hover:opacity-80"
                    }`}
                  >
                    <img src={img} alt="" loading="lazy" decoding="async" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ── Info + Order ── */}
          <div className="flex flex-col gap-5">

            {/* Header */}
            <div>
              <p className="text-[9px] font-black uppercase tracking-[0.3em] text-[#3D1A12]/35 mb-2">
                {product.collection} · {product.location}
              </p>
              <h1 className="text-2xl md:text-4xl font-black text-[#3D1A12] tracking-tight leading-tight">
                {product.name}
              </h1>
              <p className="text-[#3D1A12]/50 italic text-sm mt-1.5">
                {product.tagline}
              </p>
            </div>

            {/* Rating */}
            <StarRating />

            {/* Price */}
            <div>
              <p className="text-3xl font-black text-[#3D1A12]">
                {product.price.toLocaleString()} MAD
              </p>
              {quantity > 1 && (
                <p className="text-sm text-[#3D1A12]/40 mt-1 font-light">
                  × {quantity} ={" "}
                  <span className="font-black text-[#3D1A12]">
                    {totalPrice.toLocaleString()} MAD
                  </span>
                </p>
              )}
            </div>

            {/* Stock alert */}
            {!isUnavailable && <StockAlert stock={stock} />}

            {/* Trust badges */}
            <TrustBadges />

            {/* ── ORDER FORM ── */}
            {!isUnavailable && (
              <div className="bg-white rounded-xl p-5 border border-[#3D1A12]/8 flex flex-col gap-4">
                <p className="text-[10px] font-black uppercase tracking-widest text-[#3D1A12]/40">
                  {t("product.orderThisPiece")}
                </p>

                {/* Quantity selector */}
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-[#3D1A12]/45">
                    {t("product.quantity")}
                  </label>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-3 bg-[#F6F4F1] rounded-xl p-1.5">
                      <button
                        onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                        className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white transition-colors"
                        aria-label="Decrease quantity"
                      >
                        <Minus size={13} className="text-[#3D1A12]" />
                      </button>
                      <span className="text-sm font-black text-[#3D1A12] w-6 text-center">
                        {quantity}
                      </span>
                      <button
                        onClick={() => setQuantity((q) => Math.min(stock || 10, q + 1))}
                        className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white transition-colors"
                        aria-label="Increase quantity"
                      >
                        <Plus size={13} className="text-[#3D1A12]" />
                      </button>
                    </div>
                    {stock > 0 && stock <= 8 && (
                      <p className="text-[10px] text-[#C9922A] font-black uppercase tracking-wider">
                        {t("product.countAvailable", { count: stock })}
                      </p>
                    )}
                  </div>
                </div>

                <OrderForm
                  lines={[{
                    name: product.name,
                    collection: product.collection,
                    price: product.price,
                    quantity,
                  }]}
                  total={totalPrice}
                  onSuccess={() => setQuantity(1)}
                />

                {/* Add to cart — secondary CTA */}
                <button
                  onClick={handleAddToCart}
                  disabled={added}
                  className={`w-full py-3 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 transition-all duration-300 border ${
                    added
                      ? "bg-[#C9922A]/10 border-[#C9922A]/30 text-[#C9922A]"
                      : "bg-transparent border-[#3D1A12]/15 text-[#3D1A12]/50 hover:border-[#3D1A12]/30 hover:text-[#3D1A12]"
                  }`}
                >
                  {added ? (
                    <><Check size={12} /> {t("product.addedToCart")}</>
                  ) : (
                    <><ShoppingBag size={12} /> {t("product.addToCartInstead")}</>
                  )}
                </button>
              </div>
            )}

            {/* Unavailable state */}
            {isUnavailable && (
              <div className="w-full py-4 rounded-xl bg-[#3D1A12]/8 text-[#3D1A12]/30 text-[10px] font-black uppercase tracking-widest text-center">
                {isComingSoon
                  ? t("product.unavailableComingSoon")
                  : t("product.unavailableSoldOut")}
              </div>
            )}

            {/* ── Collapsible detail sections ── */}
            <div className="border-t border-[#3D1A12]/8 pt-1">

              <DetailSection label={t("product.aboutThisPiece")} defaultOpen>
                <p className="text-[#3D1A12]/60 text-sm leading-relaxed font-light">
                  {product.description}
                </p>
              </DetailSection>

              <DetailSection label={t("product.materials")}>
                <div className="flex flex-wrap gap-2">
                  {product.materials.map((m, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-white border border-[#3D1A12]/10 rounded-xl text-[10px] font-black uppercase tracking-wider text-[#3D1A12]/50"
                    >
                      {m}
                    </span>
                  ))}
                </div>
              </DetailSection>

              <DetailSection label={t("product.dimensions")}>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: "W", value: `${product.dimensions.width} cm` },
                    { label: "D", value: `${product.dimensions.depth} cm` },
                    { label: "H", value: `${product.dimensions.height} cm` },
                    { label: "kg", value: `${product.dimensions.weight} kg` },
                  ].map(({ label, value }) => (
                    <div
                      key={label}
                      className="bg-white rounded-xl px-4 py-3 border border-[#3D1A12]/8"
                    >
                      <p className="text-[9px] font-black uppercase tracking-widest text-[#3D1A12]/35 mb-0.5">
                        {label}
                      </p>
                      <p className="text-sm font-black text-[#3D1A12]">{value}</p>
                    </div>
                  ))}
                </div>
              </DetailSection>

              <DetailSection label={t("product.care")}>
                <ul className="space-y-2">
                  {product.care.map((c, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-sm text-[#3D1A12]/50 font-light"
                    >
                      <span className="text-[#C9922A] shrink-0 font-black mt-0.5">·</span>
                      {c}
                    </li>
                  ))}
                </ul>
              </DetailSection>

              <DetailSection label={t("product.leadTime")}>
                <div className="space-y-2">
                  {product.colors.length > 0 && (
                    <p className="text-sm text-[#3D1A12]/60 font-light">
                      <span className="text-[10px] font-black uppercase tracking-widest text-[#3D1A12]/40">
                        {t("product.availableIn")}:{" "}
                      </span>
                      {product.colors.join(", ")}
                    </p>
                  )}
                  <p className="text-sm text-[#3D1A12]/60 font-light">
                    {t("product.leadTimeValue", { time: product.leadTime })}
                  </p>
                </div>
              </DetailSection>
            </div>
          </div>
        </div>

        {/* ── Related products ── */}
        {related.length > 0 && (
          <div className="mt-20 md:mt-32">
            <div className="border-t border-[#3D1A12]/10 pt-12 mb-10">
              <p className="text-[10px] font-black uppercase tracking-[0.4em] text-[#3D1A12]/35 mb-2">
                {t("product.youMayAlsoLike")}
              </p>
              <h2 className="text-2xl md:text-3xl font-black text-[#3D1A12] tracking-tight">
                {t("product.fromTheSameWorld")}
              </h2>
            </div>

            {/* Horizontal scroll on mobile, 3-col grid on md+ */}
            <div className="flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory md:grid md:grid-cols-3 md:gap-8 md:overflow-visible md:pb-0">
              {related.map((p) => (
                <Link
                  key={p.id}
                  to={`/${currentLang}/products/${p.slug}`}
                  className="flex flex-col group shrink-0 w-[70vw] sm:w-[48vw] md:w-auto snap-start"
                  onClick={() => {
                    setImgIndex(0);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                >
                  <div className="aspect-[3/4] rounded-xl bg-[#EFEBE9] overflow-hidden">
                    {p.images[0] ? (
                      <img
                        src={p.images[0]}
                        alt={p.name}
                        loading="lazy"
                        decoding="async"
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
                  <div className="mt-3">
                    <p className="text-[9px] font-black uppercase tracking-widest text-[#3D1A12]/35">
                      {p.collection}
                    </p>
                    <p className="text-sm font-black text-[#3D1A12] tracking-tight mt-1">
                      {p.name}
                    </p>
                    <p className="text-sm font-black text-[#3D1A12] mt-1.5">
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
