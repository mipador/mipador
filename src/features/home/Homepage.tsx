import React from "react";
import SelectedWorksSection from "./components/SelectedWorksSection";
import ComingSoonSection from "./components/ComingSoonSection";
import HeroSection from "./components/HeroSection";
import HowToOrder from "./components/HowToOrder";
import TaglineSection from "./components/TaglineSection";
import ScrollToTop from "../../components/ScrollToTop";
import { useSEO } from "../../hooks/useSEO";

const HomePage: React.FC = () => {
  useSEO(
    "Moroccan Furniture & Decor",
    "Mipador — handcrafted Moroccan furniture and decor for spaces that breathe. Indoor and outdoor pieces made to age, not to be replaced."
  );
  return (
    <div>
      <ScrollToTop />
      <HeroSection />
      <SelectedWorksSection />
      <HowToOrder />
      <ComingSoonSection />
      <TaglineSection />
    </div>
  );
};

export default HomePage;
