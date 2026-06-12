import AboutHero from "./components/AboutHero";
import AboutStory from "./components/AboutStory";
import CoreFeatures from "./components/CoreFeatures";
import BrandPromise from "./components/BrandPromise";
// import Testimonials from "./components/Testimonials";
import ModelGrid from "./components/ModelGrid";
import FeatureGrid from "./components/FeatureGrid";
import { Link, useParams } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import ScrollToTop from "../../components/ScrollToTop";
import { useSEO } from "../../hooks/useSEO";

function About() {
  useSEO("Our Story", "Rooted in Moroccan craftsmanship — Mipador builds worlds, not just furniture. Our story, our philosophy.");
  const { lang } = useParams();
  const currentLang = lang || "en";

  return (
    <div className="bg-[#F6F4F1] font-sans selection:bg-[#C9922A]/20">
      <ScrollToTop />
      <AboutHero />
      <AboutStory />
      <ModelGrid />
      <CoreFeatures />
      <FeatureGrid />
      <BrandPromise />
      {/* <Testimonials /> */}

      {/* Final CTA */}
      <section className="py-32 px-6 bg-[#3D1A12] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23C9922A' fill-opacity='1'%3E%3Cpath d='M30 0L60 30L30 60L0 30Z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: "60px 60px",
          }}
        />
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-[#C9922A] mb-6">
            Mipador Studio
          </p>
          <h2 className="text-5xl md:text-6xl font-black text-white tracking-tight leading-tight mb-8">
            Live in a space
            <br />
            <span className="text-[#C9922A]/70 italic font-light">
              that gives something back to you .
            </span>
          </h2>
          <p className="text-white/50 text-base mb-12 leading-relaxed max-w-xl mx-auto">
            You don't need to own everything to live beautifully.
            But what you choose to bring in — make it honest, make it warm, make it yours.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to={`/${currentLang}/products`}
              className="inline-flex items-center justify-center gap-3 bg-[#C9922A] text-white px-10 py-4 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-[#B8821A] transition-all active:scale-95"
            >
              Explore Collection <ArrowRight size={13} />
            </Link>
            <Link
              to={`/${currentLang}/contact`}
              className="inline-flex items-center justify-center gap-3 border border-white/20 text-white px-10 py-4 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-white/5 transition-all"
            >
              Talk to Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;