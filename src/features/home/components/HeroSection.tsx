import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import { Link , useParams } from "react-router-dom";
import LogoStack from "./LogoStack";
import MagicRings from "./MagicRings";

const HeroSection = () => {
  const targetRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale   = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);
  const y       = useTransform(scrollYProgress, [0, 0.5], [0, 50]);
  const { lang } = useParams();
  const currentLang = lang || "en";
  
  return (
    <section
      ref={targetRef}
      className="relative h-screen flex items-center justify-center overflow-hidden bg-[#F6F4F1]"
    >
      <div
        className="absolute inset-0 opacity-8"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%23C9922A' stroke-width='1.5'%3E%3Cpath d='M40 0L80 40L40 80L0 40Z'/%3E%3Cpath d='M40 20L60 40L40 60L20 40Z'/%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: "80px 80px",
        }}
      />

      {/* ── MagicRings background ── */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <MagicRings
          color="#C9922A"       // Mipador gold
          colorTwo="#2c120c"    // Mipador walnut brown
          ringCount={6}
          speed={0.7}           // slightly slower = more meditative
          attenuation={12}
          lineThickness={2}
          baseRadius={0.28}
          radiusStep={0.12}
          scaleRate={0.1}
          opacity={0.55}        // subtle, doesn't overpower content
          noiseAmount={0.04}
          rotation={0}
          ringGap={1.5}
          fadeIn={0.7}
          fadeOut={0.5}
          followMouse={false}
          mouseInfluence={0.2}
          hoverScale={1.2}
          parallax={0.05}
          clickBurst={false}
          blur={0}
        />

        {/* radial fade — keeps center clear for content */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 65% 55% at 50% 50%, #F6F4F1 25%, transparent 100%)",
          }}
        />
      </div>

      {/* ── Content ── */}
      <motion.div
        style={{ opacity, scale, y }}
        className="relative z-10 text-center px-6 flex flex-col items-center pt-16"
      >
        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-[#3D1A12]/50 font-black uppercase tracking-[0.5em] text-[9px] md:text-[10px] mb-8"
        >
          Designed for life’s moments — made in Morocco.
        </motion.p>

        {/* Logo stack card carousel */}
        <LogoStack />

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.65 }}
          className="mt-6 flex flex-col sm:flex-row items-center gap-4"
        >
          <Link
            to={`/${currentLang}/products`}
            className="px-10 py-4 bg-[#3D1A12] text-white text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-[#4D2A22] transition-all active:scale-95 flex items-center gap-3 shadow-lg shadow-[#3D1A12]/10"
          >
            Discover Collection <ArrowRight size={13} />
          </Link>
          <Link
            to={`/${currentLang}/about`}
            className="px-10 py-4 border border-[#3D1A12]/20 text-[#3D1A12] text-[10px] font-black uppercase tracking-widest rounded-xl hover:border-[#3D1A12]/50 transition-all"
          >
            Our Story
          </Link>
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="mt-6 flex flex-col items-center gap-2"
        >
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="w-px h-10 bg-gradient-to-b from-[#3D1A12]/30 to-transparent"
          />
          <p className="text-[9px] font-black uppercase tracking-[0.3em] text-[#3D1A12]/25">
            Scroll
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;