import { ShieldCheck, Truck, Smartphone, RefreshCcw } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const TaglineSection = () => {
  const { t } = useTranslation();

  const features = [
    { icon: <ShieldCheck strokeWidth={1} size={32} />, titleKey: "tagline.craftTitle", descKey: "tagline.craftDesc" },
    { icon: <Truck strokeWidth={1} size={32} />, titleKey: "tagline.deliveryTitle", descKey: "tagline.deliveryDesc" },
    { icon: <Smartphone strokeWidth={1} size={32} />, titleKey: "tagline.supportTitle", descKey: "tagline.supportDesc" },
    { icon: <RefreshCcw strokeWidth={1} size={32} />, titleKey: "tagline.returnsTitle", descKey: "tagline.returnsDesc" },
  ];

  return (
    <section className="relative py-16 md:py-32 bg-[#F4F4F4] flex items-center justify-center overflow-hidden">

      <div
        className="absolute inset-0 opacity-[0.1] pointer-events-none z-0"
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
          {features.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: i * 0.12, duration: 0.6, ease: EASE }}
              className="group relative flex flex-col items-center text-center p-6 md:p-8 rounded-3xl bg-[#FFFFFF]/70 border border-[#3D1A12]/10 overflow-hidden transition-all duration-500 hover:scale-[1.03] hover:border-[#3D1A12]/30"
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                <div className="absolute -top-10 -left-10 w-40 h-40 bg-[#3D1A12]/10 blur-2xl rounded-xl animate-pulse" />
                <div className="absolute bottom-0 right-0 w-40 h-40 bg-[#3D1A12]/10 blur-2xl rounded-xl animate-pulse" />
              </div>
              <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -left-full top-0 h-full w-1/2 bg-gradient-to-r from-transparent via-white/10 to-transparent rotate-12 group-hover:left-full transition-all duration-1000 ease-out" />
              </div>
              <div className="relative z-10">
                <div className="mb-6 text-[#3D1A12] transition-transform duration-300 group-hover:scale-110">
                  {item.icon}
                </div>
                <h4 className="text-lg font-bold mb-2 uppercase tracking-tight text-[#3D1A12]">
                  {t(item.titleKey)}
                </h4>
                <p className="text-[#3D1A12]/60 text-sm leading-relaxed">
                  {t(item.descKey)}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TaglineSection;
