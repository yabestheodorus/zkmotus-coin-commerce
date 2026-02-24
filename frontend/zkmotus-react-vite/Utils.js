import { formatEther, sha256, stringToHex } from "viem";

export const formatRoundedBalance = (weiValue, decimals = 8) => {
  const ethValue = formatEther(weiValue);
  return ethValue; // Returns string like "1.23"
}


export const stringToBigInt = (str) => {
  if (!str || typeof str !== 'string') {
    throw new Error('Invalid secret: must be a non-empty string');
  }
  // SHA-256 hash → hex → BigInt
  const hash = sha256(str);

  return BigInt(hash);
}

export const serialToBigInt = (rawSerial) => {
  return BigInt(stringToHex(rawSerial));
};