import React from "react";
import { GiWaxSeal } from "react-icons/gi";
import { TbScan } from "react-icons/tb";

function ProofInfo({ loading, handleVerifyProof, proof }) {
  return (
    <div className="flex w-full flex-col items-center gap-4 text-center">
      {loading ? (
        <>
          <TbScan size={40} className="text-burgundy animate-spin" />
          <p className="text-sm opacity-70">Verifying proof...</p>
        </>
      ) : (
        <>
          <GiWaxSeal size={40} className="text-yellow-800" />
          <p className="text-sm opacity-70">Proof generated successfully.</p>

          <div className="my-6 flex min-h-64 w-full rounded-2xl bg-gray-200 p-4 text-left font-mono text-sm break-all text-gray-500 select-all">
            {proof}
          </div>
          <button
            className="bg-burgundy text-parchment flex items-center gap-2 rounded-full px-6 py-3 font-medium hover:brightness-110"
            onClick={handleVerifyProof}
          >
            <TbScan size={20} /> Verify Proof
          </button>
        </>
      )}
    </div>
  );
}

export default ProofInfo;
