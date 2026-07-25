import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const AlbatrossSVG = () => (
  <svg
    viewBox="0 0 600 200"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    role="presentation"
  >
    {/* Left wing — long, narrow, swept */}
    <path
      d="M288 100 C260 84 215 70 160 72 C195 66 248 82 278 100 Z"
      fill="currentColor"
    />
    <path
      d="M288 100 C255 86 200 74 150 76 C110 80 72 90 30 104 C75 90 135 80 210 84 C248 87 272 97 288 100 Z"
      fill="currentColor"
    />
    {/* Right wing — mirror */}
    <path
      d="M312 100 C340 84 385 70 440 72 C405 66 352 82 322 100 Z"
      fill="currentColor"
    />
    <path
      d="M312 100 C345 86 400 74 450 76 C490 80 528 90 570 104 C525 90 465 80 390 84 C352 87 328 97 312 100 Z"
      fill="currentColor"
    />
    {/* Body */}
    <ellipse cx="300" cy="100" rx="18" ry="9" fill="currentColor" />
    {/* Head */}
    <ellipse cx="316" cy="95" rx="10" ry="8" fill="currentColor" />
    {/* Beak */}
    <path d="M324 93 L340 96 L324 99 Z" fill="currentColor" />
    {/* Tail */}
    <path
      d="M284 105 C274 116 266 120 258 122 C268 115 278 109 284 105 Z"
      fill="currentColor"
    />
  </svg>
);

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const ManifestoSection = () => {
  const { t } = useTranslation();

  return (
    <section className="relative min-h-[82vh] bg-cream flex items-center justify-center overflow-hidden px-8 py-24">

      {/* Albatross watermark — centered, barely perceptible */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        aria-hidden="true"
      >
        <div className="w-full max-w-3xl text-espresso opacity-[0.05]">
          <AlbatrossSVG />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <motion.blockquote
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.2, ease: EASE }}
        >
          <p className="font-display text-3xl sm:text-4xl md:text-[2.8rem] lg:text-5xl text-espresso leading-[1.25] font-light italic">
            {t("home.manifestoQuote")}
          </p>
        </motion.blockquote>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1, delay: 0.5, ease: EASE }}
          className="mt-12 text-espresso/35 text-[10px] font-light uppercase tracking-[0.35em]"
        >
          {t("home.manifestoLocations")}
        </motion.p>
      </div>
    </section>
  );
};

export default ManifestoSection;
