import React, { useMemo } from "react";
import { useParams } from "react-router-dom";
import { useProductStore } from "../../../../store/product.store";
import { Search } from "lucide-react";
import { useTranslation } from "react-i18next";
import ProductToolbar from "../ProductToolbar/ProductToolbar";
import ProductGrid from "../ProductGrid/ProductGrid";
import CollectionHeroTabs from "../CollectionHeroTabs/CollectionHeroTabs";
import Pagination from "../Pagination/Pagination";
import { motion } from "framer-motion";
import ScrollToTop from "../../../../components/ScrollToTop";
import { useSEO, useJsonLd } from "../../../../hooks/useSEO";
import { products } from "../../../../data/products";

export const ITEMS_PER_PAGE = 9;

const SITE_URL = "https://mipador.com";

const COLLECTION_LABELS: Record<string, { home: string; collection: string }> = {
  en: { home: "Home", collection: "Collection" },
  fr: { home: "Accueil", collection: "Collection" },
  ar: { home: "الرئيسية", collection: "المجموعة" },
};

const ProductsPage: React.FC = () => {
  const {
    getFilteredProducts,
    currentPage,
    hasActiveFilters,
    resetFilters,
    setLocationFilter,
  } = useProductStore();
  const { t } = useTranslation();
  const { lang } = useParams<{ lang: string }>();
  const l = lang || "en";
  const labels = COLLECTION_LABELS[l] ?? COLLECTION_LABELS.en;

  useSEO(t("seo.productsTitle"), t("seo.productsDesc"));

  const schema = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "CollectionPage",
          "@id": `${SITE_URL}/#/${l}/products#webpage`,
          "url": `${SITE_URL}/#/${l}/products`,
          "name": `${t("seo.productsTitle")} | Mipador`,
          "description": t("seo.productsDesc"),
          "isPartOf": { "@id": `${SITE_URL}/#website` },
          "inLanguage": l,
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
              "name": labels.collection,
              "item": `${SITE_URL}/#/${l}/products`,
            },
          ],
        },
        {
          "@type": "ItemList",
          "name": "Mipador Furniture & Decor Collection",
          "url": `${SITE_URL}/#/${l}/products`,
          "numberOfItems": products.length,
          "itemListElement": products.map((p, i) => ({
            "@type": "ListItem",
            "position": i + 1,
            "name": p.name,
            "url": `${SITE_URL}/#/${l}/products/${p.slug}`,
            "image": p.images[0] ? `${SITE_URL}${p.images[0]}` : undefined,
          })),
        },
      ],
    }),
    [l, t, labels]
  );
  useJsonLd(schema);

  const filteredData = getFilteredProducts();
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentItems = filteredData.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <div className="min-h-screen bg-[#F6F4F1]">
      <ScrollToTop />

      <div className="max-w-7xl mx-auto px-4 md:px-6 pt-28 md:pt-32 pb-24">

        {/* Page header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-10 md:mb-12"
        >
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-[#3D1A12]/35 mb-2">
            {t("products.studio")}
          </p>
          <h1 className="text-4xl md:text-7xl font-black text-[#3D1A12] tracking-tight leading-none">
            {t("products.heading")}
          </h1>
          <p className="mt-2 text-[#3D1A12]/40 text-sm font-light">
            {t("products.pieces", { count: filteredData.length })}
            {hasActiveFilters() && (
              <button
                onClick={resetFilters}
                className="ml-3 text-[#C9922A] font-black text-xs uppercase tracking-widest hover:text-[#3D1A12] transition-colors"
              >
                {t("products.clearFilters")}
              </button>
            )}
          </p>
        </motion.div>

        {/* Indoor / Outdoor hero tabs + subfilter chips */}
        <CollectionHeroTabs />

        {/* Search + sort toolbar */}
        <ProductToolbar />

        {/* Product grid or empty state */}
        {filteredData.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center gap-5">
            <div className="w-16 h-16 rounded-xl bg-[#3D1A12]/5 flex items-center justify-center">
              <Search size={22} className="text-[#3D1A12]/20" />
            </div>
            <div className="space-y-1.5">
              <p className="text-[#3D1A12]/50 font-black text-sm uppercase tracking-widest">
                {t("products.noResults")}
              </p>
              <p className="text-[#3D1A12]/30 text-xs font-light max-w-xs mx-auto leading-relaxed">
                {t("products.noResultsHint")}
              </p>
            </div>
            <div className="flex flex-wrap gap-2 justify-center">
              <button
                onClick={resetFilters}
                className="px-4 py-2 bg-[#3D1A12] text-white text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-[#4D2A22] transition-colors"
              >
                {t("products.noResultsAll")}
              </button>
              <button
                onClick={() => { resetFilters(); setLocationFilter("indoor"); }}
                className="px-4 py-2 bg-white border border-[#3D1A12]/15 text-[#3D1A12]/60 text-[10px] font-black uppercase tracking-widest rounded-xl hover:border-[#3D1A12]/30 hover:text-[#3D1A12] transition-colors"
              >
                {t("products.noResultsIndoor")}
              </button>
              <button
                onClick={() => { resetFilters(); setLocationFilter("outdoor"); }}
                className="px-4 py-2 bg-white border border-[#3D1A12]/15 text-[#3D1A12]/60 text-[10px] font-black uppercase tracking-widest rounded-xl hover:border-[#3D1A12]/30 hover:text-[#3D1A12] transition-colors"
              >
                {t("products.noResultsOutdoor")}
              </button>
            </div>
          </div>
        ) : (
          <>
            <ProductGrid products={currentItems} />
            <Pagination />
          </>
        )}
      </div>
    </div>
  );
};

export default ProductsPage;
