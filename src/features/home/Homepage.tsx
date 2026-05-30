import React from "react";
import SelectedWorksSection from "./components/SelectedWorksSection";
import ComingSoonSection from "./components/ComingSoonSection";
import HeroSection from "./components/HeroSection";
import TaglineSection from "./components/TaglineSection";
const HomePage: React.FC = () => {
  return (
    <div>
      <div
        className="absolute inset-0 opacity-8"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%23C9922A' stroke-width='1.5'%3E%3Cpath d='M40 0L80 40L40 80L0 40Z'/%3E%3Cpath d='M40 20L60 40L40 60L20 40Z'/%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: "80px 80px",
        }}
      />
      <HeroSection />
      <SelectedWorksSection />
      <ComingSoonSection />
      <TaglineSection />
    </div>
  );
};

export default HomePage;
