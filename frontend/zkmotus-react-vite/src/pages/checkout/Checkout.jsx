import { CgSpinner } from "react-icons/cg";
import { MdShoppingCartCheckout } from "react-icons/md";
import { TbInfoCircle, TbWallet } from "react-icons/tb";
import { Link } from "react-router-dom";
import { formatEther } from "viem";
import { formatRoundedBalance } from "../../../Utils";
import { useShoppingCart } from "../cart/hooks/useShoppingCart";
import { useCheckout } from "./useCheckout.jsx";

export default function Checkout() {
  const { items, increaseQty, decreaseQty, removeItem, subtotal } =
    useShoppingCart();

  const {
    shipping,
    errors,
    useDefault,
    updateField,
    toggleDefaultValues,
    validate,
    address,
    isConnected,
    balance,
    submitCheckout,
    isLoading,
  } = useCheckout({ items });

  let connectedAddress = "Connect Wallet";
  if (isConnected && address) {
    // Optional: truncate address
    const addr = address;
    connectedAddress = `${addr.slice(0, 10)}...${addr.slice(-6)}`;
  }

  const ethBalance = 1.284;

  if (items.length === 0) {
    return (
      <div className="text-ink flex min-h-screen items-center justify-center bg-gray-100">
        <div className="text-center">
          <h1 className="mb-4 font-serif text-3xl">Your cart is empty</h1>
          <Link to="/" className="btn btn-primary">
            Browse products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="text-ink font-lineseed min-h-screen bg-white">
      {/* HEADER */}
      <header className="mx-auto max-w-7xl px-6 pt-8 pb-10">
        <h1 className="mb-2 font-serif text-4xl">Checkout</h1>
        <p className="opacity-60">
          Review your items, add shipping, then confirm payment
        </p>
      </header>

      <main className="mx-auto grid max-w-7xl grid-cols-1 gap-14 px-6 pb-32 lg:grid-cols-12">
        {/* ITEMS */}
        <section className="h-fit space-y-6 rounded-3xl border border-black/5 p-8 lg:col-span-7">
          <span className="text-burgundy text-sm tracking-widest uppercase">
            Your Items ({items.length})
          </span>
          <div className="bg-burgundy/60 my-4 h-px w-20" />

          <div className="flex flex-col">
            {items.map((item, idx) => (
              <div key={item.productId}>
                <div className="relative flex gap-6 overflow-hidden rounded-3xl bg-white py-6">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="relative h-36 w-36 object-contain"
                  />

                  <div className="relative flex-1">
                    <h2 className="text-md font-libre font-medium">
                      {item.name}
                    </h2>

                    <p className="mb-6 text-sm opacity-60">
                      {formatEther(item.price)} {item.currency}
                    </p>

                    <div className="flex items-center gap-5">
                      <div className="bg-primaryGray flex items-center rounded-full px-3 py-1 shadow-inner">
                        <button
                          onClick={() => decreaseQty(item.productId)}
                          className="cursor-pointer px-2 opacity-60 hover:opacity-100"
                        >
                          −
                        </button>
                        <span className="w-6 text-center">{item.qty}</span>
                        <button
                          onClick={() => increaseQty(item.productId)}
                          className="cursor-pointer px-2 opacity-60 hover:opacity-100"
                        >
                          +
                        </button>
                      </div>

                      <button
                        onClick={() => removeItem(item.productId)}
                        className="text-burgundy/70 hover:text-burgundy cursor-pointer text-xs tracking-wide uppercase"
                      >
                        Remove
                      </button>
                    </div>
                  </div>

                  <div className="relative self-center pr-8 text-right">
                    <span className="font-jakarta text-burgundy text-2xl">
                      {formatEther(item.price * item.qty)}
                    </span>
                    <span className="font-base text-burgundy text-sm">
                      <br />
                      {item.currency}
                    </span>
                  </div>
                </div>
                {idx !== items.length - 1 && (
                  <div className="via-burgundy/25 my-2 h-px w-full bg-linear-to-r from-transparent to-transparent" />
                )}
              </div>
            ))}
          </div>
        </section>

        {/* RIGHT COLUMN */}
        <aside className="space-y-10 lg:col-span-5">
          {/* SHIPPING */}
          <section className="relative overflow-hidden rounded-3xl border border-black/5 bg-white p-8">
            <div className="relative">
              <span className="text-burgundy text-sm tracking-widest uppercase">
                Shipping
              </span>

              <div className="bg-burgundy/60 my-4 h-px w-20" />

              <h3 className="mb-1 font-serif text-xl">Delivery details</h3>

              <p className="mb-8 text-sm opacity-60">
                Used for delivery and order confirmation
              </p>

              {/* SHIPPING FORM */}
              <div className="space-y-6 rounded-2xl">
                {/* autofill */}
                <label className="flex cursor-pointer items-center gap-3">
                  <input
                    type="checkbox"
                    checked={useDefault}
                    onChange={(e) => toggleDefaultValues(e.target.checked)}
                    className="accent-burgundy h-4 w-4 duration-300"
                  />
                  <span className="text-burgundy/80 text-sm">
                    Fill default shipping values
                  </span>
                </label>

                {/* recipient */}
                <div>
                  <label className="text-burgundy/70 mb-3 block text-xs tracking-wide uppercase">
                    Recipient
                  </label>

                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div>
                      <input
                        value={shipping.firstName}
                        onChange={(e) =>
                          updateField("firstName", e.target.value)
                        }
                        placeholder="First name"
                        className={`w-full rounded-xl border bg-white px-4 py-3.5 duration-300 outline-none ${errors.firstName ? "border-burgundy" : "border-black/5"} focus:ring-primaryAccent/40 focus:ring-2`}
                      />
                      {errors.firstName && (
                        <p className="text-burgundy mt-1 text-xs">Required</p>
                      )}
                    </div>

                    <div>
                      <input
                        value={shipping.lastName}
                        onChange={(e) =>
                          updateField("lastName", e.target.value)
                        }
                        placeholder="Last name"
                        className={`w-full rounded-xl border bg-white px-4 py-3.5 duration-300 outline-none ${errors.lastName ? "border-burgundy" : "border-black/5"} focus:ring-primaryAccent/40 focus:ring-2`}
                      />
                      {errors.lastName && (
                        <p className="text-burgundy mt-1 text-xs">Required</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* address */}
                <div>
                  <label className="text-burgundy/70 mb-3 block text-xs tracking-wide uppercase">
                    Address
                  </label>

                  <div className="mb-4">
                    <input
                      value={shipping.street}
                      onChange={(e) => updateField("street", e.target.value)}
                      placeholder="Street address"
                      className={`w-full rounded-xl border bg-white px-4 py-3.5 duration-300 outline-none ${errors.street ? "border-burgundy" : "border-black/5"} focus:ring-primaryAccent/40 focus:ring-2`}
                    />
                    {errors.street && (
                      <p className="text-burgundy mt-1 text-xs">Required</p>
                    )}
                  </div>

                  <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div>
                      <input
                        value={shipping.city}
                        onChange={(e) => updateField("city", e.target.value)}
                        placeholder="City"
                        className={`w-full rounded-xl border bg-white px-4 py-3.5 duration-300 outline-none ${errors.city ? "border-burgundy" : "border-black/5"} focus:ring-primaryAccent/40 focus:ring-2`}
                      />
                      {errors.city && (
                        <p className="text-burgundy mt-1 text-xs">Required</p>
                      )}
                    </div>

                    <div>
                      <input
                        value={shipping.region}
                        onChange={(e) => updateField("region", e.target.value)}
                        placeholder="Region"
                        className={`w-full rounded-xl border bg-white px-4 py-3.5 duration-300 outline-none ${errors.region ? "border-burgundy" : "border-black/5"} focus:ring-primaryAccent/40 focus:ring-2`}
                      />
                      {errors.region && (
                        <p className="text-burgundy mt-1 text-xs">Required</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <input
                      value={shipping.postalCode}
                      onChange={(e) =>
                        updateField("postalCode", e.target.value)
                      }
                      placeholder="Postal code"
                      className={`w-full rounded-xl border bg-white px-4 py-3.5 duration-300 outline-none ${errors.postalCode ? "border-burgundy" : "border-black/5"} focus:ring-primaryAccent/40 focus:ring-2`}
                    />
                    {errors.postalCode && (
                      <p className="text-burgundy mt-1 text-xs">Required</p>
                    )}
                  </div>
                </div>
              </div>

              <p className="mt-6 flex items-start gap-2 text-xs opacity-50">
                <TbInfoCircle
                  size={20}
                  className="text-burgundy mt-px shrink-0"
                />
                <span>
                  Shipping details are included to mimic a real checkout
                  experience. This is a portfolio demo.
                </span>
              </p>
            </div>
          </section>

          {/* PAYMENT */}
          <section className="bg-parchment text-ink relative overflow-hidden rounded-3xl p-8">
            <div className="relative">
              <span className="text-burgundy text-sm tracking-widest uppercase">
                Payment
              </span>
              <div className="bg-burgundy/60 my-4 h-px w-20" />
              <h3 className="mb-4 font-serif text-xl">Ethereum Wallet</h3>

              <div className="mb-6 flex items-center justify-between rounded-full bg-white px-5 py-3 shadow-sm">
                <div className="flex items-center gap-3">
                  {/* wallet icon */}
                  <div className="text-burgundy bg-primaryAccent/15 flex h-8 w-8 items-center justify-center rounded-full">
                    <TbWallet size={20} />
                  </div>

                  <div className="leading-tight">
                    <span className="text-burgundy/70 block text-xs tracking-wide uppercase">
                      Wallet connected
                    </span>
                    <span className="font-jakarta text-ink text-sm">
                      {connectedAddress}
                    </span>
                  </div>
                </div>

                {/* status dot */}
                <span className="bg-burgundy h-2.5 w-2.5 rounded-full shadow-[0_0_0_4px_rgba(107,30,35,0.15)]" />
              </div>

              <div className="mb-3 flex justify-between text-sm opacity-70">
                <span>Wallet balance</span>
                <span>
                  {balance ? formatRoundedBalance(balance.value) : " "} ETH
                </span>
              </div>

              <div className="mb-8 flex items-baseline justify-between">
                <span className="text-sm opacity-70">Total</span>
                <span className="text-burgundy font-jakarta text-2xl font-semibold">
                  {formatEther(subtotal)} ETH
                </span>
              </div>

              <button
                disabled={isLoading}
                onClick={() => {
                  if (!validate()) return;
                  // proceed to wallet transaction
                  submitCheckout();
                }}
                className="disabled:bg-burgundy/50 shadow-primaryAccent/30 bg-burgundy/80 flex h-14 w-full items-center justify-center gap-x-2 rounded-full font-medium tracking-wide text-white shadow-lg transition hover:scale-[1.01] hover:brightness-110"
              >
                {isLoading ? (
                  <>
                    <CgSpinner className="animate-spin" size={25} />
                    Checkout your Order
                  </>
                ) : (
                  <>
                    <MdShoppingCartCheckout size={25} />
                    Checkout your Order
                  </>
                )}
              </button>

              <p className="mt-4 text-center text-xs opacity-60">
                Transaction confirmation may appear <br /> from your connected
                wallet
              </p>
            </div>
          </section>
        </aside>
      </main>
    </div>
  );
}
