import React from "react";
import { formatRoundedBalance } from "../../../../Utils";

// Product item card (simplified per your request)
const ProductItem = ({ product, quantity, serial }) => (
  <div className="border-primaryGray flex items-start gap-4 rounded-xl border bg-white p-4 shadow-sm transition-shadow hover:shadow-md">
    {/* Image placeholder */}
    <img
      src={product.imageURL.thumbnail}
      className="border-primaryGray flex h-full w-20 shrink-0 items-center justify-center overflow-hidden rounded-lg border bg-gray-100 object-contain"
    />

    <div className="min-w-0 flex-1">
      <h3 className="text-burgundy text-base leading-tight font-semibold">
        {product?.name || "Product name"}
      </h3>
      <p className="text-ink/70 mt-1 text-sm">
        Qty: {quantity} ×{" "}
        <span className="font-medium">
          {formatRoundedBalance(product.price)} ETH
        </span>
      </p>
      <div className="mt-2 flex flex-wrap gap-2">
        <span className="bg-parchment text-ink rounded px-2 py-1 text-xs">
          Serial: {serial}
        </span>
      </div>
    </div>
  </div>
);

export default ProductItem;
