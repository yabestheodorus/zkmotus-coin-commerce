import { formatEther } from "viem";

export const formatRoundedBalance = (weiValue, decimals = 8) => {
  const ethValue = formatEther(weiValue);
  return ethValue; // Returns string like "1.23"
}