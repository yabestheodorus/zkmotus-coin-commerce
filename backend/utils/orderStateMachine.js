const transitions = {
  CREATED: ["PAYMENT_PENDING", "CANCELLED", "EXPIRED"],
  PAYMENT_PENDING: ["PAID", "CANCELLED", "EXPIRED"],
  PAID: ["FULFILLED", "REFUNDED"],
  FULFILLED: ["COMPLETED", "REFUNDED"],
};

export function assertTransition(from, to) {
  if (!transitions[from]?.includes(to)) {
    throw new Error(`Invalid order transition: ${from} → ${to}`);
  }
}


export const generateNumericId = () => {
  const timestamp = Date.now().toString(); // e.g. "1700000000000"
  const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
  return timestamp + random; // e.g. "17000000000005678"
}