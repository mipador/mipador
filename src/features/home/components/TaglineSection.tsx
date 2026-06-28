import { Compass, Hammer, Wind, Clock } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const TaglineSection = () => {
  const { t } = useTranslation();

  const pillars = [
    { icon: <Compass strokeWidth={1} size={28} />, titleKey: "tagline.pillar1Title", descKey: "tagline.pillar1Desc" },
    { icon: <Hammer  strokeWidth={1} size={28} />, titleKey: "tagline.pillar2Title", descKey: "tagline.pillar2Desc" },
    { icon: <Wind    strokeWidth={1} size={28} />, titleKey: "tagline.pillar3Title", descKey: "tagline.pillar3Desc" },
    { icon: <Clock   strokeWidth={1} size={28} />, titleKey: "tagline.pillar4Title", descKey: "tagline.pillar4Desc" },
  ];

  return (
    <section className="relative py-16 md:py-32 bg-[#F4F4F4] flex items-center justify-center overflow-hidden">

      <div
        className="absolute inset-0 opacity-[0.07] pointer-events-none z-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%23C9922A' stroke-width='1.5'%3E%3Cpath d='M40 0L80 40L40 80L0 40Z'/%3E%3Cpath d='M40 20L60 40L40 60L20 40Z'/%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: "80px 80px",
        }}
      />

      <div className="max-w-7xl mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1, ease: EASE }}
          className="text-3xl md:text-5xl font-medium text-[#3D1A12] leading-tight text-center max-w-4xl mx-auto"
        >
          {t("tagline.headline")}{" "}
          <span className="text-[#3D1A12]/60 italic">
            {t("tagline.headlineSoft")}
          </span>{" "}
          {t("tagline.headlineEnd")}
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-10 mt-12 md:mt-24">
          {pillars.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: i * 0.12, duration: 0.6, ease: EASE }}
              className="flex flex-col items-center text-center p-6 md:p-8 rounded-3xl bg-[#FFFFFF]/70 border border-[#3D1A12]/10 transition-all duration-500 hover:scale-[1.02] hover:border-[#3D1A12]/20 hover:shadow-sm"
            >
              <div className="mb-6 text-[#3D1A12]/60">
                {item.icon}
              </div>
              <h3 className="text-base font-semibold mb-3 text-[#3D1A12] tracking-wide">
                {t(item.titleKey)}
              </h3>
              <p className="text-[#3D1A12]/55 text-sm leading-relaxed font-light">
                {t(item.descKey)}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TaglineSection;
