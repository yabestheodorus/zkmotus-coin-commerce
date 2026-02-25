import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { get } from "../../../lib/api";
import { poseidon2Hash } from "@zkpassport/poseidon2";

import { Barretenberg, UltraHonkBackend } from "@aztec/bb.js";
import { Noir } from "@noir-lang/noir_js"
import initNoirC from '@noir-lang/noirc_abi';
import initACVM from '@noir-lang/acvm_js';
import acvm from '@noir-lang/acvm_js/web/acvm_js_bg.wasm?url';
import noirc from '@noir-lang/noirc_abi/web/noirc_abi_wasm_bg.wasm?url';

// Initialize WASM modules
await Promise.all([initACVM(fetch(acvm)), initNoirC(fetch(noirc))]);

import circuit from "../../../lib/circuits.json"  with { type: "json" };
import { generateBytes32Nonce, stringToBigInt } from '../../../../Utils';
import { encodeAbiParameters } from 'viem';


function useVerifyAuthenticity(props) {

  const [secret, setSecret] = useState("");
  const [confirmSecret, setConfirmSecret] = useState("");
  const [loading, setLoading] = useState(false);
  const [serialRaw, setSerialRaw] = useState("");
  const [proof, setProof] = useState("");

  const { data, refetch, isFetching } = useQuery({
    queryKey: ["productBySerial", serialRaw],
    queryFn: () => get(`/products/serial/${serialRaw}`),
    staleTime: 30 * 60_000,
    enabled: false
  })

  const toHex = (val) => {
    if (val === null || val === undefined) return '0x0';
    if (typeof val === 'bigint') {
      return '0x' + val.toString(16);
    }
    if (typeof val === 'number') {
      return '0x' + val.toString(16);
    }
    if (Array.isArray(val)) {
      // If it's a byte array, convert to hex
      return '0x' + val.map(b => b.toString(16).padStart(2, '0')).join('');
    }
    if (typeof val === 'string') {
      return val.startsWith('0x') ? val : '0x' + val;
    }
    // Last resort: try to convert
    return '0x' + String(val).toString(16);
  };

  const generateProof = async () => {
    try {

      // 2. Create Noir instance
      const noir = new Noir(circuit);

      // 3. Prepare inputs
      const serialBigInt = stringToBigInt(serialRaw);
      const secretBigInt = stringToBigInt(secret);
      const serialHashed = poseidon2Hash([serialBigInt]);
      const authenticityCommitment = poseidon2Hash([secretBigInt, serialBigInt]);
      const nonce = generateBytes32Nonce();


      const input = {
        order_commitment: toHex(authenticityCommitment),
        serial_number_hashed: toHex(serialHashed),
        verify_nonce: toHex(nonce),
        client_secret: toHex(secretBigInt),
        client_serial_number: toHex(serialBigInt),
      };

      const barretenbergAPI = await Barretenberg.new();
      const backend = new UltraHonkBackend(circuit.bytecode, barretenbergAPI);

      // 4. Generate witness

      const { witness } = await noir.execute(input);

      // 7. Generate proof
      const { proof, publicInputs } = await backend.generateProof(witness, {
        verifierTarget: 'evm',
      });

      // FIX: Convert Uint8Array proof to hex string
      const proofHex = '0x' + Array.from(proof)
        .map(b => b.toString(16).padStart(2, '0'))
        .join('');

      // Convert publicInputs (BigInt[]) to hex strings
      const publicInputsHex = publicInputs.map(val =>
        typeof val === 'bigint' ? '0x' + val.toString(16) : val
      );

      // Encode with hex strings
      const result = encodeAbiParameters(
        [
          { type: "bytes" },
          { type: "bytes32[]" }
        ],
        [proofHex, publicInputsHex]  // ← Both are now strings
      );

      setProof(result);
      setLoading(false);

    } catch (error) {
      console.error("Error generating proof:", error);
      setLoading(false);
      throw error;
    }
  }




  const product = data ? data.data.product : null;
  return {
    product,
    refetch,
    isFetching,
    proof,
    secret,
    setSecret,
    serialRaw,
    setSerialRaw,
    confirmSecret,
    setConfirmSecret,
    loading,
    setLoading,
    generateProof
  }
}

export default useVerifyAuthenticity;