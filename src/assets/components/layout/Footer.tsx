import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Footer: React.FC = () => {
  const { pathname } = useLocation();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const linkClass = (path: string) =>
    `transition-colors duration-200 text-sm ${
      pathname === path
        ? "text-[#3D1A12] font-semibold"
        : "text-[#3D1A12]/50 hover:text-[#3D1A12]"
    }`;

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setEmail("");
  };

  return (
    <footer className="w-full bg-[#F6F4F1] pt-20 pb-8 px-6 md:px-12 border-t border-[#3D1A12]/10">
      <div className="max-w-7xl mx-auto">
        {/* Main grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-y-14 gap-x-10 mb-16">
          {/* Brand column — spans 2 */}
          <div className="col-span-1 sm:col-span-2 lg:col-span-2 lg:pr-8">
            <Link to="/" className="inline-block mb-6">
              <img
                src="/images/LogoMipadorFooter.png"
                alt="Mipador"
                className="h-16 w-auto object-contain"
              />
            </Link>
            <p className="text-sm text-[#3D1A12]/50 leading-relaxed max-w-xs">
              Objects for slow living. Moroccan-crafted furniture for
              intentional spaces — indoor and outdoor.
            </p>

            {/* Socials */}
            <div className="flex items-center gap-3 mt-8">
              {/* Instagram */}
              <a
                href="https://instagram.com/mipador"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-8 h-8 flex items-center justify-center rounded-full bg-[#3D1A12]/8 text-[#3D1A12]/60 hover:bg-[#3D1A12] hover:text-white transition-all duration-300"
              >
                <svg
                  className="w-3.5 h-3.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  viewBox="0 0 24 24"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>

              {/* TikTok */}
              <a
                href="https://tiktok.com/@mipadorofficial"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
                className="w-8 h-8 flex items-center justify-center rounded-full bg-[#3D1A12]/8 text-[#3D1A12]/60 hover:bg-[#3D1A12] hover:text-white transition-all duration-300"
              >
                <svg
                  className="w-3.5 h-3.5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1.01-.06z" />
                </svg>
              </a>

              {/* Pinterest */}
              <a
                href="https://pinterest.com/mipador"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Pinterest"
                className="w-8 h-8 flex items-center justify-center rounded-full bg-[#3D1A12]/8 text-[#3D1A12]/60 hover:bg-[#3D1A12] hover:text-white transition-all duration-300"
              >
                <svg
                  className="w-3.5 h-3.5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z" />
                </svg>
              </a>

              {/* WhatsApp */}
              <a
                href="https://wa.me/212612918900"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="w-8 h-8 flex items-center justify-center rounded-full bg-[#3D1A12]/8 text-[#3D1A12]/60 hover:bg-[#3D1A12] hover:text-white transition-all duration-300"
              >
                <svg
                  className="w-3.5 h-3.5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347" />
                </svg>
              </a>
            </div>
          </div>

          {/* Collection column */}
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.25em] text-[#3D1A12]/40 mb-6">
              Collection
            </p>
            <ul className="space-y-4">
              <li>
                <Link to="/products" className={linkClass("/products")}>
                  All Pieces
                </Link>
              </li>
              <li>
                <Link
                  to="/products?location=indoor"
                  className="text-sm text-[#3D1A12]/50 hover:text-[#3D1A12] transition-colors duration-200"
                >
                  Indoor
                </Link>
              </li>
              <li>
                <Link
                  to="/products?location=outdoor"
                  className="text-sm text-[#3D1A12]/50 hover:text-[#3D1A12] transition-colors duration-200"
                >
                  Outdoor
                </Link>
              </li>
              <li>
                <Link
                  to="/products?tag=new"
                  className="text-sm text-[#3D1A12]/50 hover:text-[#3D1A12] transition-colors duration-200"
                >
                  New Arrivals
                </Link>
              </li>
            </ul>
          </div>

          {/* Studio column */}
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.25em] text-[#3D1A12]/40 mb-6">
              Studio
            </p>
            <ul className="space-y-4">
              <li>
                <Link to="/about" className={linkClass("/about")}>
                  Our Story
                </Link>
              </li>
              <li>
                <Link
                  to="/about#craft"
                  className="text-sm text-[#3D1A12]/50 hover:text-[#3D1A12] transition-colors duration-200"
                >
                  Craftsmanship
                </Link>
              </li>
              <li>
                <Link to="/contact" className={linkClass("/contact")}>
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/faqs" className={linkClass("/faqs")}>
                  FAQs
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter column — spans 2 */}
          <div className="col-span-1 sm:col-span-2 lg:col-span-2 lg:pl-8">
            <p className="text-[10px] font-black uppercase tracking-[0.25em] text-[#3D1A12]/40 mb-6">
              The Mipador Journal
            </p>
            <p className="text-sm text-[#3D1A12]/50 leading-relaxed mb-6">
              Inspirations, process notes, and new pieces — delivered slowly,
              intentionally.
            </p>

            {subscribed ? (
              <div className="bg-[#3D1A12]/5 rounded-xl px-5 py-4">
                <p className="text-sm font-bold text-[#3D1A12]">Thank you. ✦</p>
                <p className="text-xs text-[#3D1A12]/50 mt-1">
                  You're now part of the Mipador world.
                </p>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full bg-white border border-[#3D1A12]/10 rounded-xl px-4 py-3 text-sm text-[#3D1A12] placeholder-[#3D1A12]/30 focus:outline-none focus:border-[#3D1A12]/30 transition-colors"
                />
                <button
                  onClick={handleSubscribe}
                  className="w-full bg-[#3D1A12] text-white text-[10px] font-black uppercase tracking-widest py-3.5 rounded-xl hover:bg-[#4D2A22] active:scale-95 transition-all duration-300"
                >
                  Subscribe
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-[#3D1A12]/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-[#3D1A12]/40">
          <p>
            © {new Date().getFullYear()} Mipador Studio. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link
              to="/privacy-policy"
              className="hover:text-[#3D1A12] transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms-of-service"
              className="hover:text-[#3D1A12] transition-colors"
            >
              Terms & Conditions
            </Link>
            <Link
              to="/refund-policy"
              className="hover:text-[#3D1A12] transition-colors"
            >
              Refund Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
