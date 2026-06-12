import React, { useState, useEffect, useRef } from "react";
import { X, Plus, Minus, Trash2, ShoppingBag, ShoppingCart } from "lucide-react";
import { useProductStore } from "../../../../store/product.store";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import OrderForm from "../Order/OrderForm";

const DELIVERY = 150;

const CartDrawer: React.FC = () => {
  const {
    cart, cartOpen, setCartOpen,
    allProducts, updateQuantity,
    removeFromCart, clearCart, getCartTotal,
  } = useProductStore();

  const { t } = useTranslation();
  const [showOrderForm, setShowOrderForm] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const total = getCartTotal();
  const grandTotal = total + (total > 0 ? DELIVERY : 0);

  const cartProducts = cart
    .map((item) => {
      const product = allProducts.find((p) => p.id === item.productId);
      if (!product) return null;
      return { item, product };
    })
    .filter(Boolean) as {
    item: (typeof cart)[number];
    product: (typeof allProducts)[number];
  }[];

  const { lang } = useParams();
  const currentLang = lang || "en";
  const isRTL = currentLang === "ar" || currentLang === "ma";

  const handleClose = () => {
    setCartOpen(false);
    setShowOrderForm(false);
  };

  // Body scroll lock
  useEffect(() => {
    if (cartOpen) {
      document.body.style.overflow = "hidden";
      const t = setTimeout(() => closeButtonRef.current?.focus(), 60);
      return () => clearTimeout(t);
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [cartOpen]);

  // Escape to close + focus trap
  useEffect(() => {
    if (!cartOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") { handleClose(); return; }

      if (e.key === "Tab" && drawerRef.current) {
        const focusable = Array.from(
          drawerRef.current.querySelectorAll<HTMLElement>(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
          )
        ).filter((el) => !el.hasAttribute("disabled"));

        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === first) { e.preventDefault(); last.focus(); }
        } else {
          if (document.activeElement === last) { e.preventDefault(); first.focus(); }
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [cartOpen]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <AnimatePresence>
      {cartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-[#3D1A12]/20 backdrop-blur-sm z-[60]"
            aria-hidden="true"
          />

          {/* Drawer */}
          <motion.div
            ref={drawerRef}
            role="dialog"
            aria-modal="true"
            aria-label={t("cart.title")}
            initial={{ x: isRTL ? "-100%" : "100%" }}
            animate={{ x: 0 }}
            exit={{ x: isRTL ? "-100%" : "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className={`fixed ${isRTL ? "left-0" : "right-0"} top-0 bottom-0 w-full max-w-md bg-[#F6F4F1] z-[70] flex flex-col shadow-2xl`}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-[#3D1A12]/10 shrink-0">
              <div className="flex items-center gap-3">
                <ShoppingBag size={18} className="text-[#3D1A12]" />
                <span className="text-sm font-black text-[#3D1A12] uppercase tracking-widest">
                  {t("cart.title")} ({cart.reduce((s, i) => s + i.quantity, 0)})
                </span>
              </div>
              <button
                ref={closeButtonRef}
                onClick={handleClose}
                className="w-8 h-8 flex items-center justify-center rounded-xl hover:bg-[#3D1A12]/8 transition-colors"
                aria-label={t("cart.close")}
              >
                <X size={16} className="text-[#3D1A12]" />
              </button>
            </div>

            {/* Scrollable body */}
            <div className="flex-1 overflow-y-auto">

              {/* Cart items */}
              <div className="px-6 py-6 space-y-4">
                {cartProducts.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="flex flex-col items-center justify-center py-16 text-center"
                  >
                    <ShoppingBag size={40} className="text-[#3D1A12]/15 mb-4" />
                    <p className="text-[#3D1A12]/40 font-black text-sm uppercase tracking-widest">
                      {t("cart.empty")}
                    </p>
                    <p className="text-[#3D1A12]/25 text-xs mt-2 mb-5">
                      {t("cart.emptyHint")}
                    </p>
                    <Link
                      to={`/${currentLang}/products`}
                      onClick={handleClose}
                      className="text-[10px] font-black uppercase tracking-widest text-[#3D1A12] border-b border-[#3D1A12]/30 pb-0.5"
                    >
                      {t("cart.exploreCollection")}
                    </Link>
                  </motion.div>
                ) : (
                  <AnimatePresence initial={false}>
                    {cartProducts.map(({ item, product }) => (
                      <motion.div
                        key={item.productId}
                        layout
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20, height: 0, marginBottom: 0 }}
                        transition={{ duration: 0.25 }}
                        className="flex gap-4 bg-white rounded-xl p-4"
                      >
                        {/* Image */}
                        <div className="w-20 h-20 rounded-xl bg-[#EFEBE9] overflow-hidden shrink-0">
                          {product.images[0] && (
                            <img
                              src={product.images[0]}
                              alt={product.name}
                              className="w-full h-full object-cover"
                            />
                          )}
                        </div>

                        {/* Info */}
                        <div className="flex-1 min-w-0">
                          <p className="text-[9px] font-black uppercase tracking-widest text-[#3D1A12]/40">
                            {product.collection}
                          </p>
                          <p className="text-sm font-black text-[#3D1A12] tracking-tight mt-0.5 truncate">
                            {product.name}
                          </p>
                          <p className="text-sm font-black text-[#3D1A12] mt-1">
                            {(product.price * item.quantity).toLocaleString()} MAD
                          </p>

                          {/* Qty + remove */}
                          <div className="flex items-center justify-between mt-3">
                            <div className="flex items-center gap-2 bg-[#F6F4F1] rounded-lg p-1">
                              <button
                                onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                                className="w-6 h-6 flex items-center justify-center rounded hover:bg-white transition-colors"
                                aria-label={`Decrease quantity of ${product.name}`}
                              >
                                <Minus size={11} className="text-[#3D1A12]" />
                              </button>
                              <span className="text-xs font-black text-[#3D1A12] w-4 text-center">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                                className="w-6 h-6 flex items-center justify-center rounded hover:bg-white transition-colors"
                                aria-label={`Increase quantity of ${product.name}`}
                              >
                                <Plus size={11} className="text-[#3D1A12]" />
                              </button>
                            </div>
                            <button
                              onClick={() => removeFromCart(item.productId)}
                              className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-red-50 transition-colors"
                              aria-label={`Remove ${product.name} from cart`}
                            >
                              <Trash2 size={13} className="text-red-400" />
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                )}
              </div>

              {/* Order section */}
              {cartProducts.length > 0 && (
                <div className="px-6 pb-8 border-t border-[#3D1A12]/10 pt-5 space-y-4">

                  {/* Totals */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs text-[#3D1A12]/50">
                      <span>{t("cart.subtotal")}</span>
                      <span>{total.toLocaleString()} MAD</span>
                    </div>
                    <div className="flex justify-between text-xs text-[#3D1A12]/50">
                      <span>{t("cart.deliveryEstimate")}</span>
                      <span>{DELIVERY} MAD</span>
                    </div>
                    <div className="flex justify-between text-sm font-black text-[#3D1A12] pt-2 border-t border-[#3D1A12]/10">
                      <span>{t("cart.total")}</span>
                      <span>{grandTotal.toLocaleString()} MAD</span>
                    </div>
                  </div>

                  {/* Toggle order form */}
                  <button
                    onClick={() => setShowOrderForm((v) => !v)}
                    className="w-full bg-[#3D1A12] text-white py-4 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-[#4D2A22] active:scale-95 transition-all"
                  >
                    <ShoppingCart size={14} />
                    {showOrderForm
                      ? t("cart.hideOrderForm")
                      : t("cart.placeOrder", { total: grandTotal.toLocaleString() })}
                  </button>

                  {/* Inline order form */}
                  {showOrderForm && (
                    <motion.div
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-white rounded-xl p-5"
                    >
                      <p className="text-[10px] font-black uppercase tracking-widest text-[#3D1A12]/40 mb-5">
                        {t("cart.completeOrder")}
                      </p>
                      <OrderForm
                        lines={cartProducts.map(({ item, product }) => ({
                          name: product.name,
                          collection: product.collection,
                          price: product.price,
                          quantity: item.quantity,
                        }))}
                        total={grandTotal}
                        onSuccess={() => {
                          clearCart();
                          setShowOrderForm(false);
                          setCartOpen(false);
                        }}
                      />
                    </motion.div>
                  )}

                  {/* Clear cart */}
                  {!showOrderForm && (
                    <button
                      onClick={clearCart}
                      className="w-full text-[#3D1A12]/25 text-[9px] font-black uppercase tracking-widest hover:text-[#3D1A12]/50 transition-colors"
                    >
                      {t("cart.clearCart")}
                    </button>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;
