import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  ArrowLeft, ShoppingBag, ChevronLeft,
  ChevronRight, Check, AlertTriangle,
  Clock, Minus, Plus, Star,
} from "lucide-react";
// Users
import { products } from "../../../../data/products";
import { useProductStore } from "../../../../store/product.store";
import OrderForm from "../Order/OrderForm";

// ── CRO Alert bar ──────────────────────────────────────────
const StockAlert: React.FC<{ stock: number }> = ({ stock }) => {
  if (stock <= 0) return null;

  if (stock <= 3) {
    return (
      <div className="flex items-center gap-2 bg-red-50 border border-red-200 rounded-xl px-4 py-3">
        <AlertTriangle size={14} className="text-red-500 shrink-0" />
        <p className="text-xs font-black text-red-600 uppercase tracking-wider">
          Only {stock} left — almost gone
        </p>
      </div>
    );
  }

  if (stock <= 8) {
    return (
      <div className="flex items-center gap-2 bg-[#C9922A]/8 border border-[#C9922A]/20 rounded-xl px-4 py-3">
        <Clock size={14} className="text-[#C9922A] shrink-0" />
        <p className="text-xs font-black text-[#C9922A] uppercase tracking-wider">
          Only {stock} pieces left in stock
        </p>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <div className="w-2 h-2 rounded-full bg-green-500" />
      <p className="text-xs font-black text-green-600 uppercase tracking-widest">
        In Stock · Ready to order
      </p>
    </div>
  );
};

// ── Social proof bar ────────────────────────────────────────
// const SocialProof: React.FC<{ productName: string }> = ({ productName }) => {
//   // Deterministic "viewers" based on product name length — feels real, not random
//   const viewers = (productName.length % 6) + 3;
//   return (
//     <div className="flex items-center gap-2 text-[#3D1A12]/40">
//       <Users size={13} className="shrink-0" />
//       <p className="text-xs font-light">
//         <span className="font-black text-[#3D1A12]">{viewers} people</span>{" "}
//         are viewing this piece right now
//       </p>
//     </div>
//   );
// };

// ── Trust badges ────────────────────────────────────────────
const TrustBadges: React.FC = () => (
  <div className="grid grid-cols-3 gap-3">
    {[
      { icon: "🤝", label: "Handcrafted", sub: "By Moroccan artisans" },
      { icon: "📦", label: "Free delivery", sub: "On all orders" },
      { icon: "↩️", label: "7-day returns", sub: "No questions asked" },
    ].map((b) => (
      <div
        key={b.label}
        className="flex flex-col items-center text-center bg-[#F6F4F1] rounded-xl p-3 gap-1"
      >
        <span className="text-lg">{b.icon}</span>
        <p className="text-[9px] font-black uppercase tracking-wider text-[#3D1A12]">
          {b.label}
        </p>
        <p className="text-[9px] text-[#3D1A12]/40 leading-tight">{b.sub}</p>
      </div>
    ))}
  </div>
);

// ── Star rating (static for now) ────────────────────────────
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

// ── Main page ───────────────────────────────────────────────
const ProductDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { addToCart } = useProductStore();
  const [imgIndex, setImgIndex] = useState(0);
  const [added, setAdded] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const { lang } = useParams();
  const currentLang = lang || "en";
  const product = products.find((p) => p.slug === slug);

  if (!product) {
    return (
      <div className="min-h-screen bg-[#F6F4F1] flex flex-col items-center justify-center text-center px-6">
        <p className="text-[#3D1A12]/30 font-black text-sm uppercase tracking-widest mb-6">
          This piece doesn't exist.
        </p>
        <Link
          to={`/${currentLang}/products`}
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
  const stock = product.stock ?? 12;
  const totalPrice = product.price * quantity;

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

      <div className="max-w-7xl mx-auto px-4 md:px-6 pt-24 md:pt-32 pb-24">

        {/* Back */}
        <Link
          to={`/${currentLang}/products`}
          className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[#3D1A12]/40 hover:text-[#3D1A12] transition-colors mb-8 md:mb-14"
        >
          <ArrowLeft size={13} /> Back to Collection
        </Link>

        {/* ── Main grid: image | info ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 lg:gap-24">

          {/* ── Images ── */}
          <div className="flex flex-col gap-3">
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

              {isUnavailable && (
                <div className="absolute top-4 left-4 px-3 py-1 bg-white/90 backdrop-blur rounded-full">
                  <p className="text-[9px] font-black uppercase tracking-widest text-[#3D1A12]">
                    {isComingSoon ? "Coming Soon" : "Sold Out"}
                  </p>
                </div>
              )}

              {/* Badges */}
              {product.tags.includes("bestseller") && (
                <div className="absolute top-4 right-4 px-3 py-1 bg-[#3D1A12] rounded-full">
                  <p className="text-[9px] font-black uppercase tracking-widest text-white">
                    Bestseller
                  </p>
                </div>
              )}

              {product.images.length > 1 && (
                <>
                  <button
                    onClick={() => setImgIndex((i) => Math.max(0, i - 1))}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/80 rounded-full flex items-center justify-center hover:bg-white transition-colors"
                  >
                    <ChevronLeft size={15} className="text-[#3D1A12]" />
                  </button>
                  <button
                    onClick={() =>
                      setImgIndex((i) =>
                        Math.min(product.images.length - 1, i + 1)
                      )
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/80 rounded-full flex items-center justify-center hover:bg-white transition-colors"
                  >
                    <ChevronRight size={15} className="text-[#3D1A12]" />
                  </button>
                </>
              )}

              {/* Dot nav */}
              {product.images.length > 1 && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                  {product.images.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setImgIndex(i)}
                      className={`transition-all duration-300 rounded-full ${
                        i === imgIndex
                          ? "bg-white w-6 h-1.5"
                          : "bg-white/40 w-1.5 h-1.5"
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Thumbnails — desktop only */}
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
                    <img src={img} alt="" className="w-full h-full object-cover" />
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
                  Total: <span className="font-black text-[#3D1A12]">{totalPrice.toLocaleString()} MAD</span> for {quantity} pieces
                </p>
              )}
            </div>

            {/* Stock alert */}
            {!isUnavailable && <StockAlert stock={stock} />}

            {/* Social proof */}
            {/* {!isUnavailable && <SocialProof productName={product.name} />} */}

            {/* Trust badges */}
            <TrustBadges />

            {/* ── ORDER FORM — always visible ── */}
            {!isUnavailable && (
              <div className="bg-white rounded-2xl p-5 border border-[#3D1A12]/8 flex flex-col gap-4">
                <p className="text-[10px] font-black uppercase tracking-widest text-[#3D1A12]/40">
                  Acheter maintenant
                </p>

                {/* Quantity selector */}
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-[#3D1A12]/45">
                    Quantity
                  </label>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-3 bg-[#F6F4F1] rounded-xl p-1.5">
                      <button
                        onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                        className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white transition-colors"
                      >
                        <Minus size={13} className="text-[#3D1A12]" />
                      </button>
                      <span className="text-sm font-black text-[#3D1A12] w-6 text-center">
                        {quantity}
                      </span>
                      <button
                        onClick={() =>
                          setQuantity((q) => Math.min(stock || 10, q + 1))
                        }
                        className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white transition-colors"
                      >
                        <Plus size={13} className="text-[#3D1A12]" />
                      </button>
                    </div>
                    {stock > 0 && stock <= 8 && (
                      <p className="text-[10px] text-[#C9922A] font-black uppercase tracking-wider">
                        {stock} available
                      </p>
                    )}
                  </div>
                </div>

                {/* The form */}
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

                {/* Add to cart — secondary */}
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
                    <><Check size={12} /> Added to Cart</>
                  ) : (
                    <><ShoppingBag size={12} /> Add to Cart Instead</>
                  )}
                </button>
              </div>
            )}

            {/* Unavailable state */}
            {isUnavailable && (
              <div className="w-full py-4 rounded-xl bg-[#3D1A12]/8 text-[#3D1A12]/30 text-[10px] font-black uppercase tracking-widest text-center">
                {isComingSoon ? "Coming Soon — Check back soon" : "Sold Out"}
              </div>
            )}

            {/* Divider */}
            <div className="border-t border-[#3D1A12]/8" />

            {/* Product details — collapsed below order form */}
            <div className="space-y-4">
              <p className="text-[#3D1A12]/60 text-sm leading-relaxed font-light">
                {product.description}
              </p>

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
                <p className="text-[9px] font-black uppercase tracking-widest text-[#3D1A12]/35 mb-1">
                  Dimensions
                </p>
                <p className="text-sm text-[#3D1A12]/60 font-light">
                  {product.dimensions.width} W × {product.dimensions.depth} D ×{" "}
                  {product.dimensions.height} H cm · {product.dimensions.weight} kg
                </p>
              </div>

              {/* Colors */}
              <div>
                <p className="text-[9px] font-black uppercase tracking-widest text-[#3D1A12]/35 mb-1">
                  Available in
                </p>
                <p className="text-sm text-[#3D1A12]/60 font-light">
                  {product.colors.join(", ")}
                </p>
              </div>

              {/* Lead time */}
              <div>
                <p className="text-[9px] font-black uppercase tracking-widest text-[#3D1A12]/35 mb-1">
                  Lead time
                </p>
                <p className="text-sm text-[#3D1A12]/60 font-light">
                  Handcrafted to order · Ships in {product.leadTime}
                </p>
              </div>

              {/* Care */}
              <div>
                <p className="text-[9px] font-black uppercase tracking-widest text-[#3D1A12]/35 mb-2">
                  Care
                </p>
                <ul className="space-y-1.5">
                  {product.care.map((c, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-sm text-[#3D1A12]/50 font-light"
                    >
                      <span className="text-[#C9922A] shrink-0 mt-0.5">·</span>
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* ── Related ── */}
        {related.length > 0 && (
          <div className="mt-20 md:mt-32">
            <div className="border-t border-[#3D1A12]/10 pt-12 mb-10">
              <p className="text-[10px] font-black uppercase tracking-[0.4em] text-[#3D1A12]/35 mb-2">
                You may also like
              </p>
              <h2 className="text-2xl md:text-3xl font-black text-[#3D1A12] tracking-tight">
                From the same world.
              </h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-5 md:gap-8">
              {related.map((p) => (
                <Link
                  key={p.id}
                  to={`/${currentLang}/products/${p.slug}`}
                  className="flex flex-col group"
                  onClick={() => {
                    setImgIndex(0);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
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