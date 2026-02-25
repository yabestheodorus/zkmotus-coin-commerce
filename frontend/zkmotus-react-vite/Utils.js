import { formatEther, sha256, stringToHex } from "viem";

export const formatRoundedBalance = (weiValue, decimals = 8) => {
  const ethValue = formatEther(weiValue);
  return ethValue; // Returns string like "1.23"
}


export const stringToBigInt = (str) => {
  if (!str || typeof str !== 'string') {
    throw new Error('Invalid secret: must be a non-empty string');
  }

  const hash = sha256(str);
  let value = BigInt(hash);

  // Modulo dengan max Field Noir
  const FIELD_PRIME = BigInt('0x30644e72e131a029b85045b68181585d2833e84879b9709143e1f593f0000001');
  value = value % FIELD_PRIME;

  return value;
}

export const serialToBigInt = (rawSerial) => {
  return BigInt(stringToHex(rawSerial));
};

export const generateBytes32Nonce = () => {
  // Noir BN254 Field prime (254-bit)
  const FIELD_PRIME = BigInt('0x30644e72e131a029b85045b68181585d2833e84879b9709143e1f593f0000001');

  const bytes = new Uint8Array(32);
  crypto.getRandomValues(bytes);

  // Convert to BigInt
  let nonce = BigInt('0x' + Array.from(bytes).map(b => b.toString(16).padStart(2, '0')).join(''));

  // Modulo dengan field prime agar pasti dalam range
  nonce = nonce % FIELD_PRIME;

  // Return sebagai hex string dengan prefix 0x
  return '0x' + nonce.toString(16);
};

export const base64ToBytes = (base64) => {
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
}
