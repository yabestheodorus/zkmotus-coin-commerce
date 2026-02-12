import { FiClock } from "react-icons/fi";
import { FaCheckCircle, FaTruck, FaBoxOpen } from "react-icons/fa";

const StatusBadge = ({ status }) => {
  const statusConfig = {
    CREATED: {
      text: "Created",
      color: "bg-primaryGray text-ink",
      icon: <FiClock className="h-4 w-4" />,
    },
    PREPARED: {
      text: "Prepared",
      color: "bg-amber-100 text-amber-800",
      icon: <FaTruck className="h-4 w-4" />,
    },
    PAID: {
      text: "Paid",
      color: "bg-emerald-50 text-emerald-700",
      icon: <FaCheckCircle className="h-4 w-4" />,
    },
    REGISTERED: {
      text: "Registered",
      color: "bg-indigo-50 text-indigo-700",
      icon: <FaBoxOpen className="h-4 w-4" />,
    },
    UNPAID: {
      text: "Unpaid",
      color: "bg-red-50 text-red-700",
      icon: <FiClock className="h-4 w-4" />,
    },
    SHIPPED: {
      text: "Shipped",
      color: "bg-cyan-50 text-cyan-700",
      icon: <FaTruck className="h-4 w-4" />,
    },
  };

  const config = statusConfig[status] || statusConfig.CREATED;
  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1.5 text-xs font-medium ${config.color} animate-fadeIn`}
    >
      {config.icon}
      <span className="ml-1.5">{config.text}</span>
    </span>
  );
};

export default StatusBadge;
