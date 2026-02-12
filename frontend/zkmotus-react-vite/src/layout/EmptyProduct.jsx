import React from "react";
import { TbShoppingBag } from "react-icons/tb";


function EmptyProducts() {
  return (
    <div className="col-span-full flex flex-col items-center justify-center py-32 text-center">
      <div className="h-20 w-20 rounded-full bg-gray-200 flex items-center justify-center mb-6">
        <TbShoppingBag className="text-gray-400 w-8 h-8" />
      </div>

      <p className="text-lg font-medium text-gray-700">
        No products available
      </p>
      <p className="mt-2 text-sm text-gray-400 max-w-sm">
        Authentic items will appear here once they are published.
      </p>
    </div>
  );
}

export default EmptyProducts