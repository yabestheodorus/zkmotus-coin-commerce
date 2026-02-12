import { formatEther } from "viem"; // or ethers

export function productToCartItem(product) {
  return {
    id: product._id,
    name: product.name,
    price: Number(formatEther(product.price)),
    qty: 1,
    currency: product.currency,
    imageURL: {
      thumbnail: product.imageURL.thumbnail,
    },
    metadata: {
      slug: product.slug,
      category: product.category,
      isLimitedEdition: product.isLimitedEdition,
    },
  };
}
