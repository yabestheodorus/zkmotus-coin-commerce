# zkSneaker: Privacy-Preserving Sneaker Authenticity with ZK Proofs

## Overview

**zkSneaker** is a zero-knowledge proof powered system for authenticating sneakers purchased with cryptocurrency. It ensures:

- Ownership is **bound to the purchaser's wallet**.
- **Secrets remain private**; no identity or order details are revealed.
- **Replay attacks are prevented** using a challenge-response mechanism.
- Only **real buyers** can generate valid proofs.

This project demonstrates advanced **smart contract, frontend, and ZK circuit integration**, perfect for a portfolio showcasing **Web3, ZK apps, and full-stack blockchain skills**.

---

## Components

1. **Smart Contract (on-chain)**
   - Handles crypto payments.
   - Generates **authoritative txId** per purchase.
   - Stores **purchaseCommitments** tied to buyer (`msg.sender`).
   - Ensures only the payer can submit commitment for their purchase.

2. **Frontend Wallet/App**
   - Generates **private secret** per user.
   - Computes **purchaseCommitment = hash(secret + serialNumber)** locally.
   - Generates **ZK proof** when verifier requests authenticity check.
   - Secret remains private on device; never on-chain.

3. **Verifier**
   - Issues a **random challenge** for proof verification.
   - Checks ZK proof against on-chain purchaseCommitment.
   - Confirms sneaker authenticity without revealing user secret.

---

## End-to-End Flow

### Step 1: Payment

1. Alice selects a sneaker and pays via smart contract.
2. Smart contract generates **authoritative txId**:

```
txId = hash(msg.sender + serialNumber + block.number + timestamp)
```

3. Contract stores:

```
payments[msg.sender][serialNumber] = txId
```

---

### Step 2: Local Purchase Commitment

1. Frontend reads `txId` from contract/event.
2. Generates **private secret**:

```
aliceSecret = random()
```

3. Computes **purchaseCommitment** locally:

```
purchaseCommitment = hash(aliceSecret + serialNumber)
```

---

### Step 3: Submit Commitment

1. Alice submits:

```
commitment = purchaseCommitment
serialNumber = 123
txId = authoritative txId
```

2. Smart contract checks:

```
require(payments[msg.sender][serialNumber] == txId, "Invalid txId for sender")
commitments[msg.sender][serialNumber] = purchaseCommitment
```

- **Ownership is bound to msg.sender**.
- Alice cannot submit Bob’s txId; others cannot override her commitment.

---

### Step 4: Verification (Challenge-Response)

1. Verifier issues **random challenge**:

```
challenge = random_nonce()
```

2. Alice generates **ZK proof locally**:

```
public_inputs: {purchaseCommitment, serialNumber, challenge}
private_inputs: {aliceSecret, serialNumber}
```

- Circuit constraints:

```
hash(aliceSecret + serialNumber) == purchaseCommitment
proof = hash(purchaseCommitment + challenge)
```

---

### Step 5: Verification Check

- Alice submits proof:

```
{proof, serialNumber, challenge, purchaseCommitment}
```

- Verifier checks:

```
proof == hash(purchaseCommitment + challenge)
purchaseCommitment exists on-chain for msg.sender
serialNumber matches commitment
```

✅ Valid → sneaker authentic  
❌ Invalid → reject

---

## Circuit Inputs

### Public Inputs

| Name                 | Description                                   |
| -------------------- | --------------------------------------------- |
| `purchaseCommitment` | On-chain commitment (hash of secret + serial) |
| `serialNumber`       | Physical sneaker serial number                |
| `challenge`          | Random nonce for verification                 |

### Private Inputs

| Name           | Description                                         |
| -------------- | --------------------------------------------------- |
| `aliceSecret`  | User-generated secret stored locally                |
| `serialNumber` | Same as above (used internally for circuit hashing) |

### Constraint

```
hash(aliceSecret + serialNumber) == purchaseCommitment
proof = hash(purchaseCommitment + challenge)
```

---

## Security Properties

- **Ownership bound to msg.sender** → cannot steal someone else’s commitment.
- **Secrets never leave user device** → full privacy.
- **Replay attacks prevented** → challenge is unique per verification.
- **Fake purchases prevented** → only contract-generated txId per payer is valid.

---

## Portfolio & Demo Notes

- Shows **full-stack blockchain + ZK integration**.
- UI can mimic a **sneaker shop dashboard** for portfolio appeal.
- Easily extendable for:
  - Limited edition drops
  - Resale marketplaces
  - NFT bridging

---

## License

MIT
