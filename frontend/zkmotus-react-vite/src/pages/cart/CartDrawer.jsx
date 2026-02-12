import { useState } from "react";
import CartItem from "./CartItem";
import { useShoppingCart } from "./hooks/useShoppingCart";
import { formatEther } from "viem";
import { FiShoppingCart } from "react-icons/fi";
import { NavLink } from "react-router-dom";
import { TbArrowRight } from "react-icons/tb";
export default function CartDrawer() {
  const [open, setOpen] = useState(false);

  const {
    items,
    subtotal,
    increaseQty,
    decreaseQty,
    removeItem,
  } = useShoppingCart([]);


  return (
    <div className="drawer drawer-end">
      <input id="cart-drawer" type="checkbox" className="drawer-toggle" />

      <div className="drawer-side z-50">
        <label htmlFor="cart-drawer" aria-label="close sidebar" className="drawer-overlay bg-black/40" />
        <aside className="w-105 bg-white p-6 flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-serif">Shopping Cart</h2>
            <button
              className="btn btn-sm btn-ghost"

              onClick={() => setOpen(false)}
            >
              ✕
            </button>
          </div>

          <div className="my-4 h-px bg-ink/10" />

          {/* Cart items */}
          {items.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-6">
              {/* Luxury Icon/Illustration */}
              <div className="w-32 h-32 mb-6 relative flex items-center justify-center">
                <div className="absolute inset-0 rounded-full bg-burgundy/10 blur-3xl" />
                <FiShoppingCart size={95} className="text-burgundy" />
              </div>

              {/* Heading */}
              <h3 className="text-xl font-libre mb-2 text-burgundy">Your cart is empty</h3>

              {/* Subtitle */}
              <p className="text-sm opacity-70 mb-6 max-w-xs">
                Add some luxury items to see them here. Each product is verified and ready for a secure checkout.
              </p>

              {/* Browse button */}
              <label htmlFor="cart-drawer" className="btn rounded-full bg-burgundy px-6 py-3 text-parchment font-medium hover:brightness-110 cursor-pointer">
                Browse Products
              </label>

              {/* Ornaments */}
              <div className="absolute bottom-6 right-6 w-24 h-24 bg-burgundy/10 rounded-full blur-2xl" />
              <div className="absolute top-4 left-6 w-20 h-20 bg-burgundy/20 rounded-full blur-3xl" />
            </div>
          ) : (
            <div className="flex-1 space-y-6 overflow-y-auto">
              {items.map(item => (
                <CartItem
                  key={item.productId}
                  item={item}
                  onIncrease={() => increaseQty(item.productId)}
                  onDecrease={() => decreaseQty(item.productId)}
                  onRemove={() => removeItem(item.productId)}
                />
              ))}
            </div>
          )}

          <div className="my-6 h-px bg-ink/10" />

          {/* Summary */}
          <div className="space-y-4">
            <div className="flex justify-between text-sm">
              <span>Subtotal</span>
              <span>{formatEther(subtotal)} ETH</span>
            </div>


            <NavLink to={"/checkout"} >
              <button onClick={() => { setOpen(false) }} className="w-full flex items-center justify-center gap-x-1 cursor-pointer rounded-xl bg-burgundy py-3 text-sm font-medium text-parchment duration-300 hover:opacity-90">
                <TbArrowRight size={20} strokeWidth={3} />Checkout
              </button>
            </NavLink>

          </div>
        </aside>
      </div>
    </div>
  );
}


