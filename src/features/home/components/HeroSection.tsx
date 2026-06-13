import { motion, useScroll, useTransform } from "framer-motion";
import type { Variants } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

const IMAGE_ASSETS = {
  desktop: { url: "/images/Hero1.jpg",      alt: "Mipador — Premium Moroccan Furniture & Home Decor, Casablanca Morocco" },
  mobile:  { url: "/images/HeroMobile.jpg", alt: "Mipador — Handcrafted Moroccan Furniture Studio, Morocco" },
};

const containerVariants: Variants = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.2 } },
};

const itemVariants: Variants = {
  hidden:  { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } },
};

const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
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
  const textY        = useTransform(scrollYProgress, [0, 0.4],  [0, -80]);
  const imageScale   = useTransform(scrollYProgress, [0, 1],    [1, 1.12]);
  const brightness   = useTransform(scrollYProgress, [0, 0.5],  [1, 0.8]);

  const currentImage = isMobile ? IMAGE_ASSETS.mobile : IMAGE_ASSETS.desktop;

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen overflow-hidden bg-[#0F0B09]"
    >
      {/* Background image */}
      <motion.div className="absolute inset-0" style={{ scale: imageScale }}>
        <motion.img
          key={currentImage.url}
          src={currentImage.url}
          alt={currentImage.alt}
          className="w-full h-full object-cover object-center"
          style={{ filter: useTransform(brightness, (v) => `brightness(${v})`) }}
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoaded ? 1 : 0 }}
          transition={{ duration: 1.2 }}
          onLoad={() => setIsLoaded(true)}
        />

        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(circle at center, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.45) 55%, rgba(0,0,0,0.75) 100%)`,
          }}
        />
        <div
          className="absolute inset-0 opacity-60"
          style={{
            background: `linear-gradient(135deg, rgba(77,42,34,0.45) 0%, transparent 40%, rgba(198,169,139,0.15) 100%)`,
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.06] mix-blend-soft-light"
          style={{ backgroundImage: "url('https://grainy-gradients.vercel.app/noise.svg')" }}
        />
      </motion.div>

      {/* Content */}
      <motion.div
        style={{ opacity: textOpacity, y: textY }}
        className="relative z-10 flex items-center justify-center min-h-screen px-6 sm:px-10"
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-4xl mx-auto text-center"
        >
          {/* Eyebrow */}
          <motion.p
            variants={itemVariants}
            className="text-[10px] uppercase tracking-[0.4em] text-[#C6A98B]/70 font-light mb-6"
          >
            {t("hero.eyebrow")}
          </motion.p>

          {/* Headline */}
          <motion.h1
            variants={itemVariants}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-[6rem] font-semibold tracking-[-0.05em] leading-[0.95] max-w-5xl mx-auto text-gradient-animated text-stroke-soft text-glow"
          >
            {t("hero.headline")}
          </motion.h1>

          {/* Divider */}
          <motion.div variants={itemVariants} className="flex justify-center my-10">
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 1, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="h-px w-28 bg-gradient-to-r from-transparent via-[#C6A98B] to-transparent"
            />
          </motion.div>

          {/* CTA buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-5 mt-14"
          >
            {/* Primary */}
            <motion.div
              whileHover={{ scale: 1.04, y: -4 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 260, damping: 18 }}
            >
              <Link
                to={`/${currentLang}/products`}
                className="group relative inline-flex items-center gap-3 overflow-hidden rounded-xl bg-[#F6F4F1] px-8 py-4 text-sm font-medium tracking-[0.15em] uppercase text-[#2A1814] shadow-[0_10px_40px_rgba(0,0,0,0.25)]"
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-white/0 via-white/40 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%]" />
                <span className="relative z-10">{t("hero.exploreCollection")}</span>
                <motion.div
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.8, repeat: Infinity }}
                  className="relative z-10"
                >
                  <ArrowRight size={18} />
                </motion.div>
              </Link>
            </motion.div>

            {/* Secondary */}
            <motion.div
              whileHover={{ scale: 1.04, y: -4 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 260, damping: 18 }}
            >
              <Link
                to={`/${currentLang}/about`}
                className="group inline-flex items-center gap-3 rounded-xl border border-white bg-black/40 backdrop-blur-md px-8 py-4 text-sm uppercase tracking-[0.15em] text-[#F6F4F1] transition-all duration-500 hover:bg-white/10 hover:border-white/40"
              >
                {t("hero.ourStory")}
              </Link>
            </motion.div>
          </motion.div>

          {/* Badge */}
          <motion.p
            variants={itemVariants}
            className="mt-12 text-xs uppercase tracking-[0.25em] text-[#E8DED1]/45 font-light"
          >
            {t("hero.badge")}
          </motion.p>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1.4 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-3"
        >
          <div className="w-px h-10 bg-gradient-to-b from-[#C6A98B] to-transparent" />
          <p className="text-[10px] uppercase tracking-[0.35em] text-[#F6F4F1]/40">
            {t("hero.scroll")}
          </p>
        </motion.div>
      </motion.div>

      {/* Ambient glow */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.18 }}
        transition={{ duration: 2 }}
        className="absolute -bottom-20 -right-20 w-[500px] h-[500px] rounded-xl bg-[#C6A98B] blur-[140px] z-0"
      />

      {/* Top accent */}
      <motion.div
        initial={{ opacity: 0, rotate: -12 }}
        animate={{ opacity: 0.25, rotate: 0 }}
        transition={{ duration: 1.2, delay: 0.8 }}
        className="hidden lg:block absolute top-14 left-14 border border-[#C6A98B]/20 w-24 h-24 rounded-xl z-0"
      />
    </section>
  );
};

export default HeroSection;
