import { useQuery } from "@tanstack/react-query";
import { useRef, useState } from "react";
import { get, post } from "../../../lib/api";
import { poseidon2Hash } from "@zkpassport/poseidon2";

import { Barretenberg, UltraHonkBackend } from "@aztec/bb.js";
import { Noir } from "@noir-lang/noir_js";
import initNoirC from "@noir-lang/noirc_abi";
import initACVM from "@noir-lang/acvm_js";
import acvm from "@noir-lang/acvm_js/web/acvm_js_bg.wasm?url";
import noirc from "@noir-lang/noirc_abi/web/noirc_abi_wasm_bg.wasm?url";

// Initialize WASM modules
await Promise.all([initACVM(fetch(acvm)), initNoirC(fetch(noirc))]);

import circuit from "../../../lib/circuits.json" with { type: "json" };
import {
  generateBytes32Nonce,
  serialToBigInt,
  stringToBigInt,
  toBytes32,
} from "../../../../Utils";
import toast from "react-hot-toast";
import Notification from "../../../layout/Notification";

function useVerifyAuthenticity(props) {
  const [secret, setSecret] = useState("");
  const [confirmSecret, setConfirmSecret] = useState("");
  const [loading, setLoading] = useState(false);
  const [verifyLoading, setVerifyLoading] = useState(false);
  const [serialRaw, setSerialRaw] = useState("");
  const [proofHex, setProofHex] = useState("");
  const [proof, setProof] = useState("");
  const [verifyTxHash, setVerifyTxHash] = useState("");

  const [step, setStep] = useState(1); // 1–4

  const [nonce, setNonce] = useState(null);

  const backendRef = useRef(null);
  const nonceRef = useRef(null);

  const { data, refetch, isFetching } = useQuery({
    queryKey: ["productBySerial", serialRaw],
    queryFn: () => get(`/products/serial/${serialRaw}`),
    staleTime: 30 * 60_000,
    enabled: false,
  });

  // Step 2: Generate proof
  const handleGenerateProof = () => {
    setLoading(true);
    generateProof();
  };

  const generateProof = async () => {
    try {
      // 2. Create Noir instance
      const noir = new Noir(circuit);

      // 3. Prepare inputs
      const serialBigInt = serialToBigInt(serialRaw);
      const secretBigInt = stringToBigInt(secret);
      const serialHashed = poseidon2Hash([serialBigInt]);
      const authenticityCommitment = poseidon2Hash([
        secretBigInt,
        serialBigInt,
      ]);
      const nonceRand = generateBytes32Nonce();
      nonceRef.current = nonceRand; // Sync ref immediately
      setNonce(nonceRand);

      const input = {
        order_commitment: toBytes32(authenticityCommitment),
        serial_number_hashed: toBytes32(serialHashed),
        verify_nonce: toBytes32(nonceRand),
        client_secret: toBytes32(secretBigInt),
        client_serial_number: toBytes32(serialBigInt),
      };

      const barretenbergAPI = await Barretenberg.new();
      const backend = new UltraHonkBackend(circuit.bytecode, barretenbergAPI);
      backendRef.current = { api: barretenbergAPI, backend };

      // 4. Generate witness
      const { witness } = await noir.execute(input);

      // 7. Generate proof
      const { proof, publicInputs: generatedPublicInputs } =
        await backend.generateProof(witness, {
          verifierTarget: "evm",
        });

      const proofHexs =
        "0x" +
        Array.from(proof)
          .map((b) => b.toString(16).padStart(2, "0"))
          .join("");

      setProofHex(proofHexs); // proof and public input in form of string hex.
      const proofCopy = new Uint8Array(proof);
      setProof(proofCopy);
      setLoading(false);
      setStep(3);
    } catch (error) {
      console.error("Error generating proof:", error);
      setLoading(false);
      throw error;
    }
  };

  const callVerifyProof = async () => {
    if (!proof || !nonce || !serialRaw) {
      alert("Proof or nonce not generated yet");
      return;
    }

    setVerifyLoading(true);

    const serialBigInt = serialToBigInt(serialRaw);
    const serialHashed = poseidon2Hash([serialBigInt]);

    const nonceToUse = nonceRef.current ?? nonce;

    try {
      const res = await post("/order/verifyProof", {
        proof: proofHex,
        serialNumber: toBytes32(serialHashed),
        nonce: toBytes32(nonceToUse),
      });

      setVerifyTxHash(res.txHash);

      toast.custom((t) => {
        return (
          <Notification
            visible={t.visible}
            title="Verification Succeed!"
            subtitle={` ${res.message}`}
          />
        );
      });
      setStep(4);
    } catch (err) {
      console.error("Error:", JSON.stringify(err.response));
    } finally {
      setVerifyLoading(false);
    }
  };

  const product = data ? data.data.product : null;
  return {
    product,
    refetch,
    isFetching,
    proof,
    proofHex,
    secret,
    setSecret,
    serialRaw,
    setSerialRaw,
    confirmSecret,
    setConfirmSecret,
    loading,
    setLoading,
    generateProof,
    handleGenerateProof,
    step,
    setStep,
    verifyLoading,
    callVerifyProof,
    setVerifyTxHash,
    verifyTxHash,
  };
}

export default useVerifyAuthenticity;
