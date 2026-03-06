import { GiWaxSeal } from "react-icons/gi";
import useVerifyAuthenticity from "./hooks/useVerifyAuthenticity.jsx";
import SerialNumberInput from "./components/SerialNumberInput";
import ProductInfo from "./components/ProductInfo";
import ProofInfo from "./components/ProofInfo";
import VerificationSuccess from "./components/VerificationSuccess.jsx";

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
    verifyTxHash,
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

        {step === 4 && (
          <VerificationSuccess
            serialRaw={serialRaw}
            productName={product?.name}
            imageUrl={product.imageURL.thumbnail}
            verificationId={verifyTxHash}
            commitmentHash={"fafeasdfdasfacasefggda"}
            onDownload={() => {
              // TODO: Generate PDF with html2canvas + jsPDF
            }}
            onCopy={(text) => {
              // TODO: navigator.clipboard.writeText(text)
            }}
          />
        )}
      </div>
    </div>
  );
}
