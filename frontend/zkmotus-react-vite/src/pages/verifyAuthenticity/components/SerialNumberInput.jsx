import React from "react";
import { TbScan } from "react-icons/tb";

function SerialNumberInput({ refetch, setStep, serialRaw, setSerialRaw }) {
  return (
    <div className="flex w-full flex-col items-center gap-6 text-center">
      <div className="bg-ink/10 flex h-48 w-48 items-center justify-center rounded-2xl text-6xl">
        ?
      </div>
      <p className="text-sm opacity-60">
        Enter a serial code to verify your item.
      </p>
      <input
        type="text"
        placeholder="Enter serial code"
        value={serialRaw}
        onChange={(e) => setSerialRaw(e.target.value)}
        className="border-ink/20 focus:ring-burgundy/40 w-full rounded-xl border px-4 py-3 text-center text-sm outline-none focus:ring-2"
      />
      <button
        className="bg-burgundy text-parchment flex items-center gap-2 rounded-full px-6 py-3 font-medium hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50"
        onClick={(e) => {
          refetch();
          setStep(2);
        }}
        disabled={!serialRaw}
      >
        <TbScan size={20} /> Check Product
      </button>
    </div>
  );
}

export default SerialNumberInput;
