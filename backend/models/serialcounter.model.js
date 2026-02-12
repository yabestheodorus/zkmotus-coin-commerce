// models/SerialCounter.js
import mongoose from "mongoose";

const SerialCounterSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, unique: true },
  lastIndex: { type: Number, required: true },
});

export const SerialCounter = mongoose.model(
  "SerialCounter",
  SerialCounterSchema
);
