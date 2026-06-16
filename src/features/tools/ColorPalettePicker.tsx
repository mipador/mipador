import React, { useState, useRef, useCallback, useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { ArrowLeft, Check, Copy, MessageCircle, RotateCcw, Sparkles } from "lucide-react";
import { useSEO, useJsonLd } from "../../hooks/useSEO";
import { products } from "../../data/products";
import { WHATSAPP_NUMBER } from "../../config/whatsapp";
import ScrollToTop from "../../components/ScrollToTop";
import { PALETTES, ROOM_PRODUCTS, type PaletteId, type RoomId, type PaletteLang } from "./paletteData";

// ── Room definitions ──────────────────────────────────────────────────────────
const ROOM_TYPES: { id: RoomId; labelKey: string; icon: string }[] = [
  { id: "living-room",    labelKey: "step1.livingRoom",    icon: "🛋️" },
  { id: "bedroom",        labelKey: "step1.bedroom",       icon: "🛏️" },
  { id: "workspace",      labelKey: "step1.workspace",     icon: "💻" },
  { id: "dining-room",    labelKey: "step1.diningRoom",    icon: "🍽️" },
  { id: "terrace",        labelKey: "step1.terrace",       icon: "☀️" },
  { id: "reading-corner", labelKey: "step1.readingCorner", icon: "📚" },
  { id: "bathroom",       labelKey: "step1.bathroom",      icon: "🚿" },
  { id: "kitchen",        labelKey: "step1.kitchen",       icon: "🪴" },
];

const SITE_URL = "https://mipador.com";
const ease = [0.22, 1, 0.36, 1] as const;

function toLang(l: string): PaletteLang {
  if (l === "fr" || l === "ar" || l === "ma") return l;
  return "en";
}

// ── Component ─────────────────────────────────────────────────────────────────
const ColorPalettePicker: React.FC = () => {
  const { t } = useTranslation();
  const { lang } = useParams<{ lang: string }>();
  const l = lang || "en";
  const paletteLang = toLang(l);
  const isRTL = l === "ar" || l === "ma";

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [room, setRoom] = useState<RoomId | null>(null);
  const [paletteId, setPaletteId] = useState<PaletteId | null>(null);
  const [copied, setCopied] = useState(false);

  const resultsRef = useRef<HTMLDivElement>(null);

  useSEO(t("colorPicker.seo.title"), t("colorPicker.seo.desc"));

  const schema = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "WebPage",
          "@id": `${SITE_URL}/${l}/tools/color-palette#webpage`,
          "url": `${SITE_URL}/${l}/tools/color-palette`,
          "name": `${t("colorPicker.seo.title")} | Mipador`,
          "description": t("colorPicker.seo.desc"),
          "isPartOf": { "@id": `${SITE_URL}/#website` },
          "inLanguage": l,
        },
        {
          "@type": "SoftwareApplication",
          "name": t("colorPicker.hero.heading"),
          "applicationCategory": "DesignApplication",
          "offers": { "@type": "Offer", "price": "0", "priceCurrency": "MAD" },
          "operatingSystem": "Web",
          "url": `${SITE_URL}/${l}/tools/color-palette`,
        },
      ],
    }),
    [l, t]
  );
  useJsonLd(schema);

  const activePalette = paletteId ? PALETTES.find((p) => p.id === paletteId) ?? null : null;

  const recommendedProducts = useMemo(() => {
    if (!activePalette || !room) return [];
    const moodSlugs = activePalette.productSlugs;
    const roomSlugs = ROOM_PRODUCTS[room];
    const merged = [...new Set([...moodSlugs, ...roomSlugs])].slice(0, 3);
    return merged
      .map((slug) => products.find((p) => p.slug === slug))
      .filter(Boolean) as typeof products;
  }, [activePalette, room]);

  const handleRoomSelect = useCallback((r: RoomId) => {
    setRoom(r);
    setStep(2);
  }, []);

  const handlePaletteSelect = useCallback((id: PaletteId) => {
    setPaletteId(id);
    setStep(3);
    setTimeout(() => resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 80);
  }, []);

  const handleReset = useCallback(() => {
    setRoom(null);
    setPaletteId(null);
    setStep(1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleCopy = useCallback(() => {
    if (!activePalette) return;
    const text = activePalette.swatches.map((s) => s.hex).join("  ");
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [activePalette]);

  const whatsappMsg = useMemo(() => {
    if (!activePalette || !room) return "";
    const paletteName = activePalette.name[paletteLang];
    const roomLabel = t(`colorPicker.step1.${room.replace(/-([a-z])/g, (_, c: string) => c.toUpperCase())}`);
    const hexes = activePalette.swatches.map((s) => s.hex).join(", ");
    return encodeURIComponent(
      `Hello Mipador! I used your color palette tool.\nPalette: "${paletteName}" — for my ${roomLabel}.\nColors: ${hexes}\nCan you help me choose the right pieces?`
    );
  }, [activePalette, room, paletteLang, t]);

  return (
    <div className="min-h-screen bg-[#F6F4F1]">
      <ScrollToTop />

      {/* ── Hero ────────────────────────────────────────────────────────────── */}
      <section className="pt-32 pb-10 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease }}
            className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-[#3D1A12]/50 mb-4"
          >
            <Sparkles size={11} className="text-[#3D1A12]/40" />
            {t("colorPicker.hero.eyebrow")}
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease, delay: 0.06 }}
            className="text-4xl md:text-5xl font-black text-[#3D1A12] leading-tight mb-4"
          >
            {t("colorPicker.hero.heading")}{" "}
            <span className="text-[#3D1A12]/30">{t("colorPicker.hero.headingSoft")}</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease, delay: 0.12 }}
            className="text-base text-[#3D1A12]/55 max-w-lg mx-auto"
          >
            {t("colorPicker.hero.body")}
          </motion.p>
        </div>
      </section>

      {/* ── Step progress ────────────────────────────────────────────────────── */}
      <div className="flex justify-center gap-2 mb-10 px-4">
        {[1, 2, 3].map((s) => (
          <div
            key={s}
            className={`h-1 rounded-full transition-all duration-500 ${
              s <= step ? "bg-[#3D1A12] w-10" : "bg-[#3D1A12]/12 w-6"
            }`}
          />
        ))}
      </div>

      {/* ── Steps ───────────────────────────────────────────────────────────── */}
      <div className="px-4 pb-28">
        <AnimatePresence mode="wait">

          {/* ── Step 1: Room ──────────────────────────────────────────────────── */}
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35, ease }}
              className="max-w-2xl mx-auto"
            >
              <p className="text-xs font-bold uppercase tracking-widest text-[#3D1A12]/35 text-center mb-2">
                {t("colorPicker.step1.label")}
              </p>
              <h2 className="text-2xl font-black text-[#3D1A12] text-center mb-8">
                {t("colorPicker.step1.heading")}
              </h2>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {ROOM_TYPES.map((rt) => (
                  <button
                    key={rt.id}
                    onClick={() => handleRoomSelect(rt.id)}
                    className="group flex flex-col items-center justify-center gap-2.5 p-6 bg-white rounded-2xl border-2 border-transparent hover:border-[#3D1A12]/15 hover:shadow-md transition-all duration-300 cursor-pointer"
                  >
                    <span className="text-2xl">{rt.icon}</span>
                    <span className="text-xs font-bold text-[#3D1A12] text-center leading-tight">
                      {t(`colorPicker.${rt.labelKey}`)}
                    </span>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* ── Step 2: Palette mood ──────────────────────────────────────────── */}
          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35, ease }}
              className="max-w-4xl mx-auto"
            >
              <button
                onClick={() => setStep(1)}
                className={`flex items-center gap-1.5 text-xs font-bold text-[#3D1A12]/45 hover:text-[#3D1A12] transition-colors mb-6 ${isRTL ? "flex-row-reverse" : ""}`}
              >
                <ArrowLeft size={13} className={isRTL ? "rotate-180" : ""} />
                {t("colorPicker.step2.back")}
              </button>

              <p className="text-xs font-bold uppercase tracking-widest text-[#3D1A12]/35 text-center mb-2">
                {t("colorPicker.step2.label")}
              </p>
              <h2 className="text-2xl font-black text-[#3D1A12] text-center mb-8">
                {t("colorPicker.step2.heading")}
              </h2>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
                {PALETTES.map((palette) => (
                  <button
                    key={palette.id}
                    onClick={() => handlePaletteSelect(palette.id)}
                    className="group flex flex-col gap-3 p-4 bg-white rounded-2xl border-2 border-transparent hover:border-[#3D1A12]/15 hover:shadow-md transition-all duration-300 cursor-pointer text-start"
                  >
                    {/* Color preview strip */}
                    <div className="flex gap-1 w-full">
                      {palette.swatches.map((s, i) => (
                        <div
                          key={i}
                          className="flex-1 h-7 rounded-lg"
                          style={{ backgroundColor: s.hex }}
                        />
                      ))}
                    </div>
                    <div>
                      <p className="text-xs font-black text-[#3D1A12] leading-snug">
                        {palette.name[paletteLang]}
                      </p>
                      <p className="text-[10px] text-[#3D1A12]/45 mt-0.5 leading-snug line-clamp-1">
                        {palette.vibe[paletteLang].feel.join(" · ")}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* ── Step 3: Results ───────────────────────────────────────────────── */}
          {step === 3 && activePalette && (
            <motion.div
              key="step3"
              ref={resultsRef}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.4, ease }}
              className="max-w-3xl mx-auto"
            >
              {/* ── Palette name + swatches ─────────────────────────────────── */}
              <div className="text-center mb-6">
                <p className="text-xs font-black uppercase tracking-[0.2em] text-[#3D1A12]/35 mb-2">
                  {t("colorPicker.results.yourPalette")}
                </p>
                <h2 className="text-3xl sm:text-4xl font-black text-[#3D1A12]">
                  {activePalette.name[paletteLang]}
                </h2>
              </div>

              <div className="bg-white rounded-3xl p-6 sm:p-8 mb-5 shadow-sm">
                <div className="grid grid-cols-5 gap-2 sm:gap-3 mb-6">
                  {activePalette.swatches.map((swatch, i) => (
                    <motion.div
                      key={swatch.hex}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, ease, delay: i * 0.07 }}
                      className="flex flex-col gap-2"
                    >
                      <div
                        className="w-full aspect-square rounded-xl sm:rounded-2xl shadow-sm"
                        style={{ backgroundColor: swatch.hex }}
                      />
                      <div className="text-center">
                        <p className="text-[9px] sm:text-[10px] font-bold text-[#3D1A12]/45 leading-tight">
                          {t(`colorPicker.${swatch.roleKey}`)}
                        </p>
                        <p className="text-[9px] sm:text-[10px] font-black text-[#3D1A12] font-mono mt-0.5">
                          {swatch.hex}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <button
                  onClick={handleCopy}
                  className={`flex items-center gap-2 text-xs font-bold px-4 py-2.5 rounded-xl border transition-all duration-300 ${
                    copied
                      ? "border-green-400 bg-green-50 text-green-700"
                      : "border-[#3D1A12]/12 text-[#3D1A12]/55 hover:border-[#3D1A12]/25 hover:text-[#3D1A12]"
                  } ${isRTL ? "flex-row-reverse" : ""}`}
                >
                  {copied ? <Check size={13} /> : <Copy size={13} />}
                  {copied ? t("colorPicker.results.copied") : t("colorPicker.results.copyHex")}
                </button>
              </div>

              {/* ── Vibe section ────────────────────────────────────────────── */}
              {(() => {
                const vibe = activePalette.vibe[paletteLang];
                return (
                  <motion.div
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease, delay: 0.1 }}
                    className="rounded-3xl overflow-hidden mb-5"
                    style={{ borderLeft: `4px solid ${activePalette.swatches[0].hex}` }}
                  >
                    <div className="bg-white px-6 sm:px-8 py-8 sm:py-10">
                      <p className="text-xs font-black uppercase tracking-[0.18em] text-[#3D1A12]/35 mb-5">
                        {t("colorPicker.results.theVibe")}
                      </p>

                      {/* Headline quote */}
                      <p className="text-xl sm:text-2xl font-black text-[#3D1A12] leading-snug mb-5 italic">
                        "{vibe.headline}"
                      </p>

                      {/* Description */}
                      <p className="text-sm text-[#3D1A12]/65 leading-relaxed mb-8">
                        {vibe.desc}
                      </p>

                      {/* Feel + Best For grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {/* You'll feel */}
                        <div>
                          <p className="text-[10px] font-black uppercase tracking-widest text-[#3D1A12]/35 mb-3">
                            {t("colorPicker.results.youllFeel")}
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {vibe.feel.map((f) => (
                              <span
                                key={f}
                                className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full text-[#3D1A12]"
                                style={{ backgroundColor: `${activePalette.swatches[0].hex}30` }}
                              >
                                <span
                                  className="w-1.5 h-1.5 rounded-full shrink-0"
                                  style={{ backgroundColor: activePalette.swatches[0].hex }}
                                />
                                {f}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Best for */}
                        <div>
                          <p className="text-[10px] font-black uppercase tracking-widest text-[#3D1A12]/35 mb-3">
                            {t("colorPicker.results.bestFor")}
                          </p>
                          <ul className="space-y-1.5">
                            {vibe.bestFor.map((b) => (
                              <li
                                key={b}
                                className={`flex items-center gap-2 text-xs font-bold text-[#3D1A12]/70 ${isRTL ? "flex-row-reverse" : ""}`}
                              >
                                <span
                                  className="w-1 h-1 rounded-full shrink-0"
                                  style={{ backgroundColor: activePalette.swatches[1].hex }}
                                />
                                {b}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })()}

              {/* ── Matching pieces ──────────────────────────────────────────── */}
              <div className="mb-6">
                <p className="text-xs font-black uppercase tracking-widest text-[#3D1A12]/35 mb-5 text-center">
                  {t("colorPicker.results.matchingPieces")}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {recommendedProducts.map((product, i) => (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, ease, delay: 0.15 + i * 0.08 }}
                    >
                      <Link
                        to={`/${l}/products/${product.slug}`}
                        className="group block bg-white rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300 border border-transparent hover:border-[#3D1A12]/8"
                      >
                        <div className="aspect-square overflow-hidden bg-[#F0EDE8]">
                          <img
                            src={product.images[0]}
                            alt={product.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            loading="lazy"
                          />
                        </div>
                        <div className="p-4">
                          <p className="text-[10px] font-black uppercase tracking-widest text-[#3D1A12]/35 mb-1">
                            {product.collection}
                          </p>
                          <p className="text-sm font-black text-[#3D1A12] mb-1">{product.name}</p>
                          <p className="text-xs text-[#3D1A12]/50 mb-3 line-clamp-2 leading-relaxed">
                            {product.tagline}
                          </p>
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-black text-[#3D1A12]">
                              {product.price.toLocaleString()} MAD
                            </span>
                            <span className="text-xs font-bold text-[#3D1A12]/40 group-hover:text-[#3D1A12] transition-colors">
                              {t("colorPicker.results.viewProduct")} →
                            </span>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* ── CTAs ─────────────────────────────────────────────────────── */}
              <div className="bg-[#3D1A12] rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row gap-5 items-center justify-between mb-8">
                <div>
                  <p className="font-black text-white mb-1">
                    {t("colorPicker.results.talkToUs")}
                  </p>
                  <p className="text-xs text-white/50 max-w-xs">
                    {t("colorPicker.results.talkToUsHint")}
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 shrink-0">
                  <a
                    href={`https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMsg}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center justify-center gap-2 bg-[#25D366] text-white text-xs font-black uppercase tracking-widest px-5 py-3 rounded-xl hover:bg-[#20b858] transition-colors ${isRTL ? "flex-row-reverse" : ""}`}
                  >
                    <MessageCircle size={14} />
                    WhatsApp
                  </a>
                  <Link
                    to={`/${l}/products`}
                    className="flex items-center justify-center bg-white text-[#3D1A12] text-xs font-black uppercase tracking-widest px-5 py-3 rounded-xl hover:bg-white/90 transition-colors"
                  >
                    {t("colorPicker.results.shopCollection")}
                  </Link>
                </div>
              </div>

              {/* Start over */}
              <div className="text-center">
                <button
                  onClick={handleReset}
                  className={`inline-flex items-center gap-2 text-xs font-bold text-[#3D1A12]/35 hover:text-[#3D1A12] transition-colors ${isRTL ? "flex-row-reverse" : ""}`}
                >
                  <RotateCcw size={12} />
                  {t("colorPicker.results.startOver")}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ColorPalettePicker;
