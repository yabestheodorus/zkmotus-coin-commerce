import dotenv from "dotenv";
dotenv.config();


import { connectDB } from "./config/db.js";
import mongoose from "mongoose";
import Order from "./models/order.model.js";


async function deleteAllOrders() {
  try {
    // Connect to MongoDB
    await connectDB();
    console.log("✅ Connected to MongoDB");

    // Count before deletion
    const countBefore = await Order.countDocuments();
    console.log(`📊 Found ${countBefore} orders`);

    if (countBefore === 0) {
      console.log("ℹ️ No orders to delete");
      await mongoose.connection.close();
      return;
    }

    // Delete all orders
    const result = await Order.deleteMany({});

    console.log(`🗑️ Deleted ${result.deletedCount} orders`);

    // Verify deletion
    const countAfter = await Order.countDocuments();
    console.log(`✅ Verification: ${countAfter} orders remaining`);

    await mongoose.connection.close();
    console.log("🔌 Database connection closed");

  } catch (error) {
    console.error("❌ Error deleting orders:", error);
    process.exit(1);
  }
}

deleteAllOrders();