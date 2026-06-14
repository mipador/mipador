import { Leaf, Compass, Flame } from "lucide-react";
import { useTranslation } from "react-i18next";

const icons = [Compass, Flame, Leaf];

const CoreFeatures = () => {
  const { t } = useTranslation();

  const values = [
    {
      icon: icons[0],
      title: t("coreFeatures.value1Title"),
      description: t("coreFeatures.value1Desc"),
    },
    {
      icon: icons[1],
      title: t("coreFeatures.value2Title"),
      description: t("coreFeatures.value2Desc"),
    },
    {
      icon: icons[2],
      title: t("coreFeatures.value3Title"),
      description: t("coreFeatures.value3Desc"),
    },
  ];

  return (
    <section className="py-24 px-6 bg-[#2A0F08]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-[#C9922A] mb-4">
            {t("coreFeatures.eyebrow")}
          </p>
          <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">
            {t("coreFeatures.heading")}
            <span className="text-white/25 italic font-light"> {t("coreFeatures.headingSoft")}</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {values.map((v, i) => (
            <div
              key={i}
              className="bg-white/5 border border-white/10 rounded-3xl p-10 hover:bg-white/8 transition-all group"
            >
              <div className="w-12 h-12 rounded-xl bg-[#C9922A]/15 flex items-center justify-center mb-8 group-hover:bg-[#C9922A]/25 transition-colors">
                <v.icon className="text-[#C9922A]" size={22} />
              </div>
              <h3 className="text-xl font-black text-white mb-4 tracking-tight">
                {v.title}
              </h3>
              <p className="text-white/40 leading-relaxed text-sm">
                {v.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CoreFeatures;
