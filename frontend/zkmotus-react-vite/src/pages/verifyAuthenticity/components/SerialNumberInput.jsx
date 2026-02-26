import React, { useState } from "react";
import {
  TbScan,
  TbNfc,
  TbQrcode,
  TbShieldCheck,
  TbInfoCircle,
  TbFingerprint,
} from "react-icons/tb";

function SerialNumberInput({ refetch, setStep, serialRaw, setSerialRaw }) {
  const [focused, setFocused] = useState(false);

  return (
    <div className="w-full">
      <div className="relative overflow-hidden">
        <div className="relative p-6">
          {/* Header Section */}
          <div className="mb-6 flex items-center justify-center gap-3">
            <div className="bg-burgundy/10 rounded-full p-3">
              <TbScan size={32} className="text-burgundy" />
            </div>
            <div>
              <h2 className="text-ink text-xl font-bold">
                Verify Authenticity
              </h2>
              <p className="text-ink/60 text-sm">
                Enter your product's serial code
              </p>
            </div>
          </div>

          {/* Info Card */}
          <div className="bg-parchment/50 border-ink/10 mb-6 rounded-2xl border p-4">
            <div className="flex items-start gap-3">
              <TbInfoCircle
                className="text-burgundy mt-0.5 shrink-0"
                size={20}
              />
              <div className="text-left">
                <h3 className="text-ink mb-1 text-sm font-semibold">
                  What is a serial number?
                </h3>
                <p className="text-ink/70 text-xs leading-relaxed">
                  A unique identifier assigned to your product during
                  manufacturing. It's cryptographically linked to your item's
                  authenticity certificate on the blockchain.
                </p>
              </div>
            </div>
          </div>

          {/* Serial Input Section */}
          <div className="mb-6">
            <label className="text-ink/60 mb-2 block text-xs font-semibold tracking-wide uppercase">
              Serial Code
            </label>

            <div
              className={`relative transition-all ${focused ? "scale-[1.02]" : ""}`}
            >
              <input
                type="text"
                placeholder="Enter serial code"
                value={serialRaw}
                onChange={(e) => setSerialRaw(e.target.value)}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                className="border-ink/20 bg-parchment/30 font-lineseed text-ink focus:border-burgundy/50 focus:ring-burgundy/20 placeholder:text-ink/30 w-full rounded-2xl border-2 px-4 py-4 text-center text-sm transition-all outline-none focus:ring-4"
              />

              {/* Input Icon */}
              <div className="text-ink/30 absolute top-1/2 right-4 -translate-y-1/2">
                <TbFingerprint size={20} />
              </div>
            </div>
          </div>

          {/* Real-World Protection Info */}
          <div className="mb-6 rounded-2xl border border-yellow-700/20 bg-linear-to-br from-yellow-50/80 to-amber-50/80 p-4">
            <div className="mb-3 flex items-center gap-2">
              <TbShieldCheck className="text-yellow-700" size={18} />
              <h3 className="text-sm font-semibold text-yellow-900">
                How to Find Your Serial
              </h3>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div className="flex flex-col items-center rounded-xl border border-yellow-700/10 bg-white/60 p-3 text-center">
                <TbNfc className="text-burgundy mb-2" size={24} />
                <p className="text-ink mb-1 text-xs font-semibold">NFC Tag</p>
                <p className="text-ink/60 text-[10px]">
                  Tap your phone to read
                </p>
              </div>

              <div className="flex flex-col items-center rounded-xl border border-yellow-700/10 bg-white/60 p-3 text-center">
                <TbQrcode className="text-burgundy mb-2" size={24} />
                <p className="text-ink mb-1 text-xs font-semibold">QR Code</p>
                <p className="text-ink/60 text-[10px]">Scan with camera</p>
              </div>

              <div className="flex flex-col items-center rounded-xl border border-yellow-700/10 bg-white/60 p-3 text-center">
                <TbFingerprint className="text-burgundy mb-2" size={24} />
                <p className="text-ink mb-1 text-xs font-semibold">Engraved</p>
                <p className="text-ink/60 text-[10px]">Physical marking</p>
              </div>
            </div>

            <p className="mt-3 text-center text-[10px] leading-relaxed text-yellow-800/70">
              In real products, serial numbers are embedded in tamper-proof
              mechanisms like NFC chips, holographic stickers, or laser
              engravings to prevent counterfeiting and ensure only genuine items
              can be verified.
            </p>
          </div>

          {/* Submit Button */}
          <button
            className="bg-burgundy text-parchment flex w-full items-center justify-center gap-2 rounded-2xl px-6 py-4 font-semibold shadow-lg transition-all hover:shadow-xl hover:brightness-110 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
            onClick={(e) => {
              refetch();
              setStep(2);
            }}
            disabled={!serialRaw || serialRaw.length < 5}
          >
            <TbScan size={22} />
            <span>Check Product</span>
          </button>

          {/* Security Badge */}
          <div className="text-ink/40 mt-4 flex items-center justify-center gap-2 text-xs">
            <TbShieldCheck size={14} />
            <span>Verified on Blockchain</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SerialNumberInput;
