import { ethers } from "ethers";
import { SerialCounter } from "../models/serialcounter.model.js";

export const getLastSerialIndex = async (productId) => {
  const counter = await SerialCounter.findOne({ productId });

  if (!counter) {
    // first serial ever for this product
    await SerialCounter.create({
      productId,
      lastIndex: 0,
    });
    return 0;
  }

  return counter.lastIndex;
}

export const generateSerial = ({ prefix, year, index }) => {
  const padded = String(index).padStart(4, "0");
  return `${prefix}-${year}-${padded}`;
}

// Poseidon requires field elements (bigint), not strings
export const serialToBigInt = (rawSerial) => {
  const bytes = ethers.toUtf8Bytes(rawSerial);
  return BigInt(ethers.hexlify(bytes));
}
