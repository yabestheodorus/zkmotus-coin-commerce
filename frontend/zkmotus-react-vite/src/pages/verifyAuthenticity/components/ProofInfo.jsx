import React, { useState } from "react";
import { GiWaxSeal } from "react-icons/gi";
import {
  TbScan,
  TbCopy,
  TbCheck,
  TbChevronDown,
  TbChevronUp,
  TbShieldCheck,
  TbInfoCircle,
} from "react-icons/tb";

function ProofInfo({ loading, handleVerifyProof, proof }) {
  const [copied, setCopied] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(proof);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const displayProof = expanded
    ? proof
    : `${proof.slice(0, 100)}...${proof.slice(-600)}`;

  return (
    <div className="w-full">
      <div className="relative overflow-hidden">
        <div className="relative p-6">
          {/* Header Section */}
          <div className="mb-6 flex items-center justify-center gap-3">
            <div
              className={`rounded-full p-3 ${loading ? "bg-burgundy/10" : "bg-yellow-100/50"}`}
            >
              {loading ? (
                <TbScan size={32} className="text-burgundy animate-spin" />
              ) : (
                <GiWaxSeal size={32} className="text-yellow-800" />
              )}
            </div>
            <div>
              <h2 className="text-ink text-xl font-bold">
                {loading ? "Generating Proof" : "Proof Generated"}
              </h2>
              <p className="text-ink/60 text-sm">
                {loading ? "Please wait..." : "Ready for verification"}
              </p>
            </div>
          </div>

          {/* Info Card */}
          {!loading && (
            <div className="bg-parchment/50 border-ink/10 mb-6 rounded-2xl border p-4">
              <div className="flex items-start gap-3">
                <TbInfoCircle
                  className="text-burgundy mt-0.5 flex-shrink-0"
                  size={20}
                />
                <div className="text-left">
                  <h3 className="text-ink mb-1 text-sm font-semibold">
                    What is this proof?
                  </h3>
                  <p className="text-ink/70 text-xs leading-relaxed">
                    This cryptographic proof verifies your product's
                    authenticity without revealing your secret. It contains
                    encrypted evidence that can be validated on-chain while
                    keeping your data private.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Proof Display Box */}
          <div className="mb-6">
            <div className="mb-2 flex items-center justify-between">
              <label className="text-ink/60 text-xs font-semibold tracking-wide uppercase">
                Generated Proof
              </label>
              {!loading && proof && (
                <button
                  onClick={handleCopy}
                  className="text-ink/60 hover:text-burgundy hover:bg-burgundy/5 flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-medium transition-all"
                >
                  {copied ? (
                    <>
                      <TbCheck size={14} className="text-green-600" />
                      <span className="text-green-600">Copied!</span>
                    </>
                  ) : (
                    <>
                      <TbCopy size={14} />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              )}
            </div>

            <div className="relative">
              <div className="bg-ink/95 font-lineseed text-parchment/90 border-ink/20 max-h-64 min-h-32 overflow-y-auto rounded-2xl border p-4 text-xs shadow-inner">
                {loading ? (
                  <div className="flex h-24 items-center justify-center gap-2">
                    <div
                      className="bg-burgundy h-2 w-2 animate-bounce rounded-full"
                      style={{ animationDelay: "0ms" }}
                    />
                    <div
                      className="bg-burgundy h-2 w-2 animate-bounce rounded-full"
                      style={{ animationDelay: "150ms" }}
                    />
                    <div
                      className="bg-burgundy h-2 w-2 animate-bounce rounded-full"
                      style={{ animationDelay: "300ms" }}
                    />
                  </div>
                ) : (
                  <p className="break-all whitespace-pre-wrap">
                    {displayProof}
                  </p>
                )}
              </div>

              {/* Expand/Collapse Button */}
              {!loading && proof && (
                <button
                  onClick={() => setExpanded(!expanded)}
                  className="bg-ink/80 hover:bg-ink text-parchment/70 hover:text-parchment absolute right-2 bottom-2 rounded-xl p-2 transition-all"
                >
                  {expanded ? (
                    <TbChevronUp size={16} />
                  ) : (
                    <TbChevronDown size={16} />
                  )}
                </button>
              )}
            </div>
          </div>

          {/* Proof Stats */}
          {!loading && proof && (
            <div className="mb-6 grid grid-cols-3 gap-3">
              <div className="bg-parchment/50 border-ink/10 rounded-xl border p-3 text-center">
                <p className="text-ink/50 mb-1 text-xs">Format</p>
                <p className="text-ink text-sm font-semibold">ABI-Encoded</p>
              </div>
              <div className="bg-parchment/50 border-ink/10 rounded-xl border p-3 text-center">
                <p className="text-ink/50 mb-1 text-xs">Length</p>
                <p className="text-ink text-sm font-semibold">
                  {proof.length} chars
                </p>
              </div>
              <div className="bg-parchment/50 border-ink/10 rounded-xl border p-3 text-center">
                <p className="text-ink/50 mb-1 text-xs">Status</p>
                <p className="text-sm font-semibold text-green-700">Valid</p>
              </div>
            </div>
          )}

          {/* Verify Button */}
          <button
            disabled={loading || !proof}
            className="bg-burgundy text-parchment flex w-full items-center justify-center gap-2 rounded-2xl px-6 py-4 font-semibold shadow-lg transition-all hover:shadow-xl hover:brightness-110 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
            onClick={handleVerifyProof}
          >
            <TbShieldCheck size={22} />
            <span>{loading ? "Generating..." : "Verify Proof on Chain"}</span>
          </button>

          {/* Security Badge */}
          {!loading && (
            <div className="text-ink/40 mt-4 flex items-center justify-center gap-2 text-xs">
              <TbShieldCheck size={14} />
              <span>Secured by Zero-Knowledge Cryptography</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProofInfo;
