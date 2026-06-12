import { ShieldCheck, Truck, RefreshCcw } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useParams, Link } from "react-router-dom";

const BADGES = [
  { Icon: ShieldCheck, titleKey: "tagline.craftTitle", descKey: "tagline.craftDesc" },
  { Icon: Truck,       titleKey: "tagline.deliveryTitle", descKey: "tagline.deliveryDesc" },
  { Icon: RefreshCcw,  titleKey: "tagline.returnsTitle", descKey: "tagline.returnsDesc" },
] as const;

interface TrustBadgesProps {
  className?: string;
}

export default function TrustBadges({ className = "" }: TrustBadgesProps) {
  const { t } = useTranslation();
  const { lang } = useParams();
  const currentLang = lang || "en";

  return (
    <div className={`flex flex-col gap-2.5 ${className}`}>
      <div className="grid grid-cols-3 gap-2">
        {BADGES.map(({ Icon, titleKey, descKey }) => (
          <div
            key={titleKey}
            className="flex flex-col items-center text-center bg-white rounded-xl p-3 gap-1.5 border border-[#3D1A12]/8"
          >
            <Icon size={15} strokeWidth={1.5} className="text-[#3D1A12]/55 shrink-0" />
            <p className="text-[8px] font-black uppercase tracking-wider text-[#3D1A12] leading-snug">
              {t(titleKey)}
            </p>
            <p className="text-[7.5px] text-[#3D1A12]/35 leading-snug hidden sm:block">
              {t(descKey)}
            </p>
          </div>
        ))}
      </div>

      <Link
        to={`/${currentLang}/refund-policy`}
        className="text-center text-[8.5px] font-black uppercase tracking-widest text-[#3D1A12]/30 hover:text-[#3D1A12]/55 transition-colors"
      >
        {t("footer.refund")} →
      </Link>
    </div>
  );
}
