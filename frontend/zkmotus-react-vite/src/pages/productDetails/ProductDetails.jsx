import { useEffect, useState } from "react";
import useGetProductDetail from "./hooks/useGetProductDetail";
import { useParams } from "react-router-dom";
import ProductDetailSkeleton from "./components/ProductDetailSkeleton";
import { useShoppingCart } from "../cart/hooks/useShoppingCart";
import { formatEther } from "viem";



export default function ProductDetail() {


  const { id } = useParams();

  const { product } = useGetProductDetail({ productId: id });

  const [activeImage, setActiveImage] = useState(
    product?.imageURL?.thumbnail
  );

  const [qty, setQty] = useState(1);

  const { addToCart } = useShoppingCart();


  useEffect(() => {
    if (product?.imageURL?.thumbnail) {
      setActiveImage(product.imageURL.thumbnail);
    }
  }, [product]);


  if (!product) {
    return <ProductDetailSkeleton />;
  }
  else {


    return (
      <main className=" text-ink">
        <div className="mx-auto max-w-6xl px-6 py-24 grid grid-cols-1 md:grid-cols-2 gap-16">

          {/* Gallery */}
          <div className="space-y-6">
            <img
              src={activeImage}
              alt={product.name}
              className="h-105 object-cover rounded-3xl transition-all duration-300 ease-out
             animate-[fadeIn_.3s_ease-out]"
            />

            {/* Thumbnails */}
            <div className="flex gap-4">
              {product.imageURL.gallery.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(img)}
                  className={`h-20 w-20 overflow-hidden rounded-xl border transition
                  ${activeImage === img
                      ? "border-burgundy"
                      : "border-ink/10 hover:border-ink/30"
                    }`}
                >
                  <img
                    src={img}
                    alt=""
                    className="h-full w-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Meta */}
          <div className="flex flex-col">
            <p className="text-sm uppercase tracking-widest text-ink/40">
              {product.category}
            </p>

            <h1 className="mt-4 font-serif text-3xl md:text-4xl">
              {product.name}
            </h1>

            {/* Review bar */}
            <div className="mt-3 flex items-center gap-3 text-sm text-ink/60">
              <div className="flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i}>★</span>
                ))}
              </div>
              <span className="text-ink/40">4.9 · 128 reviews</span>
            </div>

            <p className="mt-6 max-w-xl text-lg text-ink/70">
              {product.description}
            </p>

            {/* Limited Edition */}
            {product.isLimitedEdition && (
              <div className="mt-8 inline-flex items-center gap-3 text-sm text-burgundy">
                <span className="h-px w-8 bg-burgundy/40" />
                Limited to {product.maxSupply} pieces
              </div>
            )}

            {/* Price */}
            <div className="mt-10 text-xl font-medium">
              {formatEther(product.price)} {product.currency}
            </div>

            {/* Purchase Controls */}
            <div className="mt-10 flex items-center gap-6">

              {/* Quantity spinner */}
              <div className="flex items-center rounded-xl border border-ink/20">
                <button
                  onClick={() => setQty(Math.max(1, qty - 1))}
                  className="px-4 py-2 text-lg hover:cursor-pointer"
                >
                  −
                </button>
                <span className=" w-12 text-center overflow-clip text-ellipsis">{qty}</span>
                <button
                  onClick={() => setQty(qty + 1)}
                  className="px-4 py-2 text-lg hover:cursor-pointer"
                >
                  +
                </button>
              </div>

              {/* Add to cart */}
              <button
                onClick={() => addToCart(product, qty)}
                className="rounded-xl grow bg-burgundy px-8 py-3 text-sm font-medium text-parchment hover:opacity-90 transition hover:cursor-pointer">
                Add to cart
              </button>

              {/* Wishlist */}
              <button
                aria-label="Add to wishlist"
                className="rounded-xl border border-ink/20 px-3 py-2 hover:border-burgundy transition hover:cursor-pointer"
              >
                ♡
              </button>
            </div>

            {/* Divider */}
            <div className="my-12 h-px bg-ink/10" />

            {/* Specifications */}
            <div className="space-y-4 bg-parchment rounded-xl p-6">
              <Spec label="Material" value={product.specification.material} />
              <Spec label="Sizing" value={product.specification.dimensions} />
              <Spec
                label="Serial format"
                value={product.serialConfig.format}
              />
            </div>

            {/* Features */}
            <ul className="mt-10 space-y-3 text-ink/70">
              {product.features.map((f, i) => (
                <li key={i}>— {f}</li>
              ))}
            </ul>

            {/* Authenticity */}
            <div className="mt-14 rounded-2xl border border-burgundy/30 p-6">
              <p className="text-sm uppercase tracking-widest text-ink/40">
                Authenticity
              </p>

              <p className="mt-4 text-lg">
                Verify using zero-knowledge proof.
              </p>

              <p className="mt-2 text-sm text-ink/60">
                Ownership can be proven without revealing identity,
                serial history, or prior transfers.
              </p>
            </div>
          </div>
        </div>
      </main>
    );
  }


}

function Spec({ label, value }) {
  return (
    <div className="flex justify-between text-sm">
      <span className="text-ink/40">{label}</span>
      <span>{value}</span>
    </div>
  );
}
