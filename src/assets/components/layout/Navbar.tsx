import React, { useState, useEffect } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

import LanguageSwitcher from "./LanguageSwitcher";

interface NavItem {
  label: string;
  path: string;
}

const Navbar: React.FC = () => {
  const location = useLocation();

  const { lang } = useParams();

  const currentLang = lang || "en";

  const [isMobileMenuOpen, setIsMobileMenuOpen] =
    useState(false);

  const [scrolled, setScrolled] = useState(false);

  const navItems: NavItem[] = [
    {
      label: "Collection",
      path: `/${currentLang}/products`,
    },
    {
      label: "About",
      path: `/${currentLang}/about`,
    },
    {
      label: "Contact",
      path: `/${currentLang}/contact`,
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-30 flex justify-center px-4 pt-4">
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          duration: 0.6,
          ease: [0.22, 1, 0.36, 1],
        }}
        className={`w-full transition-all duration-500 ease-in-out border border-white/10 ${
          scrolled
            ? "max-w-2xl bg-[#f6f4f1]/92 backdrop-blur-2xl shadow-[0_8px_30px_rgba(0,0,0,0.06)] rounded-xl"
            : "max-w-7xl bg-[#f6f4f1]/72 backdrop-blur-xl rounded-xl"
        }`}
      >
        <div
          className={`flex items-center justify-between transition-all duration-500 ${
            scrolled
              ? "px-6 py-3"
              : "px-5 py-4"
          }`}
        >
          {/* Logo */}
          <Link
            to={`/${currentLang}`}
            className="shrink-0"
          >
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
                    location.pathname === item.path
                      ? "w-full"
                      : "w-0 group-hover:w-full"
                  }`}
                />
              </Link>
            ))}
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-3">
            <LanguageSwitcher />

            <Link
              to={`/${currentLang}/products`}
              onClick={() =>
                setIsMobileMenuOpen(false)
              }
              className="hidden md:flex items-center justify-center text-xs font-black uppercase tracking-widest bg-[#3D1A12] text-white px-5 py-2.5 rounded-xl hover:bg-[#4D2A22] transition-all duration-300 shadow-sm"
            >
              Discover
            </Link>

            {/* Mobile hamburger */}
            <button
              className="md:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5 rounded-xl hover:bg-[#3D1A12]/5 transition-colors"
              onClick={() =>
                setIsMobileMenuOpen(
                  !isMobileMenuOpen
                )
              }
              aria-label="Toggle menu"
            >
              <motion.span
                animate={
                  isMobileMenuOpen
                    ? {
                        rotate: 45,
                        y: 6,
                      }
                    : {
                        rotate: 0,
                        y: 0,
                      }
                }
                className="block h-px w-5 bg-[#3D1A12]"
              />

              <motion.span
                animate={
                  isMobileMenuOpen
                    ? {
                        opacity: 0,
                      }
                    : {
                        opacity: 1,
                      }
                }
                className="block h-px w-4 bg-[#3D1A12]"
              />

              <motion.span
                animate={
                  isMobileMenuOpen
                    ? {
                        rotate: -45,
                        y: -6,
                      }
                    : {
                        rotate: 0,
                        y: 0,
                      }
                }
                className="block h-px w-5 bg-[#3D1A12]"
              />
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{
                height: 0,
                opacity: 0,
              }}
              animate={{
                height: "auto",
                opacity: 1,
              }}
              exit={{
                height: 0,
                opacity: 0,
              }}
              transition={{
                duration: 0.3,
              }}
              className="md:hidden overflow-hidden border-t border-[#3D1A12]/10 bg-[#f6f4f1]/95 backdrop-blur-2xl"
            >
              <div className="flex flex-col px-6 py-6 gap-5">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() =>
                      setIsMobileMenuOpen(false)
                    }
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
                  to={`/${currentLang}/products`}
                  onClick={() =>
                    setIsMobileMenuOpen(false)
                  }
                  className="block text-center w-full bg-[#3D1A12] text-white text-xs font-black uppercase tracking-widest py-3.5 rounded-xl hover:bg-[#4D2A22] transition-colors"
                >
                  Discover Collection
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