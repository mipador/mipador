import React from "react";

const ProductCardSkeleton: React.FC = () => (
  <div className="flex flex-col animate-pulse">
    {/* Image placeholder */}
    <div className="aspect-[3/4] rounded-xl bg-[#E8E3DF]" />
    {/* Info */}
    <div className="mt-4 flex flex-col gap-2.5">
      <div className="h-2 w-20 rounded-xl bg-[#E8E3DF]" />
      <div className="h-3 w-3/4 rounded-xl bg-[#E8E3DF]" />
      <div className="h-2.5 w-full rounded-xl bg-[#E8E3DF]" />
      <div className="flex items-center justify-between mt-1">
        <div className="h-3 w-16 rounded-xl bg-[#E8E3DF]" />
        <div className="h-2 w-12 rounded-xl bg-[#E8E3DF]" />
      </div>
      <div className="h-9 w-full rounded-xl bg-[#E8E3DF] mt-1" />
    </div>
  </div>
);

export default ProductCardSkeleton;
