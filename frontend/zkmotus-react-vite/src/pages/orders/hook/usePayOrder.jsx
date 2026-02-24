import React, { useEffect, useState } from "react";
import { useAppKitAccount } from "@reown/appkit/react";
import { useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import ZKMotusPaymentABI from "../../../abi/ZKMotusPayment.abi.json" with { type: "json" }; // Adjust path
import Notification from "../../../layout/Notification";
import { poseidon2Hash } from "@zkpassport/poseidon2";
import toast from "react-hot-toast";
import { pad, toHex } from "viem";
import { stringToBigInt } from "../../../../Utils";

function usePayOrder({ orderId, totalAmount }) {
  const [secret, setSecret] = useState("");
  const [confirmSecret, setConfirmSecret] = useState("");
  const { address, isConnected } = useAppKitAccount();

  const payOrderCall = useWriteContract();
  const payOrderHasAHash = Boolean(payOrderCall.data);

  const { isLoading, isSuccess } = useWaitForTransactionReceipt({
    hash: payOrderCall.data,
    query: {
      enabled: payOrderHasAHash,
    },
  });

  const payOrderError = payOrderCall.error;

  useEffect(() => {
    if (payOrderError) {
      toast.custom((t) => {
        return (
          <Notification
            visible={t.visible}
            title="Payment Error!"
            subtitle={`${payOrderError}`}
          />
        );
      });
      console.log("Error paying order : ", payOrderError);
    }
  }, [payOrderError]);

  const handlePay = async () => {
    if (!isConnected) {
      toast.custom((t) => {
        return (
          <Notification
            visible={t.visible}
            title="No Wallet Connected!"
            subtitle={`Please connect your wallet first`}
          />
        );
      });
      return;
    }

    try {
      const secretBigInt = stringToBigInt(secret);

      // Generate the commitment as bigint
      const commitmentBigInt = poseidon2Hash([
        BigInt(secretBigInt),
        BigInt(orderId),
      ]);

      // Convert bigint to 32-byte hex string (bytes32)
      const commitmentBytes32 = pad(toHex(commitmentBigInt), { size: 32 });

      payOrderCall.mutate({
        address: import.meta.env.VITE_PAYMENT_CONTRACT,
        abi: ZKMotusPaymentABI,
        functionName: "receivePayment",
        args: [orderId, commitmentBytes32],
        value: BigInt(totalAmount),
        gas: 500_000n,
      });
    } catch (error) {
      console.error("Payment failed:", error);
    }
  };

  const isPending = isLoading ? isLoading : false;
  return {
    secret,
    setSecret,
    confirmSecret,
    setConfirmSecret,
    address,
    isConnected,
    handlePay,
    isPending,
  };
}

export default usePayOrder;
