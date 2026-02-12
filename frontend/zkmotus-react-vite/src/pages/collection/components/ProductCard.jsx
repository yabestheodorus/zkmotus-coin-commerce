import React from 'react';
import { TbShoppingBag } from "react-icons/tb";
import { IoMdHeartEmpty } from "react-icons/io";
import { formatEther } from "viem";
import { NavLink } from 'react-router-dom';
import { motion } from "motion/react"
import { animationProperties } from '../../../lib/AnimationProperties';
import { useShoppingCart } from '../../cart/hooks/useShoppingCart';

function ProductCard({ product, grid }) {

  const { addToCart } = useShoppingCart()

  return (
    <motion.div
      variants={animationProperties.item}
      className="
    group flex flex-col rounded-4xl p-6
    bg-white
    border border-ink/10
    hover:border-burgundy/40
    transition-colors
  "
    >
      <NavLink to={`/product/${product._id}`}>
        {/* Header */}
        <div className="flex justify-between items-start">
          <div className="flex flex-col">
            <span className="text-ink/50 font-jakarta text-sm tracking-wide">
              {product.name}
            </span>
            <span className="text-burgundy font-lineseed text-xl mt-1">
              {formatEther(product.price)} ETH
            </span>
          </div>

          <div className="flex items-center gap-2">
            <IoMdHeartEmpty
              className="p-2 w-10 h-10 rounded-full border border-ink/10 text-ink/50 hover:border-burgundy/40 hover:text-burgundy transition"
            />
            <TbShoppingBag
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                addToCart(product);
              }}
              className="p-2 w-10 h-10 rounded-full border border-ink/10 text-ink/50 hover:border-burgundy/40 hover:text-burgundy transition"
            />
          </div>
        </div>

        {/* Image */}
        <div className="mt-6 rounded-3xl p-6 bg-burgundy/3 flex items-end">
          <img
            src={product.imageURL.thumbnail}
            className={` w-auto mx-auto -mb-2 object-contain group-hover:scale-110 duration-300  ${grid === "lg" ? "h-64" : grid === "md" ? "h-43" : "h-24"}`}
            alt={product.name}
          />
        </div>

      </NavLink>
    </motion.div>


  );
}

export default ProductCard;