import React from "react";
import { FiUser } from "react-icons/fi";
import { IoMdStar } from "react-icons/io";
import StatusBadge from "./components/StatusBadge";
import ProductItem from "./components/ProductItem";
import useGetOrderList from "./hook/useGetOrderList";
import { formatRoundedBalance } from "../../../Utils";
import InputSecretModal from "./components/InputSecretModal";

// Order Card Component
const OrderCard = ({ order }) => {
  const totalAmount = order.totalAmount;
  const deliveryDate = new Date(order.createdAt);
  deliveryDate.setDate(deliveryDate.getDate() + 3); // mock 3-day delivery
  const formattedDate = deliveryDate.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="order-card border-primaryGray overflow-hidden rounded-2xl border bg-white shadow-sm transition-all duration-300 hover:shadow-lg">
      {/* Header */}
      <div className="border-primaryGray flex items-center justify-between border-b p-6">
        <div className="flex grow flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-ink flex items-center gap-2 text-xl font-bold">
              <span className="text-primaryAccent">Order #</span>
              <span>{order.orderId}</span>
              <span className="text-ink/50 hidden md:inline-block">•</span>
              <span className="text-ink/70 text-sm font-normal">
                {order.items.length} Products
              </span>
            </h2>
            <p className="text-ink/60 mt-1 flex items-center gap-2 text-sm">
              <FiUser className="h-4 w-4" />

              <span className="font-medium">
                {new Date(order.createdAt).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
                , {new Date(order.createdAt).toLocaleDateString()}
              </span>
            </p>
          </div>
        </div>

        {order.status == "PAID" ? (
          <div className="rounded-full bg-gray-300 px-4 py-2">Order Paid</div>
        ) : (
          <InputSecretModal
            orderId={order.orderId}
            totalAmount={order.totalAmount}
          />
        )}
      </div>

      {/* Order Summary */}
      <div className="flex flex-col gap-6 p-6">
        <div className="flex justify-between space-y-3 gap-y-4 md:flex-row md:gap-x-6">
          <div className="flex items-center gap-2 text-sm">
            <span className="text-ink/70">Status:</span>
            <StatusBadge status={order.status} />
          </div>

          <div className="font-jakarta ml-6 flex flex-col items-end">
            <div className="flex items-center gap-2">
              <span className="text-md font-bold text-gray-400">Total</span>
            </div>
            <span className="text-burgundy text-xl font-bold">
              {formatRoundedBalance(totalAmount)} ETH
            </span>
          </div>
        </div>

        <div className="flex flex-col">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {order.serials?.map((item, idx) => {
              return (
                <ProductItem
                  key={idx}
                  product={item.productInfo}
                  quantity={item.quantity}
                  serial={item.rawSerial}
                  serialHash={item.serialHash}
                  orderId={order.orderId}
                  status={item.status}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

// Main Order List Page Component
export default function OrderList() {
  const { orderlist, isLoading, address } = useGetOrderList();

  return (
    <div className="bg-parchment min-h-screen pb-12">
      {/* Header */}
      <header className="border-primaryGray sticky top-0 z-10 border-b bg-white/80 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <h1 className="text-ink text-2xl font-bold tracking-tight">
            Your Orders
          </h1>
          <p className="text-ink/60 mt-1">
            Track, manage, and download invoices for all your purchases.
          </p>
        </div>
      </header>

      {/* Tabs */}
      <div className="mx-auto mt-6 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-wrap gap-2">
          {["Current", "Unpaid", "All orders"].map((tab) => (
            <button
              key={tab}
              className={`rounded-full px-5 py-2.5 text-sm font-medium transition-colors ${
                tab === "Current"
                  ? "bg-primaryAccent text-white shadow-sm"
                  : "bg-primaryGray text-ink hover:bg-ink/5"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Orders List */}
        <div className="space-y-6">
          {orderlist.map((order) => (
            <OrderCard key={order.orderId} order={order} />
          ))}
        </div>

        {/* Empty state (optional) */}
        {orderlist.length === 0 && (
          <div className="py-16 text-center">
            <div className="mb-4 text-6xl">📦</div>
            <h3 className="text-ink mb-2 text-xl font-semibold">
              No orders yet
            </h3>
            <p className="text-ink/60 mx-auto max-w-md">
              Your order history will appear here once you make a purchase.
              Explore our collection to get started.
            </p>
          </div>
        )}
      </div>

      {/* Footer ornament */}
      <div className="mx-auto mt-12 max-w-7xl px-4 pb-8 sm:px-6 lg:px-8">
        <div className="flex justify-center">
          <div className="text-primaryAccent font-playwrite flex items-center gap-3">
            <IoMdStar className="h-5 w-5" />
            <span>Curated with care</span>
            <IoMdStar className="h-5 w-5" />
          </div>
        </div>
      </div>
    </div>
  );
}
