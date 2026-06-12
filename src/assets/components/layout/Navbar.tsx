import React, { useState, useEffect } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Heart } from "lucide-react";
import { useTranslation } from "react-i18next";

import LanguageSwitcher from "./LanguageSwitcher";
import { useProductStore } from "../../../store/product.store";

const Navbar: React.FC = () => {
  const location = useLocation();
  const { lang } = useParams();
  const currentLang = lang || "en";
  const { t } = useTranslation();

  const cartOpen = useProductStore((s) => s.cartOpen);
  const setCartOpen = useProductStore((s) => s.setCartOpen);
  // Only count items whose product still exists — prevents phantom badge from stale persisted data
  const cartCount = useProductStore((s) =>
    s.cart
      .filter((i) => s.allProducts.some((p) => p.id === i.productId))
      .reduce((sum, i) => sum + i.quantity, 0)
  );
  const wishlistCount = useProductStore((s) => s.getWishlistCount());

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navItems = [
    { label: t("nav.collection"), path: `/${currentLang}/products` },
    { label: t("nav.about"),      path: `/${currentLang}/about` },
    { label: t("nav.contact"),    path: `/${currentLang}/contact` },
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`fixed top-0 left-0 right-0 z-30 flex justify-center px-4 pt-4 transition-opacity duration-200 ${
        cartOpen ? "opacity-0 pointer-events-none" : ""
      }`}
    >
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`w-full transition-all duration-500 ease-in-out border border-white/10 ${
          scrolled
            ? "max-w-2xl bg-[#f6f4f1]/92 backdrop-blur-2xl shadow-[0_8px_30px_rgba(0,0,0,0.06)] rounded-xl"
            : "max-w-7xl bg-[#f6f4f1]/72 backdrop-blur-xl rounded-xl"
        }`}
      >
        <div
          className={`flex items-center justify-between transition-all duration-500 ${
            scrolled ? "px-6 py-3" : "px-5 py-4"
          }`}
        >
          {/* Logo */}
          <Link to={`/${currentLang}`} className="shrink-0">
            <img
              src="/images/LogoMipadorNavBar.png"
              alt="Mipador"
              className="h-7 w-auto object-contain"
            />
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`relative text-sm font-semibold transition-all duration-300 group ${
                  location.pathname === item.path
                    ? "text-[#3D1A12]"
                    : "text-[#3D1A12]/55 hover:text-[#3D1A12] hover:tracking-[0.02em]"
                }`}
              >
                {item.label}
                <span
                  className={`absolute -bottom-1 left-0 h-px bg-[#3D1A12] transition-all duration-300 ${
                    location.pathname === item.path ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </Link>
            ))}
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-2.5">
            <LanguageSwitcher compact={scrolled} />

            {/* Wishlist button */}
            <Link
              to={`/${currentLang}/wishlist`}
              aria-label={t("wishlist.heading")}
              className="relative w-9 h-9 flex items-center justify-center rounded-xl hover:bg-[#3D1A12]/5 transition-colors"
            >
              <Heart size={17} className="text-[#3D1A12]" />
              <AnimatePresence mode="popLayout">
                {wishlistCount > 0 && (
                  <motion.span
                    key={wishlistCount}
                    initial={{ scale: 0.4, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 600, damping: 22 }}
                    className="absolute -top-0.5 -right-0.5 min-w-[17px] h-[17px] px-1 flex items-center justify-center rounded-full bg-[#3D1A12] text-white text-[9px] font-black leading-none pointer-events-none"
                  >
                    {wishlistCount > 99 ? "99+" : wishlistCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>

            {/* Cart button with animated badge */}
            <button
              onClick={() => setCartOpen(true)}
              aria-label={
                cartCount > 0
                  ? t("nav.openCartCount", { count: cartCount })
                  : t("nav.openCart")
              }
              className="relative w-9 h-9 flex items-center justify-center rounded-xl hover:bg-[#3D1A12]/5 transition-colors"
            >
              <ShoppingBag size={17} className="text-[#3D1A12]" />
              <AnimatePresence mode="popLayout">
                {cartCount > 0 && (
                  <motion.span
                    key={cartCount}
                    initial={{ scale: 0.4, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 600, damping: 22 }}
                    className="absolute -top-0.5 -right-0.5 min-w-[17px] h-[17px] px-1 flex items-center justify-center rounded-full bg-[#3D1A12] text-white text-[9px] font-black leading-none pointer-events-none"
                  >
                    {cartCount > 99 ? "99+" : cartCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>

            <AnimatePresence>
              {!scrolled && (
                <motion.div
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: "auto" }}
                  exit={{ opacity: 0, width: 0 }}
                  transition={{ duration: 0.25 }}
                  className="overflow-hidden"
                >
                  <Link
                    to={`/${currentLang}/products`}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="hidden md:flex items-center justify-center text-xs font-black uppercase tracking-widest bg-[#3D1A12] text-white px-5 py-2.5 rounded-xl hover:bg-[#4D2A22] transition-all duration-300 shadow-sm whitespace-nowrap"
                  >
                    {t("nav.discover")}
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Mobile hamburger */}
            <button
              className="md:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5 rounded-xl hover:bg-[#3D1A12]/5 transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={t("nav.toggleMenu")}
              aria-expanded={isMobileMenuOpen}
            >
              <motion.span
                animate={isMobileMenuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                className="block h-px w-5 bg-[#3D1A12]"
              />
              <motion.span
                animate={isMobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                className="block h-px w-4 bg-[#3D1A12]"
              />
              <motion.span
                animate={isMobileMenuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                className="block h-px w-5 bg-[#3D1A12]"
              />
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden overflow-hidden border-t border-[#3D1A12]/10 bg-[#f6f4f1]/95 backdrop-blur-2xl"
            >
              <div className="flex flex-col px-6 py-6 gap-5">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`text-base font-bold transition-colors duration-300 ${
                      location.pathname === item.path
                        ? "text-[#3D1A12]"
                        : "text-[#3D1A12]/50"
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}

                <Link
                  to={`/${currentLang}/wishlist`}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center gap-2 text-base font-bold transition-colors duration-300 ${
                    location.pathname.includes("/wishlist")
                      ? "text-[#3D1A12]"
                      : "text-[#3D1A12]/50"
                  }`}
                >
                  <Heart size={16} />
                  {t("wishlist.heading")}
                  {wishlistCount > 0 && (
                    <span className="ml-1 min-w-[18px] h-[18px] px-1 flex items-center justify-center rounded-full bg-[#3D1A12] text-white text-[9px] font-black">
                      {wishlistCount}
                    </span>
                  )}
                </Link>

                <Link
                  to={`/${currentLang}/products`}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block text-center w-full bg-[#3D1A12] text-white text-xs font-black uppercase tracking-widest py-3.5 rounded-xl hover:bg-[#4D2A22] transition-colors"
                >
                  {t("nav.discoverCollection")}
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </div>
  );
};

export default Navbar;
