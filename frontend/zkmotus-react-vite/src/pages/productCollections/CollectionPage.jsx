import { useState } from "react";
import useGetProductCollection from "./hooks/useGetProductCollection";
import { PiGridFourFill } from "react-icons/pi";
import { PiGridNineFill } from "react-icons/pi";
import { TbRectangleFilled } from "react-icons/tb";
import ProductCard from "../collection/components/ProductCard";
import ProductCardSkeleton from "../collection/components/ProductCardSkeleton";
import { motion } from "framer-motion";

import { animationProperties } from "../../lib/AnimationProperties";
import { NavLink } from "react-router-dom";
import { FaChevronRight } from "react-icons/fa";

export default function CollectionPage() {
  const { products, isLoading, category, categories, categoryLoading } =
    useGetProductCollection();

  const [grid, setGrid] = useState("md"); // sm | md | lg
  const [sort, setSort] = useState("latest");

  const productSorted = products.sort((a, b) => {
    if (sort === "price-asc") return a.price - b.price;
    if (sort === "price-desc") return b.price - a.price;
    return b.id - a.id;
  });

  const renderProducts = () => {
    if (isLoading) {
      return Array.from({ length: 6 }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ));
    }

    return products.map((product) => (
      <ProductCard grid={grid} key={product._id} product={product} />
    ));
  };

  return (
    <div className="text-ink px-6 py-10">
      <div className="mx-auto max-w-7xl">
        {/* Breadcrumbs */}
        <nav className="text-md mb-6">
          <ol className="text-ink/50 flex items-center gap-2">
            <li>
              <NavLink to="/" className="hover:text-ink transition">
                Home
              </NavLink>
            </li>

            <li className="opacity-40">
              <FaChevronRight size={15} />
            </li>

            <li>
              <NavLink to="/collection" className="hover:text-ink transition">
                Collection
              </NavLink>
            </li>

            {category && (
              <>
                <li className="opacity-40">
                  <FaChevronRight size={15} />
                </li>

                <li className="text-burgundy font-medium">{category}</li>
              </>
            )}
          </ol>
        </nav>

        {/* Top Bar */}
        <div className="mb-8 flex items-center justify-between">
          <p className="text-sm opacity-60">
            Showing {productSorted.length} of {products.length} products
          </p>

          <div className="flex items-center gap-4">
            {/* Grid Toggle */}
            <div className="border-ink/10 flex items-center overflow-hidden rounded-full border">
              <button
                onClick={() => setGrid("sm")}
                className={`cursor-pointer px-2 py-1 text-sm ${grid === "sm" ? "bg-gray-200" : ""}`}
              >
                <PiGridNineFill size={20} />
              </button>
              <button
                onClick={() => setGrid("md")}
                className={`cursor-pointer px-2 py-1 text-sm ${grid === "md" ? "bg-gray-200" : ""}`}
              >
                <PiGridFourFill size={20} />
              </button>
              <button
                onClick={() => setGrid("lg")}
                className={`cursor-pointer px-2 py-1 text-sm ${grid === "lg" ? "bg-gray-200" : ""}`}
              >
                <TbRectangleFilled size={20} />
              </button>
            </div>

            {/* Sort */}
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="border-ink/10 rounded-full border bg-white px-3 py-1 text-sm"
            >
              <option value="latest">Latest</option>
              <option value="price-asc">Price: Low → High</option>
              <option value="price-desc">Price: High → Low</option>
            </select>
          </div>
        </div>

        {/* Layout */}
        <div className="grid grid-cols-12 gap-10">
          {/* Filters */}
          <aside className="col-span-12 space-y-10 md:col-span-3">
            <div>
              <h3 className="mb-4 text-sm font-medium">Category</h3>

              {categoryLoading ? (
                <div className="flex flex-wrap gap-2">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div
                      key={i}
                      className="bg-ink/10 h-8 w-20 animate-pulse rounded-full"
                    />
                  ))}
                </div>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {categories.map((cat) => {
                    const active = category === cat.value;

                    return (
                      <NavLink
                        key={cat.value}
                        to={`/collection/${cat.value}`}
                        className={`rounded-full border px-4 py-1.5 text-sm transition ${
                          active
                            ? "bg-burgundy text-parchment border-burgundy"
                            : "text-ink/70 border-ink/15 hover:border-burgundy/40 hover:text-burgundy bg-white"
                        } `}
                      >
                        {cat.label}
                      </NavLink>
                    );
                  })}
                </div>
              )}
            </div>

            <div>
              <h3 className="mb-4 text-sm font-medium">Price</h3>
              <input type="range" className="w-full" />
            </div>

            <div>
              <h3 className="mb-4 text-sm font-medium">Availability</h3>
              <label className="flex items-center gap-2 text-sm opacity-70">
                <input type="checkbox" /> In stock
              </label>
            </div>
          </aside>

          {/* Product Grid */}

          <motion.div
            key={products.length}
            initial="hidden"
            animate="visible"
            variants={animationProperties.container}
            className={`col-span-12 grid gap-6 md:col-span-9 ${grid === "sm" && "grid-cols-2 md:grid-cols-4"} ${grid === "md" && "grid-cols-2 md:grid-cols-3"} ${grid === "lg" && "grid-cols-1 md:grid-cols-2"} `}
          >
            {renderProducts()}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
