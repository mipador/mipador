import ContactForm from "./components/ContactForm";
import ContactHero from "./components/ContactHero";
import ContactInfo from "./components/ContactInfo";
import ScrollToTop from "../../components/ScrollToTop";
import { useMemo } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useSEO, useJsonLd } from "../../hooks/useSEO";

const SITE_URL = "https://mipador.com";

const CONTACT_LABELS: Record<string, { home: string; contact: string }> = {
  en: { home: "Home", contact: "Contact" },
  fr: { home: "Accueil", contact: "Contact" },
  ar: { home: "الرئيسية", contact: "تواصل" },
};

const ContactPage: React.FC = () => {
  const { t } = useTranslation();
  const { lang } = useParams<{ lang: string }>();
  const l = lang || "en";
  const labels = CONTACT_LABELS[l] ?? CONTACT_LABELS.en;

  useSEO(t("seo.contactTitle"), t("seo.contactDesc"));

  const schema = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "ContactPage",
          "@id": `${SITE_URL}/#/${l}/contact#webpage`,
          "url": `${SITE_URL}/#/${l}/contact`,
          "name": `${t("seo.contactTitle")} | Mipador`,
          "description": t("seo.contactDesc"),
          "isPartOf": { "@id": `${SITE_URL}/#website` },
          "inLanguage": l,
        },
        {
          "@type": ["LocalBusiness", "FurnitureStore"],
          "@id": `${SITE_URL}/#business`,
          "name": "Mipador",
          "description":
            "Premium contemporary furniture and home decor studio based in Casablanca, Morocco. Designed for spaces that breathe — indoor and outdoor pieces delivered across Morocco.",
          "url": `${SITE_URL}`,
          "image": `${SITE_URL}/images/hero.jpg`,
          "logo": `${SITE_URL}/images/LogoMipadorNavBar.png`,
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Casablanca",
            "addressRegion": "Grand Casablanca-Settat",
            "addressCountry": "MA",
          },
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": 33.5731,
            "longitude": -7.5898,
          },
          "priceRange": "MAD 1,200 – MAD 15,000",
          "currenciesAccepted": "MAD",
          "paymentAccepted": "Cash on Delivery, Bank Transfer",
          "areaServed": "Morocco",
          "hasMap": "https://www.google.com/maps?q=Casablanca,Morocco",
          "parentOrganization": { "@id": `${SITE_URL}/#organization` },
        },
        {
          "@type": "BreadcrumbList",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": labels.home,
              "item": `${SITE_URL}/#/${l}/`,
            },
            {
              "@type": "ListItem",
              "position": 2,
              "name": labels.contact,
              "item": `${SITE_URL}/#/${l}/contact`,
            },
          ],
        },
      ],
    }),
    [l, t, labels]
  );
  useJsonLd(schema);
  return (
    <div className="min-h-screen bg-[#F6F4F1] p-6 md:p-12 lg:p-24 selection:bg-[#3D1E16] selection:text-white">
      <ScrollToTop />
      <div className="max-w-6xl mx-auto">
        <ContactHero />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div className="space-y-12">
            <ContactInfo />
            {/* Minimal Map Placeholder */}
            <div className="w-full h-56 bg-[#E6E3DF] rounded-xl flex items-center justify-center border border-[#DEDAD5]">
              
                <div className="w-full h-56 rounded-xl overflow-hidden border border-[#DEDAD5]">
                <iframe
                  title="Casablanca Location"
                  src="https://www.google.com/maps?q=Casablanca, Morocco&output=embed"
                  className="w-full h-full"
                  loading="lazy"
                />
              </div>
              
            </div>
          </div>

          <div className="bg-[#EFECE8] p-8 md:p-10 rounded-[2.5rem] border border-[#E6E3DF]">
            <h3 className="text-xl font-bold text-[#3D1E16] tracking-tight mb-8">
              Direct Message
            </h3>
            <ContactForm />
          </div>
        </div>

      </div>
    </div>
  );
};

export default ContactPage;
