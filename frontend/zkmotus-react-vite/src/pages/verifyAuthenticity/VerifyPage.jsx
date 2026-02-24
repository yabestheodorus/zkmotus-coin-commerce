import { useState } from "react";
import { GiWaxSeal } from "react-icons/gi";
import { TbScan, TbLock } from "react-icons/tb";
import useVerifyAuthenticity from "./hooks/useVerifyAuthenticity";
import { formatEther } from "viem";

export default function VerifyPage() {
  const [step, setStep] = useState(1); // 1–4

  const { product, isLoading, refetch, isFetching, serialRaw, setSerialRaw } =
    useVerifyAuthenticity();

  const [secret, setSecret] = useState("");
  const [confirmSecret, setConfirmSecret] = useState("");
  const [loading, setLoading] = useState(false);

  // Dummy product
  const dummyProduct = {
    name: "Knits ♦ Onyx",
    description: "Limited serialized wallet with zero-knowledge authenticity.",
    image: "/images/products/ZKMotus_knits_onyx.png",
    price: "0.95",
    currency: "ETH",
    serialExample: "ZKM-KNT-O-2026-0001",
  };

  // Handlers
  const handleCheckSerial = () => {
    setProduct(dummyProduct);
  };

  // Step 2: Generate proof
  const handleGenerateProof = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep(3);
    }, 3000);
  };

  // Step 3: Verify proof
  const handleVerifyProof = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep(4);
    }, 3000);
  };
  return (
    <div className="bg-parchment font-lineseed text-ink flex min-h-screen flex-col items-center px-4 py-8">
      {/* Step Card */}
      <div className="flex w-full max-w-xl flex-col items-center gap-6 rounded-3xl bg-white p-6 shadow-2xl transition-all duration-500">
        {/* Step 1: Placeholder + Serial Input */}
        {step === 1 && (
          <div className="flex w-full flex-col items-center gap-6 text-center">
            <div className="bg-ink/10 flex h-48 w-48 items-center justify-center rounded-2xl text-6xl">
              ?
            </div>
            <p className="text-sm opacity-60">
              Enter a serial code to verify your item.
            </p>
            <input
              type="text"
              placeholder="Enter serial code"
              value={serialRaw}
              onChange={(e) => setSerialRaw(e.target.value)}
              className="border-ink/20 focus:ring-burgundy/40 w-full rounded-xl border px-4 py-3 text-center text-sm outline-none focus:ring-2"
            />
            <button
              className="bg-burgundy text-parchment flex items-center gap-2 rounded-full px-6 py-3 font-medium hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50"
              onClick={(e) => {
                refetch();
                setStep(2);
              }}
              disabled={!serialRaw}
            >
              <TbScan size={20} /> Check Product
            </button>
          </div>
        )}

        {/* Step 2: Product Info + Secret Input */}
        {step === 2 && product && (
          <div className="flex w-full flex-col items-center gap-5">
            {/* Product */}
            <div className="border-ink/10 h-48 w-48 overflow-hidden rounded-2xl border bg-white">
              <img
                src={product.imageURL.thumbnail}
                alt={product.name}
                className="h-full w-full object-contain"
              />
            </div>

            <h2 className="font-libre text-xl font-medium">{product.name}</h2>
            <p className="max-w-xs text-center text-sm opacity-60">
              {product.description}
            </p>
            <p className="text-lg font-medium">
              {formatEther(product.price)} {product.currency}
            </p>

            {/* Warning */}
            <div className="border-burgundy/30 bg-burgundy/5 mt-4 w-full rounded-xl border p-4 text-sm">
              <p className="text-burgundy mb-2 text-center font-medium">
                This secret is{" "}
                <span className="underline">your only proof</span>
              </p>

              <ul className="text-ink/70 space-y-1">
                <li>
                  • It is a{" "}
                  <span className="text-burgundy font-medium">
                    private phrase
                  </span>{" "}
                  known only to you
                </li>
                <li>
                  • It is{" "}
                  <span className="text-burgundy font-medium">
                    combined with the product serial
                  </span>
                </li>
                <li>
                  • Together they create a{" "}
                  <span className="text-burgundy font-medium">
                    cryptographic seal
                  </span>
                </li>
                <li>
                  • That seal is what proves this item is{" "}
                  <span className="text-burgundy font-medium">authentic</span>
                </li>
                <li>
                  •{" "}
                  <span className="text-burgundy font-medium">
                    We never store this secret
                  </span>{" "}
                  anywhere in our system
                </li>
              </ul>

              <div className="bg-burgundy/10 text-burgundy mt-3 rounded-lg p-2 text-center font-medium">
                Lost secret = lost proof forever
              </div>
            </div>

            <label className="mt-3 flex cursor-pointer items-center gap-2 text-sm">
              <input type="checkbox" required className="accent-burgundy" />
              <span className="opacity-70">
                I understand this secret cannot be recovered
              </span>
            </label>

            {/* Secret input */}
            <input
              type="password"
              placeholder="Create your private seal phrase"
              value={secret}
              onChange={(e) => setSecret(e.target.value)}
              className="border-ink/20 focus:ring-burgundy/40 w-full rounded-xl border px-4 py-3 text-center text-sm outline-none focus:ring-2"
            />

            {/* Confirm secret */}
            <input
              type="password"
              placeholder="Confirm private seal phrase"
              value={confirmSecret}
              onChange={(e) => setConfirmSecret(e.target.value)}
              className="border-ink/20 focus:ring-burgundy/40 w-full rounded-xl border px-4 py-3 text-center text-sm outline-none focus:ring-2"
            />

            {/* Lightweight hint (not validation) */}
            <div className="text-center text-xs opacity-60">
              {secret.length > 0 && (
                <span>Length: {secret.length} characters</span>
              )}
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
              {loading ? "Registering authenticity…" : "Seal Authenticity"}
            </button>
          </div>
        )}

        {/* Step 3: Proof Generated + Verify */}
        {step === 3 && (
          <div className="flex w-full flex-col items-center gap-4 text-center">
            {loading ? (
              <>
                <TbScan size={40} className="text-burgundy animate-spin" />
                <p className="text-sm opacity-70">Verifying proof...</p>
              </>
            ) : (
              <>
                <GiWaxSeal size={40} className="text-yellow-800" />
                <p className="text-sm opacity-70">
                  Proof generated successfully.
                </p>
                <button
                  className="bg-burgundy text-parchment flex items-center gap-2 rounded-full px-6 py-3 font-medium hover:brightness-110"
                  onClick={handleVerifyProof}
                >
                  <TbScan size={20} /> Verify Proof
                </button>
              </>
            )}
          </div>
        )}

        {/* Step 4: Verified */}
        {step === 4 && (
          <div className="flex w-full flex-col items-center gap-6 text-center">
            <GiWaxSeal size={50} className="animate-pulse text-yellow-800" />
            <h2 className="text-xl font-semibold">Verified!</h2>
            <p className="text-sm opacity-70">
              Ownership and authenticity confirmed privately.
            </p>

            {/* ZK Explanation */}
            <div className="bg-ink/5 space-y-2 rounded-2xl p-4 text-left text-sm">
              <p>
                <span className="font-medium">Zero-Knowledge Proof:</span> Your
                ownership is proven without revealing your private data.
              </p>
              <p>
                <span className="font-medium">Privacy Preserved:</span> Only the
                authenticity is verified, your identity stays confidential.
              </p>
              <p>
                <span className="font-medium">Counterfeit Protection:</span>{" "}
                Each item is cryptographically registered, so fake products
                cannot pass verification.
              </p>
              <p className="text-ink/60 italic">
                This ensures secure verification for luxury items, collectibles,
                and limited editions.
              </p>
            </div>

            <button
              className="bg-burgundy text-parchment mt-4 rounded-full px-6 py-3 font-medium hover:brightness-110"
              onClick={() => setStep(1)}
            >
              Verify Another Item
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
