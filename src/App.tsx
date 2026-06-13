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