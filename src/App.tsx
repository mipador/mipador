import React from "react";
import { HashRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { MotionConfig } from "framer-motion";
import LanguageLayout from "./features/i18n/LanguageLayout";

const App: React.FC = () => {
  return (
    <MotionConfig reducedMotion="user">
    <Router>
      <Routes>
        {/* Redirect root → default language */}
        <Route path="/" element={<Navigate to="/en" replace />} />

        {/* All languages handled here */}
        <Route path="/:lang/*" element={<LanguageLayout />} />
      </Routes>
    </Router>
    </MotionConfig>
  );
};

export default App;

// import React from "react";
// import { HashRouter as Router, Routes, Route } from "react-router-dom";

// import Navbar from "./assets/components/layout/Navbar";
// import Footer from "./assets/components/layout/Footer";
// import About from "./features/about/About";
// import Homepage from "./features/home/Homepage";
// import ProductsPage from "./features/products/components/Page/ProductsPage";
// import Contact from "./features/contact/Contact";
// import NotFound from "./pages/404Page";
// import PrivacyPolicy from "./features/legal/PrivacyPolicy";
// import RefundPolicy from "./features/legal/RefundPolicy";
// import TermsOfService from "./features/legal/TermsOfService";
// import FaqsPage from "./pages/FaqsPage";
// import ProductDetailPage from "./features/products/components/Page/ProductDetailPage";
// import AmbientBackground from "./components/AmbientBackground";

// const App: React.FC = () => {
//   return (
//     <Router>
//       <div className="flex flex-col min-h-screen">
//         <AmbientBackground /> 
//         <Navbar />

//         {/* Main content */}
//         <main className="flex-1 relative z-10">
//           <Routes>
//             <Route path="/" element={<Homepage />} />
//             <Route path="/products" element={<ProductsPage />} />
//             <Route path="/about" element={<About />} />
//             <Route path="contact" element={<Contact />} />
//             <Route path="*" element={<NotFound />} />
//             <Route path="/privacy-policy" element={<PrivacyPolicy />} />
//             <Route path="/refund-policy" element={<RefundPolicy />} />
//             <Route path="/terms-of-service" element={<TermsOfService />} />
//             <Route path="/faqs" element={<FaqsPage />} />
//             <Route path="/products/:slug" element={<ProductDetailPage />} />
//           </Routes>
//         </main>

//         <Footer />
//       </div>
//     </Router>
//   );
// };

// export default App;