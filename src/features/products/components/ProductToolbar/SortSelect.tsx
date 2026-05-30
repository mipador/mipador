import React from "react";
import { ChevronDown } from "lucide-react";
import { useProductStore } from "../../../../store/product.store";

const SortSelect: React.FC = () => {
  const { sortBy, setSortBy } = useProductStore();
  return (
    <div className="relative">
      <select
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value as "featured" | "price-asc" | "price-desc" | "name")}
        className="appearance-none bg-white border-none rounded-xl py-3 pl-5 pr-10 text-[10px] font-black uppercase tracking-widest text-[#3D1A12] focus:ring-1 focus:ring-[#3D1A12]/20 outline-none cursor-pointer"
      >
        <option value="featured">Featured</option>
        <option value="name">Alphabetical</option>
        <option value="price-asc">Price: Low → High</option>
        <option value="price-desc">Price: High → Low</option>
      </select>
      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-[#3D1A12]/40 pointer-events-none" size={13} />
    </div>
  );
};

export default SortSelect;