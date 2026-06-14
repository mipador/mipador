import { useTranslation } from "react-i18next";

const ModelGrid = () => {
  const { t } = useTranslation();

  const spaces = [
    t("modelGrid.space1"),
    t("modelGrid.space2"),
    t("modelGrid.space3"),
    t("modelGrid.space4"),
    t("modelGrid.space5"),
    t("modelGrid.space6"),
    t("modelGrid.space7"),
    t("modelGrid.space8"),
    t("modelGrid.space9"),
    t("modelGrid.space10"),
    t("modelGrid.space11"),
    t("modelGrid.space12"),
  ];

  return (
    <section className="py-24 px-6 bg-[#F6F4F1]">
      <div className="max-w-7xl mx-auto text-center">
        <p className="text-[10px] font-black uppercase tracking-[0.4em] text-[#3D1A12]/40 mb-4">
          {t("modelGrid.eyebrow")}
        </p>
        <h2 className="text-4xl md:text-5xl font-black text-[#3D1A12] tracking-tight mb-4">
          {t("modelGrid.heading")}
        </h2>
        <p className="text-[#3D1A12]/40 text-base mb-16 max-w-xl mx-auto leading-relaxed">
          {t("modelGrid.body")}
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {spaces.map((space, i) => (
            <div
              key={i}
              className="bg-white border border-[#3D1A12]/8 rounded-xl p-5 hover:border-[#C9922A]/30 hover:bg-[#EFEBE9] transition-all group cursor-default"
            >
              <p className="text-xs font-black text-[#3D1A12] tracking-tight">
                {space}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ModelGrid;
