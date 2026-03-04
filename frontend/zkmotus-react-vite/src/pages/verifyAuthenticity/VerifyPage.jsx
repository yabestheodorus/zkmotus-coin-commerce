import { GiWaxSeal } from "react-icons/gi";
import useVerifyAuthenticity from "./hooks/useVerifyAuthenticity.jsx";
import SerialNumberInput from "./components/SerialNumberInput";
import ProductInfo from "./components/ProductInfo";
import ProofInfo from "./components/ProofInfo";

export default function VerifyPage() {
  const {
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
  } = useVerifyAuthenticity();

  // Step 3: Verify proof
  const handleVerifyProof = async () => {
    await callVerifyProof();

    // setTimeout(() => {
    //   setLoading(false);
    //   setStep(4);
    // }, 3000);
  };
  return (
    <div className="font-lineseed text-ink flex min-h-screen flex-col items-center px-4 py-8">
      {/* Background decoration */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="bg-burgundy/5 absolute -top-40 -right-40 h-96 w-96 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-yellow-700/5 blur-3xl" />
        <div className="via-parchment/20 absolute top-1/2 left-1/2 h-full w-full -translate-x-1/2 -translate-y-1/2 bg-gradient-to-b from-transparent to-transparent" />
      </div>

      {/* Step Card */}
      <div className="flex w-full max-w-xl flex-col items-center gap-6 rounded-3xl bg-white p-6 shadow-2xl transition-all duration-500">
        {/* Step 1: Placeholder + Serial Input */}
        {step === 1 && (
          <SerialNumberInput
            refetch={refetch}
            setStep={setStep}
            serialRaw={serialRaw}
            setSerialRaw={setSerialRaw}
          />
        )}

        {/* Step 2: Product Info + Secret Input */}
        {step === 2 && (
          <ProductInfo
            product={product}
            secret={secret}
            setSecret={setSecret}
            confirmSecret={confirmSecret}
            setConfirmSecret={setConfirmSecret}
            handleGenerateProof={handleGenerateProof}
            loading={loading}
          />
        )}

        {/* Step 3: Proof Generated + Verify */}
        {step === 3 && (
          <ProofInfo
            loading={verifyLoading}
            handleVerifyProof={handleVerifyProof}
            proof={proof}
            proofHex={proofHex}
          />
        )}

        {/* Step 4: Verified */}
        {step === 4 && (
          <div className="flex w-full flex-col items-center gap-6 text-center">
            <GiWaxSeal size={50} className="animate-pulse text-yellow-800" />
            <h2 className="text-xl font-semibold">Verified!</h2>
            <p className="text-sm opacity-70">
              Ownership and authenticity confirmed privately.
            </p>

            {/* ZK Explanation */}
            <div className="bg-ink/5 space-y-2 rounded-2xl p-4 text-left text-sm">
              <p>
                <span className="font-medium">Zero-Knowledge Proof:</span> Your
                ownership is proven without revealing your private data.
              </p>
              <p>
                <span className="font-medium">Privacy Preserved:</span> Only the
                authenticity is verified, your identity stays confidential.
              </p>
              <p>
                <span className="font-medium">Counterfeit Protection:</span>{" "}
                Each item is cryptographically registered, so fake products
                cannot pass verification.
              </p>
              <p className="text-ink/60 italic">
                This ensures secure verification for luxury items, collectibles,
                and limited editions.
              </p>
            </div>

            <button
              className="bg-burgundy text-parchment mt-4 rounded-full px-6 py-3 font-medium hover:brightness-110"
              onClick={() => setStep(1)}
            >
              Verify Another Item
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
