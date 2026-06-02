import { useParams, Navigate, Routes, Route, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import i18n from "../../i18n";

import Navbar from "../../assets/components/layout/Navbar";
import Footer from "../../assets/components/layout/Footer";
import AmbientBackground from "../../components/AmbientBackground";

import Homepage from "../home/Homepage";
import ProductsPage from "../products/components/Page/ProductsPage";
import About from "../about/About";
import Contact from "../contact/Contact";
import NotFound from "../../pages/404Page";

import PrivacyPolicy from "../legal/PrivacyPolicy";
import RefundPolicy from "../legal/RefundPolicy";
import TermsOfService from "../legal/TermsOfService";
import FaqsPage from "../../pages/FaqsPage";
import ProductDetailPage from "../products/components/Page/ProductDetailPage";

const supported = ["en", "fr", "ar", "ma"];

export default function LanguageLayout() {
  const { lang } = useParams();
  const navigate = useNavigate(); // ✅ FIX #1

  // ✅ SINGLE SYNC SYSTEM (URL → everything)
  useEffect(() => {
    if (!lang || !supported.includes(lang)) return;

    // i18n sync
    i18n.changeLanguage(lang);

    // localStorage sync
    localStorage.setItem("lang", lang);
  }, [lang]);

  // optional: first visit detection ONLY ONCE
  useEffect(() => {
    if (localStorage.getItem("lang")) return;

    const browserLang = navigator.language.toLowerCase();

    let detected = "en";
    if (browserLang.includes("fr")) detected = "fr";
    else if (browserLang.includes("ar")) detected = "ar";

    localStorage.setItem("lang", detected);

    if (lang !== detected) {
      const path = window.location.pathname.split("/").slice(2).join("/");
      navigate(`/${detected}/${path}`);
    }
  }, []);

  if (!lang || !supported.includes(lang)) {
    return <Navigate to="/en" replace />;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <AmbientBackground />
      <Navbar />

      <main className="flex-1 relative z-10">
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/:slug" element={<ProductDetailPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />

          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/refund-policy" element={<RefundPolicy />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
          <Route path="/faqs" element={<FaqsPage />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}