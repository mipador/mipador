import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

interface NavItem {
  label: string;
  path: string;
}

const Navbar: React.FC = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navItems: NavItem[] = [
    { label: "Collection", path: "/products" },
    { label: "About", path: "/about" },
    { label: "Contact", path: "/contact" },
  ];

  // Shrink + float on scroll
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-4">
      {/* Floating pill container */}
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`w-full transition-all duration-500 ease-in-out ${
          scrolled
            ? "max-w-2xl bg-[#f4f4f4]/90 backdrop-blur-xl shadow-lg shadow-[#3D1A12]/8 rounded-2xl border border-[#3D1A12]/10"
            : "max-w-7xl bg-transparent"
        }`}
      >
        <div
          className={`flex items-center justify-between transition-all duration-500 ${
            scrolled ? "px-6 py-3" : "px-2 py-3"
          }`}
        >
          {/* Logo */}
          <Link to="/" className="shrink-0">
            <img
              src="./public/images/LogoMipadorNavBar.png"
              alt="Mipador"
              className="h-7 w-auto object-contain"
            />
          </Link>

          {/* Desktop links — centered */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`relative text-sm font-semibold transition-colors duration-200 group ${
                  location.pathname === item.path
                    ? "text-[#3D1A12]"
                    : "text-[#3D1A12]/50 hover:text-[#3D1A12]"
                }`}
              >
                {item.label}
                {/* Animated underline */}
                <span
                  className={`absolute -bottom-0.5 left-0 h-px bg-[#3D1A12] transition-all duration-300 ${
                    location.pathname === item.path
                      ? "w-full"
                      : "w-0 group-hover:w-full"
                  }`}
                />
              </Link>
            ))}
          </div>

          {/* CTA + mobile toggle */}
          <div className="flex items-center gap-3">
            <Link
              to="/products"
              onClick={() => setIsMobileMenuOpen(false)}
              className={`hidden md:block text-xs font-black uppercase tracking-widest transition-all duration-300 ${
                scrolled
                  ? "bg-[#3D1A12] text-white px-5 py-2.5 rounded-xl hover:bg-[#4D2A22] shadow-sm"
                  : "bg-[#3D1A12] text-white px-5 py-2.5 rounded-xl hover:bg-[#4D2A22]"
              }`}
            >
              Discover
            </Link>

            {/* Mobile hamburger */}
            <button
              className="md:hidden w-9 h-9 flex flex-col items-center justify-center gap-1.5 rounded-lg hover:bg-[#3D1A12]/5 transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <motion.span
                animate={
                  isMobileMenuOpen
                    ? { rotate: 45, y: 6, width: "20px" }
                    : { rotate: 0, y: 0, width: "20px" }
                }
                className="block h-px bg-[#3D1A12] origin-center transition-all"
                style={{ width: 20 }}
              />
              <motion.span
                animate={isMobileMenuOpen ? { opacity: 0, x: -8 } : { opacity: 1, x: 0 }}
                className="block h-px bg-[#3D1A12]"
                style={{ width: 14 }}
              />
              <motion.span
                animate={
                  isMobileMenuOpen
                    ? { rotate: -45, y: -6, width: "20px" }
                    : { rotate: 0, y: 0, width: "20px" }
                }
                className="block h-px bg-[#3D1A12] origin-center"
                style={{ width: 20 }}
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
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="md:hidden overflow-hidden border-t border-[#3D1A12]/10"
            >
              <div className="flex flex-col px-6 py-6 gap-5">
                {navItems.map((item, i) => (
                  <motion.div
                    key={item.path}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.07 }}
                  >
                    <Link
                      to={item.path}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`text-base font-bold transition-colors ${
                        location.pathname === item.path
                          ? "text-[#3D1A12]"
                          : "text-[#3D1A12]/50"
                      }`}
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: navItems.length * 0.07 }}
                >
                  <Link
                    to="/products"
                    className="block text-center w-full bg-[#3D1A12] text-white text-xs font-black uppercase tracking-widest py-3.5 rounded-xl hover:bg-[#4D2A22] transition-colors"
                  >
                    Discover Collection
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </div>
  );
};

export default Navbar;