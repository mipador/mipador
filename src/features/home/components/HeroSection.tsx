import { motion, useScroll, useTransform } from "framer-motion";
import type { Variants } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import { Link, useParams } from "react-router-dom";

// ┌─────────────────────────────────────────────────────────────────────────┐
// │ IMAGE ASSETS                                                           │
// └─────────────────────────────────────────────────────────────────────────┘

const IMAGE_ASSETS = {
  desktop: {
    url: "/images/Hero1.jpg",
    alt: "Mipador Collection - Desktop",
  },
  mobile: {
    url: "/images/HeroMobile.jpg",
    alt: "Mipador Collection - Mobile",
  },
};

// ┌─────────────────────────────────────────────────────────────────────────┐
// │ HERO CONTENT                                                           │
// └─────────────────────────────────────────────────────────────────────────┘

const HERO_CONTENT = {
  eyebrow: "Mipador Collection",
  // headline: "Your space should feel like freedom, not performance.",
  headline: "Made for spaces that breathe",
  headline2: "beats a room full of noise",
  subheadline:
    "When you stop consuming and start living, you discover the profound beauty of intentional spaces. Fewer objects. Deeper meaning. A home that reflects who you truly are.",
  badge: "Be. Not own.",
  cta_primary: {
    text: "Explore Collection",
    link: "/products",
  },
  cta_secondary: {
    text: "Our Story",
    link: "/about",
  },
};

// ┌─────────────────────────────────────────────────────────────────────────┐
// │ ANIMATION VARIANTS                                                     │
// └─────────────────────────────────────────────────────────────────────────┘

const containerVariants: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 24,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.9,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

// ┌─────────────────────────────────────────────────────────────────────────┐
// │ COMPONENT                                                              │
// └─────────────────────────────────────────────────────────────────────────┘

const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const [isMobile, setIsMobile] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const { lang } = useParams<{ lang?: string }>();
  const currentLang = lang || "en";

  // ────────────────────────────────────────────────────────────────────────
  // Device Detection
  // ────────────────────────────────────────────────────────────────────────

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();

    window.addEventListener("resize", checkMobile);

    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  // ────────────────────────────────────────────────────────────────────────
  // Scroll Motion
  // ────────────────────────────────────────────────────────────────────────

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const textOpacity = useTransform(scrollYProgress, [0, 0.35], [1, 0]);

  const textY = useTransform(scrollYProgress, [0, 0.4], [0, -80]);

  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);

  const brightness = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);

  // ────────────────────────────────────────────────────────────────────────
  // Current Image
  // ────────────────────────────────────────────────────────────────────────

  const currentImage = isMobile ? IMAGE_ASSETS.mobile : IMAGE_ASSETS.desktop;

  // ┌───────────────────────────────────────────────────────────────────────┐
  // │ RENDER                                                               │
  // └───────────────────────────────────────────────────────────────────────┘

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen overflow-hidden bg-[#0F0B09]"
    >
      {/* ───────────────────────────────────────────────────────────────── */}
      {/* BACKGROUND IMAGE                                                 */}
      {/* ───────────────────────────────────────────────────────────────── */}

      <motion.div
        className="absolute inset-0"
        style={{
          scale: imageScale,
        }}
      >
        <motion.img
          key={currentImage.url}
          src={currentImage.url}
          alt={currentImage.alt}
          className="
            w-full
            h-full
            object-cover
            object-center
          "
          style={{
            filter: useTransform(brightness, (v) => `brightness(${v})`),
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoaded ? 1 : 0 }}
          transition={{ duration: 1.2 }}
          onLoad={() => setIsLoaded(true)}
        />

        {/* Main cinematic overlay */}
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(
                circle at center,
                rgba(0,0,0,0.15) 0%,
                rgba(0,0,0,0.45) 55%,
                rgba(0,0,0,0.75) 100%
              )
            `,
          }}
        />

        {/* Warm ambient gradient */}
        <div
          className="absolute inset-0 opacity-60"
          style={{
            background: `
              linear-gradient(
                135deg,
                rgba(77,42,34,0.45) 0%,
                transparent 40%,
                rgba(198,169,139,0.15) 100%
              )
            `,
          }}
        />

        {/* Subtle grain texture */}
        <div
          className="absolute inset-0 opacity-[0.06] mix-blend-soft-light"
          style={{
            backgroundImage:
              "url('https://grainy-gradients.vercel.app/noise.svg')",
          }}
        />
      </motion.div>

      {/* ───────────────────────────────────────────────────────────────── */}
      {/* CONTENT                                                           */}
      {/* ───────────────────────────────────────────────────────────────── */}

      <motion.div
        style={{
          opacity: textOpacity,
          y: textY,
        }}
        className="relative z-10 flex items-center justify-center min-h-screen px-6 sm:px-10"
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-4xl mx-auto text-center"
        >
          {/* Headline */}
          <motion.h1
            variants={itemVariants}
            className="
              text-5xl
              sm:text-6xl
              md:text-7xl
              lg:text-[6rem]
              font-semibold
              tracking-[-0.05em]
              leading-[0.95]
              max-w-5xl
              mx-auto

              text-gradient-animated
              text-stroke-soft
              text-glow
            "
          >
            {HERO_CONTENT.headline}
          </motion.h1>

          {/* Headline 2 */}
          {/* <motion.h1
            variants={itemVariants}
            className="
              text-5xl
              sm:text-6xl
              md:text-7xl
              lg:text-[6rem]
              font-semibold
              tracking-[-0.05em]
              leading-[0.95]
              max-w-5xl
              mx-auto

              text-gradient-animated
              text-stroke-soft
              text-glow
            "
          >
            {HERO_CONTENT.headline2}
          </motion.h1> */}

          {/* Divider */}
          <motion.div
            variants={itemVariants}
            className="flex justify-center my-10"
          >
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{
                duration: 1,
                delay: 0.6,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="
                h-px
                w-28
                bg-gradient-to-r
                from-transparent
                via-[#C6A98B]
                to-transparent
              "
            />
          </motion.div>

          {/* Subheadline */}
          {/* <motion.p
  variants={itemVariants}
  className="
    max-w-2xl
    mx-auto
    text-base
    sm:text-lg
    md:text-xl
    leading-relaxed
    font-light

    text-[#F6F4F1]/80
    text-glow
  "
>
  {HERO_CONTENT.subheadline}
</motion.p> */}

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="
              flex
              flex-col
              sm:flex-row
              items-center
              justify-center
              gap-5
              mt-14
            "
          >
            {/* Primary Button */}
            <motion.div
              whileHover={{
                scale: 1.04,
                y: -4,
              }}
              whileTap={{
                scale: 0.97,
              }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 18,
              }}
            >
              <Link
                to={`/${currentLang}${HERO_CONTENT.cta_primary.link}`}
                className="
                  group
                  relative
                  inline-flex
                  items-center
                  gap-3
                  overflow-hidden
                  rounded-xl
                  bg-[#F6F4F1]
                  px-8
                  py-4
                  text-sm
                  font-medium
                  tracking-[0.15em]
                  uppercase
                  text-[#2A1814]
                  shadow-[0_10px_40px_rgba(0,0,0,0.25)]
                "
              >
                {/* Animated glow */}
                <div
                  className="
                    absolute
                    inset-0
                    opacity-0
                    group-hover:opacity-100
                    transition-opacity
                    duration-500
                    bg-gradient-to-r
                    from-white/0
                    via-white/40
                    to-white/0
                    translate-x-[-100%]
                    group-hover:translate-x-[100%]
                  "
                />

                <span className="relative z-10">
                  {HERO_CONTENT.cta_primary.text}
                </span>

                <motion.div
                  animate={{
                    x: [0, 4, 0],
                  }}
                  transition={{
                    duration: 1.8,
                    repeat: Infinity,
                  }}
                  className="relative z-10"
                >
                  <ArrowRight size={18} />
                </motion.div>
              </Link>
            </motion.div>

            {/* Secondary Button */}
            <motion.div
              whileHover={{
                scale: 1.04,
                y: -4,
              }}
              whileTap={{
                scale: 0.97,
              }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 18,
              }}
            >
              <Link
                to={`/${currentLang}${HERO_CONTENT.cta_secondary.link}`}
                className="
                  group
                  inline-flex
                  items-center
                  gap-3
                  rounded-xl
                  border
                  border-white
                  bg-black/40
                  backdrop-blur-md
                  px-8
                  py-4
                  text-sm
                  uppercase
                  tracking-[0.15em]
                  text-[#F6F4F1]
                  transition-all
                  duration-500
                  hover:bg-white/10
                  hover:border-white/40
                "
              >
                {HERO_CONTENT.cta_secondary.text}
              </Link>
            </motion.div>
          </motion.div>

          {/* Badge */}
          <motion.p
            variants={itemVariants}
            className="
              mt-12
              text-xs
              uppercase
              tracking-[0.25em]
              text-[#E8DED1]/45
              font-light
            "
          >
            {HERO_CONTENT.badge}
          </motion.p>
        </motion.div>
      </motion.div>

      {/* ───────────────────────────────────────────────────────────────── */}
      {/* SCROLL INDICATOR                                                  */}
      {/* ───────────────────────────────────────────────────────────────── */}

      <motion.div
        initial={{
          opacity: 0,
          y: 10,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 1,
          delay: 1.4,
        }}
        className="
          absolute
          bottom-10
          left-1/2
          -translate-x-1/2
          z-20
        "
      >
        <motion.div
          animate={{
            y: [0, 8, 0],
          }}
          transition={{
            duration: 2.2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="flex flex-col items-center gap-3"
        >
          <div
            className="
              w-px
              h-10
              bg-gradient-to-b
              from-[#C6A98B]
              to-transparent
            "
          />

          <p
            className="
              text-[10px]
              uppercase
              tracking-[0.35em]
              text-[#F6F4F1]/40
            "
          >
            Scroll
          </p>
        </motion.div>
      </motion.div>

      {/* ───────────────────────────────────────────────────────────────── */}
      {/* DECORATIVE ELEMENTS                                               */}
      {/* ───────────────────────────────────────────────────────────────── */}

      {/* Ambient glow */}
      <motion.div
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 0.18,
        }}
        transition={{
          duration: 2,
        }}
        className="
          absolute
          -bottom-20
          -right-20
          w-[500px]
          h-[500px]
          rounded-xl
          bg-[#C6A98B]
          blur-[140px]
          z-0
        "
      />

      {/* Top accent */}
      <motion.div
        initial={{
          opacity: 0,
          rotate: -12,
        }}
        animate={{
          opacity: 0.25,
          rotate: 0,
        }}
        transition={{
          duration: 1.2,
          delay: 0.8,
        }}
        className="
          hidden
          lg:block
          absolute
          top-14
          left-14
          border
          border-[#C6A98B]/20
          w-24
          h-24
          rounded-xl
          z-0
        "
      />
    </section>
  );
};

export default HeroSection;
