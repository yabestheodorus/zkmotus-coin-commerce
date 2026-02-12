import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    orderId: String,
    buyerAddress: String,
    totalAmount: Number,
    status: String, // CREATED → PREPARED → PAID
    items: [
      {
        productId: String,
        quantity: Number,
      }
    ],
    serials: [
      {
        productId: String,
        rawSerial: String, // backend-only
        serialHash: String,
        status: String, // UNPAID → PAID → REGISTERED
      }
    ]
  },
  { timestamps: true }
);

export default mongoose.model("Order", OrderSchema);
