import React from "react";
import {
  X,
  Plus,
  Minus,
  Trash2,
  MessageCircle,
  ShoppingBag,
} from "lucide-react";
import { useProductStore } from "../../../../store/product.store";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

const DELIVERY = 150;

const CartDrawer: React.FC = () => {
  const {
    cart,
    cartOpen,
    setCartOpen,
    allProducts,
    updateQuantity,
    removeFromCart,
    clearCart,
    getCartTotal,
  } = useProductStore();

  const total = getCartTotal();
  const grandTotal = total + (total > 0 ? DELIVERY : 0);

  // safer mapping (no non-null assertions)
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

  const handleWhatsAppCart = () => {
    if (cart.length === 0) return;

    const lines = cartProducts
      .map(
        ({ item, product }) =>
          `• ${product.name} ×${item.quantity} — ${(
            product.price * item.quantity
          ).toLocaleString()} MAD`
      )
      .join("\n");

    const message = `Hello Mipador,

I would like to place an order.

Items:
${lines}

Subtotal: ${total.toLocaleString()} MAD
Delivery: ${DELIVERY} MAD
Total: ${grandTotal.toLocaleString()} MAD

Name:
City:

Please confirm availability and delivery details.

Thank you.`;

    const encoded = encodeURIComponent(message);
    window.open(
      `https://wa.me/212612918900?text=${encoded}`,
      "_blank"
    );
  };

  return (
    <AnimatePresence>
      {cartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setCartOpen(false)}
            className="fixed inset-0 bg-[#3D1A12]/20 backdrop-blur-sm z-60"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-[#F6F4F1] z-60 flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-[#3D1A12]/10">
              <div className="flex items-center gap-3">
                <ShoppingBag size={18} className="text-[#3D1A12]" />
                <span className="text-sm font-black text-[#3D1A12] uppercase tracking-widest">
                  Cart ({cart.reduce((s, i) => s + i.quantity, 0)})
                </span>
              </div>

              <button
                onClick={() => setCartOpen(false)}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#3D1A12]/8 transition-colors"
              >
                <X size={16} className="text-[#3D1A12]" />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6 py-6 space-y-5">
              {cartProducts.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <ShoppingBag
                    size={40}
                    className="text-[#3D1A12]/15 mb-4"
                  />
                  <p className="text-[#3D1A12]/40 font-black text-sm uppercase tracking-widest">
                    Your cart is empty
                  </p>
                  <p className="text-[#3D1A12]/25 text-xs mt-2">
                    Add a piece you love.
                  </p>

                  <Link
                    to="/products"
                    onClick={() => setCartOpen(false)}
                    className="mt-4 text-[10px] font-black uppercase tracking-widest text-[#3D1A12] underline"
                  >
                    Explore Collection
                  </Link>
                </div>
              ) : (
                cartProducts.map(({ item, product }) => (
                  <div
                    key={item.productId}
                    className="flex gap-4 bg-white rounded-2xl p-4"
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

                      <p className="text-sm font-black text-[#3D1A12] mt-2">
                        {(
                          product.price * item.quantity
                        ).toLocaleString()}{" "}
                        MAD
                      </p>

                      {/* Qty + remove */}
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center gap-2 bg-[#F6F4F1] rounded-lg p-1">
                          <button
                            onClick={() =>
                              updateQuantity(
                                item.productId,
                                item.quantity - 1
                              )
                            }
                            className="w-6 h-6 flex items-center justify-center rounded hover:bg-white transition-colors"
                          >
                            <Minus size={11} />
                          </button>

                          <span className="text-xs font-black w-4 text-center">
                            {item.quantity}
                          </span>

                          <button
                            onClick={() =>
                              updateQuantity(
                                item.productId,
                                item.quantity + 1
                              )
                            }
                            className="w-6 h-6 flex items-center justify-center rounded hover:bg-white transition-colors"
                          >
                            <Plus size={11} />
                          </button>
                        </div>

                        <button
                          onClick={() =>
                            removeFromCart(item.productId)
                          }
                          className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-red-50 transition-colors"
                        >
                          <Trash2 size={13} className="text-red-400" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Summary */}
            {cartProducts.length > 0 && (
              <div className="px-6 py-6 border-t border-[#3D1A12]/10 space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-xs text-[#3D1A12]/50">
                    <span>Subtotal</span>
                    <span>{total.toLocaleString()} MAD</span>
                  </div>

                  <div className="flex justify-between text-xs text-[#3D1A12]/50">
                    <span>Delivery</span>
                    <span>{DELIVERY} MAD</span>
                  </div>

                  <div className="flex justify-between text-sm font-black text-[#3D1A12] pt-2 border-t border-[#3D1A12]/10">
                    <span>Total</span>
                    <span>{grandTotal.toLocaleString()} MAD</span>
                  </div>
                </div>

                {/* WhatsApp */}
                <button
                  onClick={handleWhatsAppCart}
                  className="w-full bg-[#25D366] text-white py-4 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-[#1ebe5d] active:scale-95 transition-all"
                >
                  <MessageCircle size={14} />
                  Order via WhatsApp
                </button>

                {/* Clear */}
                <button
                  onClick={clearCart}
                  className="w-full text-[#3D1A12]/30 text-[9px] font-black uppercase tracking-widest hover:text-[#3D1A12]/60 transition-colors"
                >
                  Clear Cart
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;