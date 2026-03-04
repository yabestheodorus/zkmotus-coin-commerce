// components/RegisterAuthenticityDialog.jsx
import { useState } from "react";
import {
  TbScan,
  TbEye,
  TbEyeOff,
  TbInfoCircle,
  TbShieldCheck,
  TbLock,
  TbKey,
  TbAlertCircle,
  TbArrowLeft,
} from "react-icons/tb";
import { GiWaxSeal, GiCheckMark } from "react-icons/gi";
import { FaArrowRight } from "react-icons/fa";
import { useRegisterAuthenticity } from "./useRegisterAuthenticity";

export default function RegisterAuthenticityDialog({ serialData }) {
  const [step, setStep] = useState(1);
  const [showSecret, setShowSecret] = useState(false);
  const [showConfirmSecret, setShowConfirmSecret] = useState(false);

  const {
    secret,
    setSecret,
    confirmSecret,
    setConfirmSecret,
    isRegistering,
    error,
    register,
    canSubmit,
    isSecretValid,
    isConfirmValid,
  } = useRegisterAuthenticity({
    serialRaw: serialData?.serialRaw || "",
    serialHash: serialData?.serialHash || "",
    orderId: serialData?.orderId || "",
  });

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && canSubmit && step === 2) register();
  };

  const modalId = `modal_register_authenticity_${serialData.serialHash}`;

  // ✅ Reusable content arrays (defined outside render logic)
  const secretTips = [
    "Minimum 8 characters (letters, numbers, symbols)",
    "Case-sensitive and unique",
    "Cannot be recovered if lost — save it securely",
  ];

  const verificationSteps = [
    { num: 1, text: "Commitment linking serial + secret is stored on-chain" },
    { num: 2, text: "To verify later: enter secret → generate proof locally" },
    { num: 3, text: "Only proof is sent; secret never leaves your device" },
    { num: 4, text: "Blockchain verifies proof without learning your secret" },
  ];

  return (
    <>
      <button
        className="text-parchment hover:bg-burgundy/90 bg-burgundy flex w-full cursor-pointer items-center gap-x-3 rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-300 hover:shadow-lg"
        onClick={() => document.getElementById(modalId)?.showModal()}
      >
        <TbScan className="h-5 w-5" />
        <span>Register Authenticity</span>
      </button>

      <dialog id={modalId} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box max-w-lg overflow-hidden rounded-2xl bg-white p-0">
          {/* Step indicator */}
          <div className="from-burgundy to-burgundy/70 h-1 overflow-hidden bg-gradient-to-r">
            <div
              className="h-full bg-white/90 transition-[width] duration-300 ease-in-out"
              style={{ width: step === 1 ? "50%" : "100%" }}
            />
          </div>

          <div className="p-6">
            {/* Header */}
            <div className="mb-5 text-center">
              <div className="bg-burgundy/10 mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl">
                <GiWaxSeal className="text-burgundy h-6 w-6" />
              </div>
              <h2 className="text-ink text-xl font-bold">
                {step === 1 ? "Register Authenticity" : "Enter Secret"}
              </h2>
              <p className="text-ink/70 mt-0.5 text-xs">
                Order #{serialData.orderId} • {serialData.rawSerial}
              </p>
            </div>

            {/* ✅ INLINE STEP 1: Explanation */}
            {step === 1 && (
              <div className="space-y-5">
                {/* What is this? */}
                <div className="bg-burgundy/5 border-burgundy/20 rounded-xl border p-4">
                  <div className="flex items-start gap-3">
                    <TbInfoCircle className="text-burgundy mt-0.5 h-5 w-5 flex-shrink-0" />
                    <div>
                      <h4 className="text-ink mb-2 text-sm font-semibold">
                        What is authenticity registration?
                      </h4>
                      <p className="text-ink/70 text-sm leading-relaxed">
                        Creates a cryptographic link between your item's serial
                        number and your secret passphrase. Later, you can prove
                        ownership without revealing your secret using
                        zero-knowledge proofs.
                      </p>
                    </div>
                  </div>
                </div>

                {/* How verification works */}
                <div className="from-burgundy/5 to-purple/5 border-burgundy/10 rounded-xl border bg-gradient-to-br p-4">
                  <h4 className="text-ink mb-3 flex items-center gap-2 text-sm font-semibold">
                    <TbShieldCheck className="text-burgundy h-4 w-4" />
                    How verification works
                  </h4>
                  <ol className="text-ink/70 space-y-3 text-sm">
                    {verificationSteps.map((s) => (
                      <li key={s.num} className="flex items-start gap-2">
                        <span className="bg-burgundy/20 text-burgundy flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full text-xs font-medium">
                          {s.num}
                        </span>
                        <span>{s.text}</span>
                      </li>
                    ))}
                  </ol>
                </div>

                {/* Secret best practices */}
                <div className="border-ink/10 rounded-lg border bg-gray-50 p-4">
                  <h4 className="text-ink mb-2 flex items-center gap-2 text-sm font-medium">
                    <TbKey className="text-burgundy h-4 w-4" />
                    Secret best practices
                  </h4>
                  <ul className="text-ink/70 space-y-1.5 text-sm">
                    {secretTips.map((tip, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <GiCheckMark className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-500" />
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Privacy guarantee */}
                <div className="flex items-start gap-2 rounded-lg border border-green-200 bg-green-50 p-3 text-xs text-green-700">
                  <TbShieldCheck className="mt-0.5 h-4 w-4 flex-shrink-0" />
                  <span>
                    Your secret is never transmitted or stored. Only a
                    cryptographic proof is sent to the blockchain.
                  </span>
                </div>
              </div>
            )}

            {/* ✅ INLINE STEP 2: Secret Input */}
            {step === 2 && (
              <div className="space-y-4">
                {/* Secret Input */}
                <div>
                  <label className="text-ink/70 mb-1.5 block flex items-center gap-2 text-sm font-medium">
                    Secret Passphrase
                    <span className="text-ink/50 text-xs font-normal">
                      (required)
                    </span>
                  </label>
                  <div className="relative">
                    <input
                      type={showSecret ? "text" : "password"}
                      value={secret}
                      onChange={(e) => setSecret(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder="Enter your secret..."
                      className={`w-full rounded-xl border px-4 py-3 pr-12 text-sm transition-all outline-none focus:ring-2 ${
                        isSecretValid || !secret
                          ? "border-ink/20 focus:ring-burgundy/40"
                          : "border-red-300 bg-red-50 focus:ring-red-300"
                      }`}
                      disabled={isRegistering}
                      autoFocus={step === 2} // Only focus when step 2 mounts
                    />
                    <button
                      type="button"
                      onClick={() => setShowSecret(!showSecret)}
                      className="text-ink/40 hover:text-ink/70 absolute top-1/2 right-3 -translate-y-1/2 transition-colors"
                      tabIndex={-1}
                    >
                      {showSecret ? (
                        <TbEyeOff className="h-5 w-5" />
                      ) : (
                        <TbEye className="h-5 w-5" />
                      )}
                    </button>
                  </div>

                  {/* Strength indicator - with fixed transitions */}
                  {secret && (
                    <div className="mt-2 flex items-center gap-2">
                      <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-gray-200">
                        <div
                          className={`h-full transition-all duration-300 ease-in-out will-change-[width,background-color] ${
                            secret.length < 8
                              ? "w-1/3 bg-red-400"
                              : secret.length < 12
                                ? "w-2/3 bg-yellow-400"
                                : "w-full bg-green-500"
                          }`}
                        />
                      </div>
                      <span
                        className={`text-xs transition-colors duration-300 ease-in-out ${
                          secret.length < 8
                            ? "text-red-500"
                            : secret.length < 12
                              ? "text-yellow-600"
                              : "text-green-600"
                        }`}
                      >
                        {secret.length < 8
                          ? "Weak"
                          : secret.length < 12
                            ? "Medium"
                            : "Strong"}
                      </span>
                    </div>
                  )}

                  {secret && !isSecretValid && (
                    <p className="mt-1 flex items-center gap-1 text-xs text-red-500">
                      <TbAlertCircle className="h-3 w-3" />
                      Minimum 8 characters required
                    </p>
                  )}
                </div>

                {/* Confirm Secret */}
                <div>
                  <label className="text-ink/70 mb-1.5 block text-sm font-medium">
                    Confirm Passphrase
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmSecret ? "text" : "password"}
                      value={confirmSecret}
                      onChange={(e) => setConfirmSecret(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder="Confirm your secret..."
                      className={`w-full rounded-xl border px-4 py-3 pr-12 text-sm transition-all outline-none focus:ring-2 ${
                        isConfirmValid || !confirmSecret
                          ? "border-ink/20 focus:ring-burgundy/40"
                          : "border-red-300 bg-red-50 focus:ring-red-300"
                      }`}
                      disabled={isRegistering}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmSecret(!showConfirmSecret)}
                      className="text-ink/40 hover:text-ink/70 absolute top-1/2 right-3 -translate-y-1/2 transition-colors"
                      tabIndex={-1}
                    >
                      {showConfirmSecret ? (
                        <TbEyeOff className="h-5 w-5" />
                      ) : (
                        <TbEye className="h-5 w-5" />
                      )}
                    </button>
                  </div>

                  {confirmSecret && (
                    <div
                      className={`mt-2 flex items-center gap-2 text-sm ${
                        isConfirmValid ? "text-green-600" : "text-red-500"
                      }`}
                    >
                      {isConfirmValid ? (
                        <>
                          <GiCheckMark className="h-4 w-4" />
                          Passphrases match
                        </>
                      ) : (
                        <>
                          <TbAlertCircle className="h-4 w-4" />
                          Passphrases do not match
                        </>
                      )}
                    </div>
                  )}
                </div>

                {/* Error message */}
                {error && (
                  <div className="rounded-lg border border-red-200 bg-red-50 p-3">
                    <p className="mb-1 text-sm font-medium text-red-700">
                      Registration failed
                    </p>
                    <p className="text-sm text-red-600">{error}</p>
                  </div>
                )}

                {/* Privacy reminder */}
                <div className="bg-burgundy/5 border-burgundy/20 text-ink/70 flex items-start gap-2 rounded-lg border p-3 text-xs">
                  <TbLock className="text-burgundy mt-0.5 h-4 w-4 flex-shrink-0" />
                  <span>
                    By registering, you agree this secret cannot be recovered if
                    lost.
                  </span>
                </div>
              </div>
            )}

            {/* Navigation buttons */}
            <div className="mt-6 flex gap-3">
              {step === 1 ? (
                <button
                  onClick={() => setStep(2)}
                  className="bg-burgundy hover:bg-burgundy/90 flex flex-1 items-center justify-center gap-2 rounded-full px-6 py-3 font-medium text-white transition-colors"
                >
                  <span>Continue</span>
                  <FaArrowRight className="h-4 w-4" />
                </button>
              ) : (
                <>
                  <button
                    onClick={() => setStep(1)}
                    disabled={isRegistering}
                    className="border-ink/20 text-ink flex items-center justify-center gap-1 rounded-full border px-4 py-3 text-sm font-medium transition-colors hover:bg-gray-50 disabled:opacity-50"
                  >
                    <TbArrowLeft className="h-4 w-4" />
                    Back
                  </button>
                  <button
                    onClick={register}
                    disabled={!canSubmit}
                    className={`flex flex-1 items-center justify-center gap-2 rounded-full px-6 py-3 font-medium text-white transition-all ${
                      isRegistering
                        ? "bg-burgundy/70 cursor-wait"
                        : canSubmit
                          ? "bg-burgundy hover:bg-burgundy/90 hover:shadow-lg"
                          : "cursor-not-allowed bg-gray-300"
                    }`}
                  >
                    {isRegistering ? (
                      <>
                        <TbScan className="h-5 w-5 animate-spin" />
                        <span>Registering...</span>
                      </>
                    ) : (
                      <>
                        <GiWaxSeal className="h-5 w-5" />
                        <span>Register</span>
                      </>
                    )}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>

        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
}
