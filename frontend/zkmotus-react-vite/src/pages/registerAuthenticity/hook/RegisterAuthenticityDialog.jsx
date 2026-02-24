// components/RegisterAuthenticityDialog.jsx
import { TbScan } from "react-icons/tb";
import { GiWaxSeal } from "react-icons/gi";
import { useRegisterAuthenticity } from "./useRegisterAuthenticity";
import { FaArrowRight } from "react-icons/fa";

export default function RegisterAuthenticityDialog({
  serialData, // { serialHash, rawSerial, orderId }
}) {
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
    writeContracts,
  } = useRegisterAuthenticity({
    serialRaw: serialData?.serialRaw || "",
    serialHash: serialData?.serialHash || "",
    orderId: serialData?.orderId || "",
  });

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && canSubmit) register();
  };

  const modalId = `modal_register_authenticity_${serialData.serialHash}`;

  return (
    <>
      <button
        className="text-parchment hover:bg-burgundy/90 bg-burgundy flex w-full cursor-pointer items-center gap-x-3 rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-200 hover:shadow-lg"
        onClick={() => document.getElementById(modalId).showModal()}
      >
        <TbScan className="h-5 w-5" />
        <span>Register Authenticity</span>
      </button>
      <dialog id={modalId} className="modal">
        <div className="modal-box max-w-md rounded-2xl bg-white p-0">
          <div className="p-6">
            {/* Header */}
            <div className="mb-6 text-center">
              <div className="bg-burgundy/10 mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl">
                <GiWaxSeal className="text-burgundy h-8 w-8" />
              </div>
              <h2 className="text-ink text-2xl font-bold">
                Register Authenticity
              </h2>
              <p className="text-ink/70 mt-1 text-sm">
                Order #{serialData.orderId} • Serial: {serialData.rawSerial}
              </p>
            </div>

            {/* Warning box */}
            <div className="border-burgundy/30 bg-burgundy/5 mb-6 rounded-xl border p-4">
              <p className="text-burgundy mb-2 text-center font-medium">
                Enter your exact secret passphrase
              </p>
              <ul className="text-ink/70 space-y-1 text-sm">
                <li>• Must match the secret used during payment</li>
                <li>• Case-sensitive</li>
                <li>• Cannot be recovered if lost</li>
              </ul>
            </div>

            {/* Serial info */}
            <div className="mb-4 rounded-lg bg-gray-50 p-3">
              <p className="text-ink/60 text-xs">Serial Hash</p>
              <p className="text-ink font-mono text-sm font-medium break-all">
                {serialData.serialHash.slice(0, 10)}...
                {serialData.serialHash.slice(-8)}
              </p>
            </div>

            {/* Secret input */}
            <div className="mb-4">
              <label className="text-ink/70 mb-1.5 block text-sm font-medium">
                Secret Passphrase
              </label>
              <input
                type="password"
                value={secret}
                onChange={(e) => setSecret(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Enter your secret..."
                className={`w-full rounded-xl border px-4 py-3 text-sm outline-none focus:ring-2 ${
                  isSecretValid || !secret
                    ? "border-ink/20 focus:ring-burgundy/40"
                    : "border-red-300 bg-red-50 focus:ring-red-300"
                }`}
                disabled={isRegistering}
                autoFocus
              />
              {secret && !isSecretValid && (
                <p className="mt-1 text-xs text-red-500">
                  Minimum 8 characters
                </p>
              )}
            </div>

            {/* Confirm secret */}
            <div className="mb-6">
              <label className="text-ink/70 mb-1.5 block text-sm font-medium">
                Confirm Passphrase
              </label>
              <input
                type="password"
                value={confirmSecret}
                onChange={(e) => setConfirmSecret(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Confirm your secret..."
                className={`w-full rounded-xl border px-4 py-3 text-sm outline-none focus:ring-2 ${
                  isConfirmValid || !confirmSecret
                    ? "border-ink/20 focus:ring-burgundy/40"
                    : "border-red-300 bg-red-50 focus:ring-red-300"
                }`}
                disabled={isRegistering}
              />
              {confirmSecret && !isConfirmValid && (
                <p className="mt-1 text-xs text-red-500">
                  Passphrases do not match
                </p>
              )}
            </div>

            {/* Error message */}
            {error && (
              <div className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">
                {error}
              </div>
            )}

            {/* Action buttons */}
            <button
              onClick={register}
              disabled={!canSubmit}
              className={`${
                isRegistering
                  ? "bg-burgundy/70 cursor-wait"
                  : canSubmit
                    ? "bg-burgundy hover:bg-burgundy/90"
                    : "cursor-not-allowed bg-gray-300"
              } w-full rounded-full px-6 py-3 font-medium text-white`}
            >
              {isRegistering ? (
                <>
                  <TbScan className="mr-2 inline h-5 w-5 animate-spin" />
                  Registering...
                </>
              ) : (
                <>
                  <GiWaxSeal className="mr-2 inline h-5 w-5" />
                  Register Authenticity
                </>
              )}
            </button>
          </div>
        </div>

        <form method="dialog" class="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
}
