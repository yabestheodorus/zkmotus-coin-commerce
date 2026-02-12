import { z } from "zod";

// === Shared Enums ===
const OrderStatusSchema = z.enum(["CREATED", "PREPARED", "PAID"]);
const SerialStatusSchema = z.enum(["UNPAID", "PAID", "REGISTERED"]);

// === Serial Item Schema (matches DB) ===
const SerialItemSchema = z.object({
  productId: z.string(),
  rawSerial: z.string(), // internal, not exposed to client
  serialHash: z.string(),
  status: SerialStatusSchema,
});

// === Order Item Schema (for purchased products) ===
const OrderItemSchema = z.object({
  productId: z.string().min(1, "Product ID required"),
  quantity: z.number().int().min(1, "Quantity must be at least 1"),
});

// === Full Order Schema (matches Mongoose model) ===
export const OrderSchema = z.object({
  _id: z.unknown().optional(), // will be ObjectId in DB
  orderId: z.string(),
  buyerAddress: z.string().min(10, "Invalid wallet address"),
  totalAmount: z.string(), // stored as string (e.g., "35000000000000" wei)
  status: OrderStatusSchema,
  items: z.array(OrderItemSchema).min(1, "At least one item required"),
  serials: z.array(SerialItemSchema).optional(), // may be empty until assigned
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

// === Input: Create Order (client request) ===
export const createOrderSchema = z.object({
  buyerAddress: z.string().min(10, "Invalid wallet address"),
  items: z.array(OrderItemSchema).min(1, "At least one item required"),
});

// === Input: Pay Order (client request) ===
export const payOrderSchema = z.object({
  orderId: z.string().min(1, "Order ID required"),
  paymentMethod: z.enum(["CRYPTO", "STRIPE"]),
  txHash: z.string().length(66, "Invalid transaction hash (must be 66 chars)").optional(),
  chainId: z.number().int().positive().optional(),
}).refine(
  (data) => {
    if (data.paymentMethod === "CRYPTO") {
      return data.txHash != null && data.chainId != null;
    }
    return true;
  },
  {
    message: "txHash and chainId are required for CRYPTO payments",
    path: ["txHash", "chainId"],
  }
);