import React, { useMemo } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import SelectedWorksSection from "./components/SelectedWorksSection";
import ComingSoonSection from "./components/ComingSoonSection";
import HeroSection from "./components/HeroSection";
import HowToOrder from "./components/HowToOrder";
import TaglineSection from "./components/TaglineSection";
import ScrollToTop from "../../components/ScrollToTop";
import { useSEO, useJsonLd } from "../../hooks/useSEO";

const SITE_URL = "https://mipador.com";

const BREADCRUMB_HOME: Record<string, string> = {
  en: "Home",
  fr: "Accueil",
  ar: "الرئيسية",
};

const HomePage: React.FC = () => {
  const { t } = useTranslation();
  const { lang } = useParams<{ lang: string }>();
  const l = lang || "en";

  useSEO(t("seo.homeTitle"), t("seo.homeDesc"));

  const schema = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "WebPage",
          "@id": `${SITE_URL}/#/${l}/#webpage`,
          "url": `${SITE_URL}/#/${l}/`,
          "name": `${t("seo.homeTitle")} | Mipador`,
          "description": t("seo.homeDesc"),
          "isPartOf": { "@id": `${SITE_URL}/#website` },
          "about": { "@id": `${SITE_URL}/#organization` },
          "inLanguage": l,
        },
        {
          "@type": "BreadcrumbList",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": BREADCRUMB_HOME[l] ?? "Home",
              "item": `${SITE_URL}/#/${l}/`,
            },
          ],
        },
        {
          "@type": "ItemList",
          "name": "Featured Mipador Products",
          "description":
            "Handcrafted Moroccan furniture and decor — bestsellers from the Mipador collection.",
          "url": `${SITE_URL}/#/${l}/products`,
          "numberOfItems": 5,
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "Wabi Lounge Chair",
              "url": `${SITE_URL}/#/${l}/products/wabi-lounge-chair`,
            },
            {
              "@type": "ListItem",
              "position": 2,
              "name": "Medina Coffee Table",
              "url": `${SITE_URL}/#/${l}/products/medina-coffee-table`,
            },
            {
              "@type": "ListItem",
              "position": 3,
              "name": "Atlas Shelf System",
              "url": `${SITE_URL}/#/${l}/products/atlas-shelf-system`,
            },
            {
              "@type": "ListItem",
              "position": 4,
              "name": "Kasbah Floor Lamp",
              "url": `${SITE_URL}/#/${l}/products/kasbah-floor-lamp`,
            },
            {
              "@type": "ListItem",
              "position": 5,
              "name": "Sabil Ceramic Vase",
              "url": `${SITE_URL}/#/${l}/products/sabil-ceramic-vase`,
            },
          ],
        },
      ],
    }),
    [l, t]
  );
  useJsonLd(schema);

  return (
    <div>
      <ScrollToTop />
      <HeroSection />
      <SelectedWorksSection />
      <HowToOrder />
      <ComingSoonSection />
      <TaglineSection />
    </div>
  );
};

export default HomePage;
