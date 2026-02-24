import { useState, useEffect } from "react";
import { useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import ZKMotusRegistryABI from "../../../abi/ZKMotusRegistry.abi.json" with { type: "json" };
import { poseidon2Hash } from "@zkpassport/poseidon2";
import { pad, toHex } from "viem";
import { serialToBigInt, stringToBigInt } from "../../../../Utils";
import toast from "react-hot-toast";
import Notification from "../../../layout/Notification";

export function useRegisterAuthenticity({ serialRaw, serialHash, orderId }) {
  const [secret, setSecret] = useState("");
  const [confirmSecret, setConfirmSecret] = useState("");
  const [error, setError] = useState(null);
  const [txHash, setTxHash] = useState(null);

  // Wagmi v3 hooks

  const writeContracts = useWriteContract();
  const writeError = writeContracts.error;
  const isWriting = writeContracts.isPending;

  const {
    isLoading: isConfirming,
    isSuccess: isConfirmed,
    error: confirmError,
  } = useWaitForTransactionReceipt({
    hash: txHash,
    query: { enabled: !!txHash },
  });

  // Validation states
  const isSecretValid = secret.length >= 6;
  const isConfirmValid = confirmSecret === secret && confirmSecret.length > 0;
  const canSubmit =
    isSecretValid && isConfirmValid && !isWriting && !isConfirming;
  const isRegistering = isWriting || isConfirming;

  // Handle write errors
  useEffect(() => {
    if (writeError) {
      setError(parseContractError(writeError));
    }
  }, [writeError]);

  // Handle confirmation errors
  useEffect(() => {
    if (confirmError) {
      setError("Transaction failed to confirm. Please try again.");
    }
  }, [confirmError]);

  // Handle success
  useEffect(() => {
    if (isConfirmed) {
      // showing toast
      toast.custom((t) => {
        return (
          <Notification
            visible={t.visible}
            title="Register Success!"
            subtitle={`Your item authenticity is registered.`}
          />
        );
      });

      setTxHash(null);
      setError(null);
    }
  }, [isConfirmed]);

  const reset = () => {
    setSecret("");
    setConfirmSecret("");
    setError(null);
    setTxHash(null);
  };

  const register = async () => {
    if (!canSubmit) return;

    setError(null);

    try {
      // Convert secret to BigInt via SHA-256
      const secretBigInt = stringToBigInt(secret);
      const orderIdBigInt = BigInt(orderId);

      // Generate commitment (same as during payment)
      const orderCommitment = poseidon2Hash([secretBigInt, orderIdBigInt]);
      const orderCommitmentBytes32 = pad(toHex(orderCommitment), { size: 32 });

      const authenticityCommitment = poseidon2Hash([
        secretBigInt,
        serialToBigInt(serialRaw),
      ]);
      const authenticityCommitmentBytes32 = pad(toHex(authenticityCommitment), {
        size: 32,
      });

      const hash = writeContracts.mutate({
        address: import.meta.env.VITE_REGISTRY_CONTRACT,
        abi: ZKMotusRegistryABI,
        functionName: "registerAuthenticity",
        args: [
          authenticityCommitmentBytes32,
          orderCommitmentBytes32,
          serialHash,
        ],
        gas: 500_000n,
      });

      setTxHash(hash);
    } catch (err) {
      // User rejection or validation errors
      if (err.name === "UserRejectedRequestError") {
        setError("Transaction rejected by user.");
      } else {
        setError("Failed to initiate registration. Please try again.");
      }
      console.error("Registration initiation failed:", err);
    }
  };

  return {
    // State
    secret,
    setSecret,
    confirmSecret,
    setConfirmSecret,
    isRegistering,
    error,
    txHash,

    // Actions
    register,
    reset,
    canSubmit,
    isSecretValid,
    isConfirmValid,
    isWriting,
    isConfirming,
    isConfirmed,
  };
}

// Helper: Parse common contract revert reasons
function parseContractError(error) {
  if (!error?.message) return "Registration failed. Please try again.";

  if (error.message.includes("InvalidCommitment")) {
    return "Invalid secret. Please check your passphrase.";
  }
  if (error.message.includes("SerialAlreadyRegistered")) {
    return "This serial is already registered.";
  }
  if (error.message.includes("SerialNotPaid")) {
    return "This serial has not been paid yet.";
  }
  if (error.message.includes("Unauthorized")) {
    return "You are not authorized to register this serial.";
  }

  return (
    error.shortMessage ||
    error.message ||
    "Registration failed. Please try again."
  );
}
