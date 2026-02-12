import React from "react";


function ProductCardSkeleton() {
  return (
    <div className="h-75 flex flex-col bg-primaryGray rounded-4xl p-6 animate-pulse">
      <div className="flex justify-between">
        <div className="space-y-2">
          <div className="h-4 w-32 bg-gray-200/50 rounded" />
          <div className="h-5 w-20 bg-gray-200/50 rounded" />
        </div>

        <div className="flex gap-2">
          <div className="w-10 h-10 rounded-full bg-gray-200/50" />
          <div className="w-10 h-10 rounded-full bg-gray-200/50" />
        </div>
      </div>

      <div className="grow flex items-end justify-center">
        <div className="h-40 w-40 bg-gray-200/40 rounded-xl" />
      </div>
    </div>
  );
}

export default ProductCardSkeleton
