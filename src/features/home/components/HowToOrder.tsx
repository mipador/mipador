import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useTranslation } from "react-i18next";

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const HowToOrder: React.FC = () => {
  const lineRef = useRef(null);
  const isInView = useInView(lineRef, { once: true, margin: "-100px" });
  const { t } = useTranslation();

  const steps = [
    { number: "01", titleKey: "howToOrder.step1Title", descKey: "howToOrder.step1Desc" },
    { number: "02", titleKey: "howToOrder.step2Title", descKey: "howToOrder.step2Desc" },
    { number: "03", titleKey: "howToOrder.step3Title", descKey: "howToOrder.step3Desc" },
  ];

  return (
    <section className="relative py-6 sm:py-8 lg:py-12 bg-[#F4F4F4]">

      <div
        className="absolute inset-0 opacity-[0.1] pointer-events-none z-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%23C9922A' stroke-width='1.5'%3E%3Cpath d='M40 0L80 40L40 80L0 40Z'/%3E%3Cpath d='M40 20L60 40L40 60L20 40Z'/%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: "80px 80px",
        }}
      />

      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: EASE }}
          className="max-w-2xl mx-auto text-center"
        >
          <h2 className="text-3xl font-bold leading-tight text-[#3D1A12] sm:text-4xl lg:text-5xl">
            {t("howToOrder.heading")}
          </h2>
          <p className="max-w-lg mx-auto mt-4 text-base leading-relaxed text-[#3D1A12]/70">
            {t("howToOrder.body")}
          </p>
        </motion.div>

        <div className="relative mt-14 lg:mt-20">

          <div className="absolute inset-x-0 hidden xl:px-44 top-2 md:block md:px-20 lg:px-28">
            <motion.img
              ref={lineRef}
              className="w-full opacity-60"
              src="https://cdn.rareblocks.xyz/collection/celebration/images/steps/2/curved-dotted-line.svg"
              alt=""
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.8 }}
              style={{
                filter: "brightness(0) saturate(100%) invert(15%) sepia(20%) saturate(800%) hue-rotate(330deg)",
              }}
            />
          </div>

          <div className="relative grid grid-cols-1 text-center gap-y-12 md:grid-cols-3 gap-x-12">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ delay: i * 0.15, duration: 0.6, ease: EASE }}
              >
                <div className="flex items-center justify-center w-16 h-16 mx-auto rounded-full border border-[#3D1A12]/20 bg-white shadow-sm">
                  <span className="text-lg font-semibold text-[#3D1A12]">{step.number}</span>
                </div>
                <h3 className="mt-6 text-xl font-semibold leading-tight text-[#3D1A12] md:mt-10">
                  {t(step.titleKey)}
                </h3>
                <p className="mt-4 text-base text-[#3D1A12]/70 leading-relaxed">
                  {t(step.descKey)}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowToOrder;
