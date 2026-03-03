import React from "react";
import { GiWaxSeal } from "react-icons/gi";
import { TbScan } from "react-icons/tb";
import usePayOrder from "../hook/usePayOrder.jsx";
import { FaArrowRight } from "react-icons/fa";
import { formatRoundedBalance } from "../../../../Utils.js";
import { FaWallet } from "react-icons/fa6";
function InputSecretModal({ orderId, totalAmount }) {
  const {
    secret,
    setSecret,
    confirmSecret,
    setConfirmSecret,
    address,
    isConnected,
    handlePay,
    isPending,
  } = usePayOrder({ orderId, totalAmount });

  const modalId = `modal_input_secret_${orderId}`;

  return (
    <>
      <button
        className="btn bg-burgundy hover:bg-opacity-90 group flex items-center gap-2 rounded-full text-white transition-all duration-300 hover:shadow-lg"
        onClick={() => document.getElementById(modalId).showModal()}
      >
        <FaWallet
          size={20}
          color={"#FFFFFF"}
          className="transition-transform group-hover:rotate-12"
        />
        <span>Pay Order</span>
        <FaArrowRight className="ml-1 transition-transform group-hover:translate-x-1" />
      </button>
      <dialog id={modalId} className="modal">
        <div class="modal-box">
          <div className="flex w-full flex-col items-center gap-5">
            {/* Warning */}
            <div className="border-burgundy/30 bg-burgundy/5 mt-4 w-full rounded-xl border p-4 text-sm">
              <p className="text-burgundy mb-2 text-center font-medium">
                This passphrase creates your
                <br />
                <span className="uppercase underline">order commitment</span>
              </p>
              <ul className="text-ink/70 space-y-1">
                <li>
                  • This is a{" "}
                  <span className="text-burgundy font-medium">
                    private passphrase
                  </span>{" "}
                  known only to you
                </li>
                <li>
                  • It will be{" "}
                  <span className="text-burgundy font-medium">
                    combined with your order details
                  </span>
                </li>
                <li>
                  • Together they generate a{" "}
                  <span className="text-burgundy font-medium">
                    cryptographic commitment
                  </span>
                </li>
                <li>
                  • This commitment serves as proof of ownership for
                  authenticating your items
                </li>
                <li>
                  •{" "}
                  <span className="text-burgundy font-medium">
                    We never store this passphrase
                  </span>{" "}
                  in our systems
                </li>
              </ul>

              <div className="bg-burgundy/10 text-burgundy mt-3 rounded-lg p-2 text-center font-medium">
                Lost secret = cannot register authenticity
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
              onClick={handlePay}
              disabled={
                !secret ||
                !confirmSecret ||
                secret !== confirmSecret ||
                isPending ||
                !isConnected
              }
            >
              {isPending ? (
                <TbScan size={20} className="animate-spin" />
              ) : (
                <GiWaxSeal size={20} />
              )}

              {isPending
                ? "Processing..."
                : `Pay ${formatRoundedBalance(totalAmount)} ETH`}
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

export default InputSecretModal;
