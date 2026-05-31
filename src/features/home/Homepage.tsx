import React from "react";
import SelectedWorksSection from "./components/SelectedWorksSection";
import ComingSoonSection from "./components/ComingSoonSection";
import HeroSection from "./components/HeroSection";
import TaglineSection from "./components/TaglineSection";
const HomePage: React.FC = () => {
  return (
    <div>
      <HeroSection />
      <SelectedWorksSection />
      <ComingSoonSection />
      <TaglineSection />
    </div>
  );
};

export default HomePage;
