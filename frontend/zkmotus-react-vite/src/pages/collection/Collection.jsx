import React from "react";
import { TbShoppingBag } from "react-icons/tb";
import ProductCard from "./components/ProductCard";
import CategoryCard from "./components/CategoryCard";
import useGetRecommendedProduct from "./hooks/useGetRecommendedProduct";
import Ownership from "./components/Ownership";
import ProductCardSkeleton from "./components/ProductCardSkeleton";
import { motion } from "framer-motion";
import { animationProperties } from "../../lib/AnimationProperties";

function Collection(props) {
  const { products, isLoading } = useGetRecommendedProduct();

  const categories = [
    {
      label: "Bags",
      name: "handbag",
      imageURL: "/images/products/ZKMotus_Flux_noir.png",
    },
    {
      label: "Shoes",
      name: "sneakers",
      imageURL: "/images/products/ZKMotus_onyx_signature.png",
    },
    {
      label: "Wallet",
      name: "wallet",

      imageURL: "/images/products/ZKMotus_knits_zero.png",
    },
    {
      label: "T-Shirt",
      name: "tshirt",

      imageURL: "/images/products/ZKMotus_aether_rem.png",
    },
  ];

  const renderProducts = () => {
    if (isLoading) {
      return Array.from({ length: 6 }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ));
    }

    if (!products || products.length === 0) {
      return JSON.stringify(products);
    }

    return products.map((product) => (
      <ProductCard key={product._id} product={product} />
    ));
  };

  return (
    <section className="font-libre mb-24 flex flex-col gap-8">
      <motion.div
        variants={animationProperties.fade}
        initial="hidden"
        animate="visible"
        className="relative h-160 w-full overflow-hidden rounded-3xl bg-[#F5E7C6]"
      >
        <img
          src="/images/arrow.svg"
          className="absolute right-45 bottom-75 w-45"
        />
        <div className="font-playwrite absolute right-8 bottom-100 font-medium">
          Premium Leather
        </div>

        <img
          src="/images/arrow.svg"
          className="absolute right-135 bottom-0 w-45 rotate-210"
        />
        <div className="font-playwrite absolute right-185 bottom-18 font-medium">
          Custom Compound
        </div>

        <img
          src="/images/banners/banner2.png"
          className="absolute right-0 z-10 h-full"
        />

        <div className="font-libre absolute z-20 flex h-full max-w-1/2 flex-col gap-y-6 p-12 text-5xl font-[900] text-slate-800 md:text-6xl">
          Quietly Exceptional
          <span className="text-primaryAccent font-lineseed w-3/4 text-2xl font-[100]">
            Designed for everyday elegance, where refined craftsmanship meets
            effortless style
          </span>
        </div>

        <div className="font-bitcount absolute top-8 right-8 rounded-lg bg-black px-4 py-2 text-4xl text-white">
          20% OFF
        </div>

        <div className="absolute bottom-16 left-16 z-20 flex h-56 w-56 flex-col rounded-xl bg-white/65 p-2 backdrop-blur-lg">
          <img src="/images/banners/shoe1.png" className="w-full" />
          <h4 className="mx-4 mb-2 text-sm">ZKMotus Onyx Signature</h4>
          <h4 className="font-jakarta mx-4 text-sm font-semibold line-through">
            0.0054 ETH
          </h4>
          <h4 className="text-primaryAccent font-jakarta mx-4 text-sm font-semibold">
            0.0043 ETH
          </h4>
          <TbShoppingBag className="absolute right-6 bottom-6 h-10 w-10 rounded-full bg-gray-300 p-2 text-gray-800" />
        </div>

        <p className="absolute bottom-0 left-6 text-[280px] font-extrabold tracking-tighter text-gray-400/20">
          NEW ARRIVAL
        </p>
      </motion.div>

      <div className="flex flex-col">
        <h2 className="mb-8 text-5xl font-semibold"> Categories</h2>
        <motion.div
          variants={animationProperties.container}
          initial="hidden"
          animate="visible"
          className="mb-16 flex w-full gap-6"
        >
          <motion.div variants={animationProperties.fade}>
            <CategoryCard category={categories[0]} />
          </motion.div>
          <motion.div variants={animationProperties.fade}>
            <CategoryCard category={categories[1]} />
          </motion.div>

          <motion.div
            variants={animationProperties.fade}
            className="relative grow rounded-3xl bg-[#E8D1C5]"
          >
            <h4 className="absolute top-8 left-8 max-w-1/2 text-5xl leading-15">
              Exclusive Collections
            </h4>
            <div className="absolute top-42 left-9 h-0.5 w-25 rounded-full bg-gray-500" />
            <h4 className="font-lineseed text-primaryAccent absolute top-42 left-9 max-w-1/2 text-xl leading-15">
              premium, curated sets.
            </h4>

            <img
              src="/images/banners/banner7.png"
              className="absolute right-4 bottom-0 h-86"
            />
          </motion.div>
        </motion.div>

        <motion.div
          variants={animationProperties.container}
          initial="hidden"
          animate="visible"
          className="mb-16 flex w-full gap-6"
        >
          <motion.div
            variants={animationProperties.fade}
            className="relative grow rounded-3xl bg-[#CDB885]"
          >
            <h4 className="absolute top-8 right-8 max-w-1/2 text-right text-5xl leading-15">
              Collector’s Edition
            </h4>
            <div className="absolute top-42 right-9 h-0.5 w-25 rounded-full bg-gray-500" />
            <h4 className="font-lineseed text-primaryAccent absolute top-42 right-9 max-w-1/2 text-xl leading-15">
              serialized or rare items.
            </h4>

            <img
              src="/images/banners/banner8.png"
              className="absolute bottom-0 left-4 h-86"
            />
          </motion.div>

          <motion.div variants={animationProperties.fade}>
            <CategoryCard category={categories[2]} />
          </motion.div>

          <motion.div variants={animationProperties.fade}>
            <CategoryCard category={categories[3]} />
          </motion.div>
        </motion.div>
      </div>

      <div className="mb-8 flex flex-col items-center">
        <h2 className="text-primaryAccent font-playwrite -ml-36 text-5xl">
          Guaranteed Genuine
        </h2>
        <h2 className="ml-36 text-6xl text-gray-700">Completely private.</h2>
        <h2 className="mt-4">
          {" "}
          Each product is cryptographically verified as authentic, while keeping
          your ownership private.
        </h2>
      </div>

      <h2 className="mb-8 text-5xl font-semibold">Recommended For You</h2>

      <motion.div
        key={products?.length} // IMPORTANT: re-trigger on data load
        variants={animationProperties.container}
        initial="hidden"
        animate={isLoading ? "hidden" : "visible"}
        className="grid grid-cols-4 gap-6"
      >
        {renderProducts()}
      </motion.div>
      <Ownership />
    </section>
  );
}

export default Collection;
