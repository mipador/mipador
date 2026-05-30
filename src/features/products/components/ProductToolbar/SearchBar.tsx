import React from "react";
import { Search, X } from "lucide-react";
import { useProductStore } from "../../../../store/product.store";

const SearchBar: React.FC = () => {
  const { searchQuery, setSearchQuery } = useProductStore();
  return (
    <div className="relative w-full md:w-72 group">
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#3D1A12]/35 group-focus-within:text-[#3D1A12] transition-colors" size={15} />
      <input
        type="text"
        placeholder="Search by name, material, collection..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full bg-white border-none rounded-xl py-3 pl-11 pr-10 text-sm focus:ring-1 focus:ring-[#3D1A12]/20 outline-none placeholder:text-[#3D1A12]/30 text-[#3D1A12]"
      />
      {searchQuery && (
        <button onClick={() => setSearchQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2">
          <X size={13} className="text-[#3D1A12]/40 hover:text-[#3D1A12]" />
        </button>
      )}
    </div>
  );
};

export default SearchBar;