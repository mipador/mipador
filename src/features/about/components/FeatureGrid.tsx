import { Wind, Sun, Moon, Mountain, Droplets, Star, Circle, Triangle } from "lucide-react";
import { useTranslation } from "react-i18next";

const icons = [Sun, Mountain, Moon, Wind, Droplets, Star, Circle, Triangle];

const FeatureGrid = () => {
  const { t } = useTranslation();

  const touches = [
    { icon: icons[0], title: t("featureGrid.touch1Title"), desc: t("featureGrid.touch1Desc") },
    { icon: icons[1], title: t("featureGrid.touch2Title"), desc: t("featureGrid.touch2Desc") },
    { icon: icons[2], title: t("featureGrid.touch3Title"), desc: t("featureGrid.touch3Desc") },
    { icon: icons[3], title: t("featureGrid.touch4Title"), desc: t("featureGrid.touch4Desc") },
    { icon: icons[4], title: t("featureGrid.touch5Title"), desc: t("featureGrid.touch5Desc") },
    { icon: icons[5], title: t("featureGrid.touch6Title"), desc: t("featureGrid.touch6Desc") },
    { icon: icons[6], title: t("featureGrid.touch7Title"), desc: t("featureGrid.touch7Desc") },
    { icon: icons[7], title: t("featureGrid.touch8Title"), desc: t("featureGrid.touch8Desc") },
  ];

  return (
    <section className="py-24 px-6 bg-[#F6F4F1]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-[#3D1A12]/40 mb-4">
            {t("featureGrid.eyebrow")}
          </p>
          <h2 className="text-4xl font-black text-[#3D1A12] tracking-tight">
            {t("featureGrid.heading")}
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {touches.map((item, i) => (
            <div
              key={i}
              className="bg-white border border-[#3D1A12]/8 rounded-xl p-6 hover:bg-[#EFEBE9] hover:border-[#C9922A]/20 transition-all group"
            >
              <item.icon
                className="text-[#C9922A] mb-5 transition-transform group-hover:scale-110"
                size={24}
              />
              <h3 className="font-black text-[#3D1A12] text-sm mb-2 tracking-tight">
                {item.title}
              </h3>
              <p className="text-xs text-[#3D1A12]/40 leading-relaxed font-light">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureGrid;
