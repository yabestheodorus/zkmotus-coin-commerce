import { NavLink } from "react-router-dom";
import { TbShoppingBag } from "react-icons/tb";
import { LuHeart } from "react-icons/lu";
import { useShoppingCart } from "../pages/cart/hooks/useShoppingCart";
import WalletConnect from "./WalletConnect";

export default function Navbar() {
  const { items } = useShoppingCart([]);

  return (
    <nav className="fixed top-0 left-0 z-50 w-full bg-white/75 py-6 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center">
        <div className="hidden flex-1 gap-8 text-sm text-neutral-400 md:flex">
          <NavItem to="/provenance" label="Provenance" />
          <NavItem to="/collection" label="Collection" />
          <NavItem to="/authenticity" label="Authenticity" />
          <NavItem to="/verify" label="Verify" />
        </div>

        <NavLink
          to="/"
          className="flex flex-1 items-center justify-center gap-x-3 text-lg font-semibold tracking-wide"
        >
          <img src="/images/logo.png" className="h-12" />
        </NavLink>

        <div className="flex flex-1 items-center justify-end gap-x-1">
          <div className="relative p-2">
            <div className="absolute top-0 right-0 rounded-full bg-rose-400 px-1.5 py-0.5 text-xs text-white">
              2
            </div>
            <LuHeart size={25} />
          </div>

          <label htmlFor="cart-drawer" className="cursor-pointer">
            <div className="relative p-2">
              {items.length === 0 ? (
                ""
              ) : (
                <div className="absolute top-0 right-0 rounded-full bg-rose-400 px-1.5 py-0.5 text-xs text-white">
                  {items.length}
                </div>
              )}

              <TbShoppingBag size={25} />
            </div>
          </label>

          <WalletConnect />
        </div>
      </div>
    </nav>
  );
}

function NavItem({ to, label }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `text-ink text-lg tracking-wide transition ${
          isActive ? "text-red-800" : "hover:text-burgundy"
        }`
      }
    >
      {label}
    </NavLink>
  );
}
