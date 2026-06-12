import { useState } from "react";
import { Box, Smartphone, RotateCcw } from "lucide-react";
import { useTranslation } from "react-i18next";

interface Props {
  productName: string;
  glbUrl?: string;
  posterUrl?: string;
}

export function RoomVisualizer({ productName, glbUrl, posterUrl }: Props) {
  const { t } = useTranslation();
  const [active, setActive] = useState(false);
  const [key, setKey] = useState(0);

  if (!glbUrl) {
    return (
      <div className="flex flex-col items-center justify-center py-10 px-6 text-center bg-[#F6F4F1] rounded-xl border border-dashed border-[#3D1A12]/15">
        <Box size={28} className="text-[#3D1A12]/20 mb-3" />
        <p className="text-xs font-black uppercase tracking-widest text-[#3D1A12]/30 mb-1">
          {t("visualizer.comingSoon")}
        </p>
        <p className="text-[10px] text-[#3D1A12]/25 font-light max-w-xs leading-relaxed">
          {t("visualizer.comingSoonHint")}
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {!active ? (
        <button
          onClick={() => setActive(true)}
          className="w-full flex items-center justify-center gap-3 bg-[#3D1A12] text-white py-4 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-[#2e1209] transition-colors"
        >
          <Box size={14} />
          {t("visualizer.view3D")}
        </button>
      ) : (
        <div className="flex flex-col gap-2">
          <div className="relative w-full aspect-square rounded-xl overflow-hidden bg-[#F0EDE9]">
            <model-viewer
              key={key}
              src={glbUrl}
              alt={productName}
              poster={posterUrl}
              camera-controls=""
              auto-rotate=""
              ar=""
              ar-modes="webxr scene-viewer quick-look"
              ar-scale="fixed"
              shadow-intensity="1.2"
              exposure="0.85"
              loading="lazy"
              style={{ width: "100%", height: "100%" }}
            />
            <button
              onClick={() => setKey((k) => k + 1)}
              className="absolute top-3 right-3 w-8 h-8 bg-white/80 backdrop-blur-sm rounded-xl flex items-center justify-center hover:bg-white transition-colors"
              aria-label="Reset view"
              title="Reset view"
            >
              <RotateCcw size={13} className="text-[#3D1A12]" />
            </button>
          </div>

          <div className="flex items-start gap-2.5 px-1">
            <Smartphone size={13} className="text-[#C9922A] shrink-0 mt-0.5" />
            <p className="text-[10px] text-[#3D1A12]/40 font-light leading-relaxed">
              {t("visualizer.arHint")}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
