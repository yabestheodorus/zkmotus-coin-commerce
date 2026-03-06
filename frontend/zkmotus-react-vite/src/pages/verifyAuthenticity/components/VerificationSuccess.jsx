// components/VerificationSuccess.jsx
import {
  TbShieldCheck,
  TbDownload,
  TbCopy,
  TbClock,
  TbHash,
  TbFingerprint,
  TbLock,
} from "react-icons/tb";
import { GiWaxSeal, GiConfirmed } from "react-icons/gi";

export default function VerificationSuccess({
  serialRaw = "LUX-2024-8842",
  productName = "Limited Edition Chronograph",
  verificationId = "0x7a3f...9c2e",
  commitmentHash = "0x4d2f8ac2655665139bd734b20b5fc4f1753f965b7ca2e4430d3dcd4cf1beba89a5",
  timestamp = new Date().toLocaleString("en-US", {
    dateStyle: "medium",
    timeStyle: "medium",
  }),
  onDownload = () => {},
  onCopy = () => {},
  imageUrl = "",
}) {
  return (
    <div className="font-lineseed text-ink flex flex-col items-center">
      {/* Certificate Card */}
      <div className="border-ink/10 w-full max-w-2xl overflow-hidden rounded-2xl border bg-white shadow-xl">
        {/* Header: ZKMotus Branding */}
        <header className="border-burgundy border-b-2 bg-white px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo + Brand */}
            <div className="flex items-center gap-3">
              <div className="bg-burgundy/10 rounded-lg p-1">
                <img src="/images/logo.png" className="h-10 w-10" />
              </div>
              <div>
                <h1 className="text-ink text-lg font-bold tracking-tight">
                  ZKMotus
                </h1>
                <p className="text-ink/60 -mt-0.5 text-xs">
                  Identity Verification
                </p>
              </div>
            </div>

            {/* Certificate Badge */}
            <div className="flex items-center gap-2 text-right">
              <GiWaxSeal className="h-8 w-8 text-yellow-700" />
              <div>
                <p className="text-burgundy text-xs font-semibold">
                  Certificate
                </p>
                <p className="text-ink/50 text-[10px]">Authenticity Verified</p>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="space-y-6 p-6">
          {/* Success Header */}
          <div className="border-ink/10 border-b pb-4 text-center">
            <div className="mb-3 inline-flex items-center justify-center gap-2 rounded-full bg-green-50 px-4 py-1.5 text-green-700">
              <GiConfirmed className="h-5 w-5" />
              <span className="text-sm font-medium">
                Verification Successful
              </span>
            </div>
            <h2 className="text-ink text-xl font-bold">
              Certificate of Authenticity
            </h2>
            <p className="text-ink/60 mt-1 text-sm">
              Zero-Knowledge Proof Verified On-Chain
            </p>
          </div>

          {/* Product Summary */}
          <div className="border-ink/10 rounded-xl border bg-gray-50 p-4">
            <div className="flex items-center gap-4">
              <div className="bg-burgundy/10 flex-shrink-0 rounded-lg p-1.5">
                <img src={imageUrl} className="w-24" />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="text-ink font-semibold">{productName}</h3>
                <p className="text-ink/60 mt-0.5 text-sm">
                  Serial Number:{" "}
                  <span className="text-ink font-mono font-medium">
                    {serialRaw}
                  </span>
                </p>
              </div>
            </div>
          </div>

          {/* Verification Details */}
          <div className="space-y-3">
            <h4 className="text-ink flex items-center gap-2 text-sm font-semibold">
              <TbShieldCheck className="text-burgundy h-4 w-4" />
              Verification Details
            </h4>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {/* Verification ID */}
              <div className="border-ink/10 rounded-lg border bg-white p-3">
                <div className="text-ink/50 mb-1.5 flex items-center gap-1.5 text-[10px] tracking-wide uppercase">
                  <TbHash className="h-3.5 w-3.5" />
                  Verification ID
                </div>
                <div className="flex items-center justify-between gap-2">
                  <code className="text-ink truncate font-mono text-xs">
                    {verificationId}
                  </code>
                  <button
                    onClick={onCopy}
                    className="text-ink/30 hover:text-ink/70 p-1 transition-colors"
                    title="Copy to clipboard"
                  >
                    <TbCopy className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>

              {/* Timestamp */}
              <div className="border-ink/10 rounded-lg border bg-white p-3">
                <div className="text-ink/50 mb-1.5 flex items-center gap-1.5 text-[10px] tracking-wide uppercase">
                  <TbClock className="h-3.5 w-3.5" />
                  Verified At
                </div>
                <p className="text-ink text-sm font-medium">{timestamp}</p>
              </div>
            </div>

            {/* Commitment Hash */}
            <div className="border-ink/10 rounded-lg border bg-white p-3">
              <div className="text-ink/50 mb-1.5 flex items-center gap-1.5 text-[10px] tracking-wide uppercase">
                <TbFingerprint className="h-3.5 w-3.5" />
                Cryptographic Commitment
              </div>
              <div className="flex items-start justify-between gap-2">
                <code className="text-ink/80 font-mono text-[10px] leading-relaxed break-all">
                  {commitmentHash}
                </code>
                <button
                  onClick={onCopy}
                  className="text-ink/30 hover:text-ink/70 mt-0.5 flex-shrink-0 p-1 transition-colors"
                  title="Copy hash"
                >
                  <TbCopy className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Security Features */}
          <div className="bg-burgundy/5 border-burgundy/10 rounded-xl border p-4">
            <h4 className="text-ink mb-3 flex items-center gap-2 text-sm font-semibold">
              <TbLock className="text-burgundy h-4 w-4" />
              Security Features
            </h4>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              {[
                {
                  icon: <TbLock className="h-4 w-4" />,
                  title: "Zero-Knowledge",
                  desc: "Secret never transmitted",
                },
                {
                  icon: <TbShieldCheck className="h-4 w-4" />,
                  title: "On-Chain Verified",
                  desc: "Immutable blockchain record",
                },
                {
                  icon: <TbFingerprint className="h-4 w-4" />,
                  title: "Cryptographic",
                  desc: "Mathematically proven authenticity",
                },
              ].map((feature, i) => (
                <div
                  key={i}
                  className="border-ink/10 flex flex-col items-center rounded-lg border bg-white p-3 text-center"
                >
                  <div className="text-burgundy mx-auto mb-2">
                    {feature.icon}
                  </div>
                  <p className="text-ink text-xs font-medium">
                    {feature.title}
                  </p>
                  <p className="text-ink/50 mt-0.5 text-[10px]">
                    {feature.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* How It Works */}
          <details className="group border-ink/10 rounded-xl border bg-gray-50 p-4">
            <summary className="text-ink flex cursor-pointer list-none items-center justify-between text-sm font-medium">
              <span className="flex items-center gap-2">
                <TbShieldCheck className="text-burgundy h-4 w-4" />
                How verification works
              </span>
              <span className="text-ink/40 transition-transform group-open:rotate-180">
                ▼
              </span>
            </summary>
            <div className="text-ink/70 mt-3 space-y-2 text-xs">
              <p>
                • Your secret passphrase was used{" "}
                <strong>locally on your device</strong> to generate a
                zero-knowledge proof
              </p>
              <p>
                • Only the cryptographic proof (never your secret) was submitted
                to the blockchain
              </p>
              <p>
                • The smart contract verified the proof mathematically without
                learning your secret
              </p>
              <p>
                • This certificate confirms authenticity while preserving your
                complete privacy
              </p>
            </div>
          </details>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3 pt-2">
            <button
              onClick={onDownload}
              className="bg-burgundy hover:bg-burgundy/90 flex min-w-[140px] flex-1 items-center justify-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium text-white shadow-sm transition-colors"
            >
              <TbDownload className="h-4 w-4" />
              Save Certificate
            </button>
          </div>

          {/* Footer */}
          <div className="border-ink/10 border-t pt-4 text-center">
            <p className="text-ink/50 text-xs">
              This certificate is cryptographically signed and independently
              verifiable on-chain.
            </p>
            <p className="text-ink/40 mt-1 font-mono text-[10px]">
              Ethereum • Contract: 0x7125...B03e • ZKMotus Protocol v1.0
            </p>
          </div>
        </div>
      </div>

      {/* Back to home */}
      <button
        onClick={() => window.location.reload()}
        className="text-ink/60 hover:text-ink/90 mt-6 flex items-center gap-1.5 text-sm font-medium transition-colors"
      >
        ← Verify another item
      </button>
    </div>
  );
}
