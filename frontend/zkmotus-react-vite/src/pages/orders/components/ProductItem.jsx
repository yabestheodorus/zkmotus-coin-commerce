import React from "react";
import { formatRoundedBalance } from "../../../../Utils";
import { TbScan } from "react-icons/tb";
import RegisterAuthenticityDialog from "../../registerAuthenticity/hook/RegisterAuthenticityDialog";
import { IoIosCopy } from "react-icons/io";

// Status badge styling based on status value
const getStatusStyle = (status) => {
  const styles = {
    UNPAID: {
      bg: "bg-red-50/50",
      text: "text-red-600",
      border: "border-red-200",
      dot: "bg-red-400",
    },
    PAID: {
      bg: "bg-amber-50/50",
      text: "text-amber-700",
      border: "border-amber-200",
      dot: "bg-amber-400",
    },
    UNREGISTERED: {
      bg: "bg-blue-50/50",
      text: "text-blue-700",
      border: "border-blue-200",
      dot: "bg-blue-400",
    },
    REGISTERED: {
      bg: "bg-green-50/50",
      text: "text-green-700",
      border: "border-green-200",
      dot: "bg-green-500",
    },
    default: {
      bg: "bg-gray-50/50",
      text: "text-gray-600",
      border: "border-gray-200",
      dot: "bg-gray-400",
    },
  };
  return styles[status] || styles.default;
};

const ProductItem = ({
  product,
  quantity,
  serial,
  serialHash,
  status,
  orderId,
  onRegister,
  isRegistering = false,
}) => {
  const { bg, text, border, dot } = getStatusStyle(status);
  const showRegisterButton = status === "UNREGISTERED";

  return (
    <div className="border-primaryGray flex flex-col items-start gap-4 rounded-xl border bg-white p-4 shadow-sm transition-shadow hover:shadow-md md:flex-row">
      {/* Image placeholder */}
      <img
        src={product.imageURL?.thumbnail || "/placeholder.svg"}
        className="border-primaryGray h-20 w-20 shrink-0 overflow-hidden rounded-lg border bg-gray-100 object-contain"
        alt={product?.name || "Product"}
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = "/placeholder.svg";
        }}
      />

      <div className="min-w-0 flex-1">
        <h3 className="text-burgundy text-base leading-tight font-semibold">
          {product?.name || "Product name"}
        </h3>
        <p className="text-ink/70 mt-1 text-sm">
          Qty: {quantity} ×{" "}
          <span className="font-medium">
            {formatRoundedBalance(product.price)} ETH
          </span>
        </p>
        {/* Serial number */}
        <div className="mt-2 flex items-center gap-2">
          <span className="bg-parchment text-ink border-ink/10 rounded-md border px-3 py-1.5 text-xs font-medium select-none">
            Serial: {serial}
          </span>
          <button
            onClick={() => navigator.clipboard.writeText(serial)}
            className="group text-ink/40 hover:text-burgundy hover:bg-burgundy/10 relative flex cursor-pointer items-center justify-center rounded-md p-1.5 transition-all"
            title="Copy to clipboard"
          >
            <IoIosCopy size={16} />

            {/* Tooltip */}
            <span className="bg-ink pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 rounded px-2 py-1 text-[10px] whitespace-nowrap text-white opacity-0 transition-opacity group-hover:opacity-100">
              Copy
            </span>
          </button>
        </div>
        {/* Status badge with visual indicator */}
        <div className="mt-2 flex flex-wrap items-center gap-2">
          <div
            className={`flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${bg} ${text} ${border} border`}
          >
            <span className={`mr-1.5 h-1.5 w-1.5 rounded-full ${dot}`}></span>
            {status}
          </div>
        </div>
        {/* Register button - right-aligned on desktop, below on mobile */}
        {showRegisterButton && (
          <div className="mt-4 w-full">
            {isRegistering ? (
              <>
                <TbScan className="h-4 w-4 animate-spin" />
                <span>Registering...</span>
              </>
            ) : (
              <RegisterAuthenticityDialog
                serialData={{
                  serialRaw: serial,
                  serialHash,
                  orderId,
                }}
              />
              // <></>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductItem;
