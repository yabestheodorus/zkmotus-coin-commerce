import React, { useState } from "react";
import { GiWaxSeal } from "react-icons/gi";
import {
  TbScan,
  TbShieldCheck,
  TbLock,
  TbKey,
  TbInfoCircle,
  TbAlertCircle,
} from "react-icons/tb";
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
  const [secretFocused, setSecretFocused] = useState(false);
  const [confirmFocused, setConfirmFocused] = useState(false);
  const [accepted, setAccepted] = useState(false);

  // 🔴 If product not found
  if (!product) {
    return (
      <div className="w-full">
        <div className="relative overflow-hidden">
          <div className="pointer-events-none absolute inset-0 opacity-[0.03]">
            <div className="bg-burgundy absolute top-0 right-0 h-64 w-64 translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl" />
          </div>

          <div className="relative p-8 text-center">
            <div className="bg-ink/5 mb-4 inline-flex rounded-full p-4">
              <GiWaxSeal size={40} className="text-ink/30" />
            </div>

            <h2 className="text-ink mb-2 text-xl font-bold">
              Serial Not Recognized
            </h2>
            <p className="text-ink/60 mx-auto mb-4 max-w-xs text-sm">
              The serial number entered does not match any registered item in
              our system.
            </p>

            <div className="bg-parchment/50 border-ink/10 rounded-2xl border p-4 text-left">
              <div className="flex items-start gap-3">
                <TbAlertCircle
                  className="text-burgundy mt-0.5 shrink-0"
                  size={18}
                />
                <p className="text-ink/70 text-xs leading-relaxed">
                  Please double-check the serial number. Only officially
                  registered pieces with valid blockchain certificates can be
                  authenticated. If you believe this is an error, contact
                  support.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 🟢 Normal product view
  return (
    <div className="w-full">
      {/* Background Pattern */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.03]">
        <div className="bg-burgundy absolute top-0 right-0 h-64 w-64 translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 h-64 w-64 -translate-x-1/2 translate-y-1/2 rounded-full bg-yellow-700 blur-3xl" />
      </div>

      <div className="relative p-6">
        {/* Header Section */}
        <div className="mb-6 flex items-center justify-center gap-3">
          <div className="rounded-full bg-yellow-100/50 p-3">
            <GiWaxSeal size={32} className="text-yellow-800" />
          </div>
          <div>
            <h2 className="text-ink text-xl font-bold">Confirm Ownership</h2>
            <p className="text-ink/60 text-sm">Enter your private passphrase</p>
          </div>
        </div>

        {/* Product Display */}
        <div className="mb-6 flex flex-col items-center">
          <div className="border-ink/10 bg-parchment/30 h-40 w-40 overflow-hidden rounded-2xl border shadow-inner">
            <img
              src={product.imageURL?.thumbnail}
              alt={product.name}
              className="h-full w-full object-contain p-2"
            />
          </div>
          <h3 className="font-libre text-ink mt-4 text-lg font-semibold">
            {product.name}
          </h3>
          <p className="text-ink/60 mt-1 max-w-xs text-center text-xs">
            {product.description}
          </p>
          {product.price && (
            <p className="text-burgundy mt-2 text-sm font-medium">
              {formatEther(product.price)} {product.currency}
            </p>
          )}
        </div>

        {/* Passphrase Info Card */}
        <div className="from-burgundy/5 border-burgundy/20 mb-6 rounded-2xl border bg-linear-to-br to-yellow-50/50 p-4">
          <div className="flex items-start gap-3">
            <TbLock className="text-burgundy mt-0.5 shrink-0" size={20} />
            <div className="text-left">
              <h3 className="text-ink mb-2 text-sm font-semibold">
                Your Private Passphrase
              </h3>
              <ul className="text-ink/70 space-y-1.5 text-xs">
                <li className="flex items-start gap-2">
                  <TbKey className="text-burgundy mt-0.5 shrink-0" size={12} />
                  <span>
                    Created during registration • Known{" "}
                    <strong className="text-burgundy">only to you</strong>
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <TbShieldCheck
                    className="text-burgundy mt-0.5 shrink-0"
                    size={12}
                  />
                  <span>
                    Never stored on servers • Used locally to generate proof
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <TbInfoCircle
                    className="text-burgundy mt-0.5 shrink-0"
                    size={12}
                  />
                  <span>Confirms ownership without revealing your secret</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-burgundy/10 text-burgundy border-burgundy/20 mt-3 rounded-xl border p-3 text-center text-xs font-medium">
            ⚠️ If forgotten, ownership cannot be recovered
          </div>
        </div>

        {/* Passphrase Inputs */}
        <div className="mb-6 space-y-4">
          {/* Secret Input */}
          <div>
            <label className="text-ink/60 mb-2 block text-xs font-semibold tracking-wide uppercase">
              Private Passphrase
            </label>
            <div
              className={`relative transition-all ${secretFocused ? "scale-[1.02]" : ""}`}
            >
              <input
                type="password"
                placeholder="Enter your passphrase"
                value={secret}
                onChange={(e) => setSecret(e.target.value)}
                onFocus={() => setSecretFocused(true)}
                onBlur={() => setSecretFocused(false)}
                className="border-ink/20 bg-parchment/30 font-lineseed text-ink focus:border-burgundy/50 focus:ring-burgundy/20 placeholder:text-ink/30 w-full rounded-2xl border-2 px-4 py-3.5 text-center text-sm transition-all outline-none focus:ring-4"
              />
              <div className="text-ink/30 absolute top-1/2 right-4 -translate-y-1/2">
                <TbLock size={18} />
              </div>
            </div>
          </div>

          {/* Confirm Input */}
          <div>
            <label className="text-ink/60 mb-2 block text-xs font-semibold tracking-wide uppercase">
              Confirm Passphrase
            </label>
            <div
              className={`relative transition-all ${confirmFocused ? "scale-[1.02]" : ""}`}
            >
              <input
                type="password"
                placeholder="Re-enter to confirm"
                value={confirmSecret}
                onChange={(e) => setConfirmSecret(e.target.value)}
                onFocus={() => setConfirmFocused(true)}
                onBlur={() => setConfirmFocused(false)}
                className="border-ink/20 bg-parchment/30 font-lineseed text-ink focus:border-burgundy/50 focus:ring-burgundy/20 placeholder:text-ink/30 w-full rounded-2xl border-2 px-4 py-3.5 text-center text-sm transition-all outline-none focus:ring-4"
              />
              <div className="text-ink/30 absolute top-1/2 right-4 -translate-y-1/2">
                <TbKey size={18} />
              </div>
            </div>
          </div>

          {/* Match Indicator */}
          {secret && confirmSecret && (
            <div
              className={`flex items-center justify-center gap-2 rounded-xl py-2 text-xs transition-all ${
                secret === confirmSecret
                  ? "border border-green-700/20 bg-green-50/50 text-green-700"
                  : "border border-amber-700/20 bg-amber-50/50 text-amber-700"
              }`}
            >
              {secret === confirmSecret ? (
                <>
                  <TbShieldCheck size={14} />
                  <span>Passphrases match</span>
                </>
              ) : (
                <>
                  <TbAlertCircle size={14} />
                  <span>Passphrases do not match</span>
                </>
              )}
            </div>
          )}
        </div>

        {/* Acceptance Checkbox */}
        <label className="hover:bg-parchment/30 mb-6 flex cursor-pointer items-start gap-3 rounded-xl p-3 transition-all">
          <input
            type="checkbox"
            checked={accepted}
            onChange={(e) => setAccepted(e.target.checked)}
            className="accent-burgundy border-ink/30 mt-1 h-4 w-4 rounded"
          />
          <span className="text-ink/70 text-xs leading-relaxed">
            I understand this passphrase{" "}
            <strong className="text-ink">cannot be recovered</strong> if lost,
            and that I am solely responsible for keeping it secure.
          </span>
        </label>

        {/* Character Count Hint */}
        {secret.length > 0 && (
          <div className="text-ink/40 mb-4 text-center text-xs">
            {secret.length} characters entered
          </div>
        )}

        {/* Generate Proof Button */}
        <button
          className="bg-burgundy text-parchment flex w-full items-center justify-center gap-2 rounded-2xl px-6 py-4 font-semibold shadow-lg transition-all hover:shadow-xl hover:brightness-110 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
          onClick={handleGenerateProof}
          disabled={
            !secret ||
            !confirmSecret ||
            secret !== confirmSecret ||
            !accepted ||
            loading
          }
        >
          {loading ? (
            <>
              <TbScan size={22} className="animate-spin" />
              <span>Generating Proof...</span>
            </>
          ) : (
            <>
              <GiWaxSeal size={22} />
              <span>Generate Proof</span>
            </>
          )}
        </button>

        {/* Security Badge */}
        <div className="text-ink/40 mt-4 flex items-center justify-center gap-2 text-xs">
          <TbShieldCheck size={14} />
          <span>Zero-Knowledge Verification • Private & Secure</span>
        </div>
      </div>
    </div>
  );
}

export default ProductInfo;
