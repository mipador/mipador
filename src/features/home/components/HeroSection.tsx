import { motion, useScroll, useTransform } from "framer-motion";
import type { Variants } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

const IMAGE_ASSETS = {
  desktop: { url: "/images/hero01.webp",      alt: "Mipador — Premium Moroccan Furniture & Home Decor, Casablanca Morocco" },
  mobile:  { url: "/images/HeroMobile.webp", alt: "Mipador — Handcrafted Moroccan Furniture Studio, Morocco" },
};

const FEATURE_THUMB = { url: "/images/atmosphere-1.webp", alt: "Mipador — handcrafted Moroccan textiles and decor" };

const containerVariants: Variants = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0 } },
};

const itemVariants: Variants = {
  hidden:  { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const { t } = useTranslation();

  const { lang } = useParams<{ lang?: string }>();
  const currentLang = lang || "en";

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const textOpacity  = useTransform(scrollYProgress, [0, 0.35], [1, 0]);
  const textY        = useTransform(scrollYProgress, [0, 0.4],  [0, -60]);
  const imageScale   = useTransform(scrollYProgress, [0, 1],    [1, 1.08]);
  const brightness   = useTransform(scrollYProgress, [0, 0.5],  [1, 0.8]);

  const currentImage = isMobile ? IMAGE_ASSETS.mobile : IMAGE_ASSETS.desktop;

  return (
    <section className="relative bg-[#FBF4ED] px-3 sm:px-5 lg:px-6 pt-3 sm:pt-4 lg:pt-5 pb-3 sm:pb-5">
      <motion.div
        ref={containerRef}
        className="relative overflow-hidden rounded-3xl min-h-[94dvh] sm:min-h-[92vh] lg:min-h-[95vh] bg-[#1C140F]"
      >
        {/* Background image */}
        <motion.div className="absolute inset-0" style={{ scale: imageScale }}>
          <motion.img
            key={currentImage.url}
            src={currentImage.url}
            alt={currentImage.alt}
            width={isMobile ? 900 : 1600}
            height={isMobile ? 1350 : 1200}
            fetchPriority="high"
            decoding="async"
            className="w-full h-full object-cover object-center"
            animate={{ scale: [1, 1.035, 1] }}
            transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
            style={{ filter: useTransform(brightness, (v) => `brightness(${v}) saturate(1.12) contrast(1.05)`) }}
          />

          {/* Shine sweep */}
          <motion.div
            initial={{ x: "-120%", opacity: 0 }}
            animate={{ x: "120%", opacity: [0, 0.35, 0] }}
            transition={{ duration: 1.8, delay: 0.5, ease: "easeInOut" }}
            className="absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-[-20deg]"
          />

          <div
            className="absolute inset-0"
            style={{
              background: `radial-gradient(circle at center, rgba(0,0,0,0.12) 0%, rgba(0,0,0,0.42) 55%, rgba(0,0,0,0.72) 100%)`,
            }}
          />
          <div
            className="absolute inset-0 opacity-60"
            style={{
              background: `linear-gradient(135deg, rgba(77,42,34,0.45) 0%, transparent 40%, rgba(198,169,139,0.18) 100%)`,
            }}
          />
          <div
            className="absolute inset-0 opacity-[0.06] mix-blend-soft-light"
            style={{ backgroundImage: "url('/noise.svg')" }}
          />
        </motion.div>

        {/* Headline content */}
        <motion.div
          style={{ opacity: textOpacity, y: textY }}
          className="relative z-10 flex items-center justify-center text-center px-6 sm:px-10 h-full pt-16 sm:pt-20"
        >
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-5xl mx-auto flex flex-col items-center gap-8"
          >
            <motion.h1
              variants={itemVariants}
              className="font-rounded text-[3.4rem] sm:text-[5.2rem] md:text-[6.8rem] lg:text-[8.5rem] font-light tracking-[-0.03em] leading-[1.04] text-white"
            >
              {t("hero.headline")}
            </motion.h1>

            <motion.div
              variants={itemVariants}
              className="flex items-center gap-5"
            >
              <div className="w-10 h-px bg-white/20" />
              <p className="text-[9px] uppercase tracking-[0.55em] text-white/35 font-light">
                {t("hero.badge")}
              </p>
              <div className="w-10 h-px bg-white/20" />
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Floating card — feature caption + CTA, bottom left */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="absolute bottom-6 left-6 right-6 sm:right-auto lg:bottom-8 lg:left-8 z-10 sm:max-w-sm rounded-3xl bg-[#FBF4ED] p-4 sm:p-5 flex flex-col items-stretch gap-4"
        >
          <div className="w-full flex items-center gap-3">
            <img
              src={FEATURE_THUMB.url}
              alt={FEATURE_THUMB.alt}
              width={56}
              height={56}
              loading="lazy"
              className="w-12 h-12 rounded-lg object-cover shrink-0"
            />
            <p className="text-xs leading-snug text-[#3D1A12]/80 font-light">
              {t("hero.featureCaption")}
            </p>
            <Link
              to={`/${currentLang}/about`}
              aria-label={t("hero.ourStory")}
              className="ml-auto shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-[#3D1A12] text-[#F6F4F1] hover:bg-[#2A1814] transition-colors"
            >
              <ArrowUpRight size={15} />
            </Link>
          </div>

          <motion.div
            whileHover={{ scale: 1.03, y: -3 }}
            whileTap={{ scale: 0.97 }}
            className="w-full rounded-xl"
          >
            <Link
              to={`/${currentLang}/products`}
              className="group relative flex items-center justify-center gap-3 overflow-hidden rounded-xl bg-[#3D1A12] px-7 py-4 text-sm font-medium tracking-[0.1em] uppercase text-[#F6F4F1] hover:bg-[#2A1814] transition-colors"
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%]" />
              <span className="relative z-10">{t("hero.exploreCollection")}</span>
              <ArrowRight size={18} className="relative z-10" />
            </Link>
          </motion.div>
        </motion.div>

        {/* Ambient glow */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.18 }}
          transition={{ duration: 2 }}
          className="absolute -bottom-20 -right-20 w-[500px] h-[500px] rounded-full bg-[#C6A98B] blur-[140px] z-0 pointer-events-none"
        />
      </motion.div>
    </section>
  );
};

export default HeroSection;
