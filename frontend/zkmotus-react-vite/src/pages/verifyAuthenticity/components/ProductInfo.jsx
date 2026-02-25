import React from "react";
import { GiWaxSeal } from "react-icons/gi";
import { TbScan } from "react-icons/tb";
import { formatEther } from "viem";

function ProductInfo({
  product,
  secret,
  setSecret,
  confirmSecret,
  handleGenerateProof,
  setConfirmSecret,
  loading,
}) {
  // 🔴 If product not found
  if (!product) {
    return (
      <div className="flex w-full flex-col items-center gap-6 py-10 text-center">
        <GiWaxSeal size={50} className="text-ink/30" />

        <h2 className="text-xl font-semibold">Serial Not Recognized</h2>

        <p className="max-w-xs text-sm opacity-60">
          The serial number entered does not match any registered item.
        </p>

        <div className="bg-ink/5 rounded-xl p-4 text-sm opacity-70">
          Please verify the serial and try again. Only officially registered
          pieces can be authenticated.
        </div>
      </div>
    );
  }

  // 🟢 Normal product view
  return (
    <div className="flex w-full flex-col items-center gap-5">
      {/* Product */}
      <div className="border-ink/10 h-48 w-48 overflow-hidden rounded-2xl border bg-white">
        <img
          src={product.imageURL?.thumbnail}
          alt={product.name}
          className="h-full w-full object-contain"
        />
      </div>

      <h2 className="font-libre text-xl font-medium">{product.name}</h2>

      <p className="max-w-xs text-center text-sm opacity-60">
        {product.description}
      </p>

      <p className="text-lg font-medium">
        {product.price && formatEther(product.price)} {product.currency}
      </p>

      {/* Luxury Ownership Notice */}
      <div className="border-burgundy/30 bg-burgundy/5 mt-4 w-full rounded-xl border p-4 text-sm">
        <p className="text-burgundy mb-4 text-center text-xl font-semibold">
          Private Ownership Confirmation
        </p>

        <ul className="text-ink/70 space-y-1">
          <li>
            • During registration, you created a{" "}
            <span className="text-burgundy font-medium">
              private passphrase
            </span>
          </li>
          <li>
            • This passphrase belongs{" "}
            <span className="text-burgundy font-medium">only to you</span>
          </li>
          <li>
            • Entering it allows you to{" "}
            <span className="text-burgundy font-medium">
              confirm ownership discreetly
            </span>
          </li>
          <li>
            • Your passphrase is{" "}
            <span className="text-burgundy font-medium">
              never stored or visible
            </span>
          </li>
        </ul>

        <div className="bg-burgundy/10 text-burgundy mt-3 rounded-lg p-2 text-center font-medium">
          If forgotten, ownership cannot be confirmed.
        </div>
      </div>

      <label className="mt-3 flex cursor-pointer items-center gap-2 text-sm">
        <input type="checkbox" required className="accent-burgundy" />
        <span className="opacity-70">
          I understand this passphrase cannot be recovered
        </span>
      </label>

      {/* Passphrase input */}
      <input
        type="password"
        placeholder="Enter your private passphrase"
        value={secret}
        onChange={(e) => setSecret(e.target.value)}
        className="border-ink/20 focus:ring-burgundy/40 w-full rounded-xl border px-4 py-3 text-center text-sm outline-none focus:ring-2"
      />

      {/* Confirm passphrase */}
      <input
        type="password"
        placeholder="Re-enter passphrase to confirm"
        value={confirmSecret}
        onChange={(e) => setConfirmSecret(e.target.value)}
        className="border-ink/20 focus:ring-burgundy/40 w-full rounded-xl border px-4 py-3 text-center text-sm outline-none focus:ring-2"
      />

      {/* Subtle hint */}
      <div className="text-center text-xs opacity-60">
        {secret.length > 0 && <span>{secret.length} characters entered</span>}
      </div>

      {/* Action */}
      <button
        className="bg-burgundy text-parchment mt-2 flex items-center gap-2 rounded-full px-6 py-3 font-medium hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50"
        onClick={handleGenerateProof}
        disabled={
          !secret || !confirmSecret || secret !== confirmSecret || loading
        }
      >
        {loading ? (
          <TbScan size={20} className="animate-spin" />
        ) : (
          <GiWaxSeal size={20} />
        )}
        {loading ? "Generating proof..." : "Generate Proof"}
      </button>
    </div>
  );
}

export default ProductInfo;
