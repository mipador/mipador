import React from "react";
import { useProductStore } from "../../../../store/product.store";

type SectionProps = {
  title: string;
  children: React.ReactNode;
};

const Section: React.FC<SectionProps> = ({ title, children }) => (
  <div>
    <h4 className="text-[9px] font-black uppercase tracking-[0.3em] text-[#3D1A12]/35 mb-5">
      {title}
    </h4>
    {children}
  </div>
);

type FilterBtnProps = {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
};

const FilterBtn: React.FC<FilterBtnProps> = ({
  active,
  onClick,
  children,
}) => (
  <button
    onClick={onClick}
    className={`text-left text-sm transition-all duration-200 font-bold ${
      active
        ? "text-[#3D1A12] translate-x-1.5"
        : "text-[#3D1A12]/35 hover:text-[#3D1A12]/70"
    }`}
  >
    {children}
  </button>
);

const ProductFilters: React.FC<{ mobile?: boolean }> = ({
  mobile = false,
}) => {
  const {
    selectedCategory,
    setSelectedCategory,
    selectedCollection,
    setSelectedCollection,
    locationFilter,
    setLocationFilter,
    inStockOnly,
    setInStockOnly,
    resetFilters,
    getAllCategories,
    getAllCollections,
  } = useProductStore();

  const categories = getAllCategories();
  const collections = getAllCollections();

  return (
    <div
      className={`flex flex-col gap-8 shrink-0 ${
        mobile
          ? "w-full"
          : "hidden lg:flex w-52 sticky top-28 h-fit"
      }`}
    >
      {/* Space */}
      <Section title="Space">
        <div className="flex flex-col gap-2.5">
          {(["all", "indoor", "outdoor"] as const).map((loc) => (
            <FilterBtn
              key={loc}
              active={locationFilter === loc}
              onClick={() => setLocationFilter(loc)}
            >
              {loc === "all"
                ? "All Spaces"
                : loc === "indoor"
                ? "Indoor"
                : "Outdoor"}
            </FilterBtn>
          ))}
        </div>
      </Section>

      {/* Category */}
      <Section title="Category">
        <div className="flex flex-col gap-2.5">
          {categories.map((cat) => (
            <FilterBtn
              key={cat}
              active={selectedCategory === cat}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </FilterBtn>
          ))}
        </div>
      </Section>

      {/* Collection */}
      <Section title="Collection">
        <div className="flex flex-col gap-2.5">
          {collections.map((col) => (
            <FilterBtn
              key={col}
              active={selectedCollection === col}
              onClick={() => setSelectedCollection(col)}
            >
              {col}
            </FilterBtn>
          ))}
        </div>
      </Section>

      {/* Availability */}
      <Section title="Availability">
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={inStockOnly}
            onChange={(e) => setInStockOnly(e.target.checked)}
            className="w-4 h-4 accent-[#3D1A12]"
          />
          <span className="text-sm font-bold text-[#3D1A12]/60">
            In Stock Only
          </span>
        </label>
      </Section>

      {/* Reset */}
      <button
        onClick={resetFilters}
        className="text-left text-[9px] font-black uppercase tracking-widest text-[#3D1A12]/25 hover:text-[#3D1A12]/50 transition-colors"
      >
        Reset Filters
      </button>
    </div>
  );
};

export default ProductFilters;