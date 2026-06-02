import React from "react";
import { useProductStore } from "../../../store/product.store";
import ProductCardHomePage from "../../products/components/ProductGrid/ProductCardHomePage";
import { Link,useParams } from "react-router-dom";

const SelectedWorksSection: React.FC = () => {
  const { allProducts } = useProductStore();

  const featured = allProducts.filter((p) => p.featured).slice(0, 3);
  const { lang } = useParams();
  const currentLang = lang || "en";
  return (
    <section className="bg-[#F4F4F4] py-20 px-6">
      <div className="max-w-7xl mx-auto">

        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">

          <div>
            <h2 className="text-4xl md:text-5xl font-black text-[#3D1A12] tracking-tighter">
              SELECTED{" "}
              <span className="text-[#3D1A12]/30 italic">WORKS</span>
            </h2>

            <p className="mt-2 text-[#3D1A12]/60 font-bold uppercase tracking-[0.3em] text-[10px]">
              Curated Objects • Made in Morocco
            </p>
          </div>

          <Link
            to={`/${currentLang}/products`}
            className="text-xs font-black uppercase tracking-widest border-b-2 border-[#3D1A12] pb-1 text-[#3D1A12] hover:text-[#4D2A22] hover:border-[#4D2A22] transition-colors"
          >
            Explore the Collection
          </Link>

        </div>

        {featured.length === 0 ? (
          <div className="text-center py-20 bg-white/50 rounded-3xl border border-dashed border-[#3D1A12]/10">
            <p className="text-[#3D1A12]/60 font-medium">
              No pieces have been selected yet.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {featured.map((item) => (
              <ProductCardHomePage key={item.id} product={item} />
            ))}
          </div>
        )}

      </div>
    </section>
  );
};

export default SelectedWorksSection;