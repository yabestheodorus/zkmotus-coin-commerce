import Order from '../models/order.model.js';
import Product from '../models/product.model.js';
import { ethers } from 'ethers';
// import paymentAbi from "../abi/Payment.json";
import { poseidon2Hash } from '@zkpassport/poseidon2';
import { generateSerial, getLastSerialIndex, serialToBigInt } from './serial.controller.js';

import ZKMotusPayment from '../abi/ZKMotusPayment.abi.json' with { type: 'json' };
import ZKMotusRegistry from '../abi/ZKMotusRegistry.abi.json' with { type: 'json' };
import { generateNumericId } from '../utils/orderStateMachine.js';

import { zeroPadValue } from 'ethers';
import { id } from 'ethers';

export const getOrderList = async (req, res) => {
    const { buyerAddress } = req.query;

    // Validation
    if (!buyerAddress) {
        return res.status(400).json({ error: 'Buyer address is required' });
    }

    try {
        const orders = await Order.find({ status: { $in: ['CREATED', 'UNPAID', 'PAID'] }, buyerAddress }).sort({
            createdAt: -1,
        });

        // 2. Extract unique product IDs
        const productIds = [
            ...new Set([
                ...orders.flatMap((order) => order.items.map((item) => item.productId)),
                ...orders.flatMap((order) => order.serials.map((serial) => serial.productId)),
            ]),
        ];

        const products = await Product.find({ _id: { $in: productIds } });
        const productMap = products.reduce((acc, product) => {
            acc[product._id.toString()] = product.toObject();
            return acc;
        }, {});

        const result = orders.map((order) => {
            const plainOrder = order.toObject();
            return {
                ...plainOrder,
                items: plainOrder.items.map((item) => ({
                    ...item,
                    productInfo: productMap[item.productId],
                })),
                serials: plainOrder.serials.map((serial) => ({
                    ...serial,
                    productInfo: productMap[serial.productId],
                })),
            };
        });

        // console.log("result nya :", result)
        res.status(200).json({ data: result });
    } catch (err) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const prepareOrder = async (req, res) => {
    const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
    const signer = new ethers.Wallet(process.env.BACKEND_PK, provider);
    const paymentContract = new ethers.Contract(process.env.PAYMENT_CONTRACT, ZKMotusPayment, signer);

    const buyerAddress = req.body.buyerAddress;
    if (!buyerAddress) {
        return res.status(400).json({ error: 'Unspecified buyer address' });
    }

    const { items } = req.body;
    if (!items?.length) {
        return res.status(400).json({ error: 'No items' });
    }

    let totalAmount = 0;
    const orderItems = [];

    // 1️⃣ Validate products & calculate total
    for (const item of items) {
        const product = await Product.findById(item.productId);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        totalAmount += product.price * item.quantity;
        orderItems.push({
            productId: product._id,
            quantity: item.quantity,
            serialConfig: product.serialConfig, // IMPORTANT
        });
    }

    const orderId = generateNumericId();

    // 3️⃣ Generate serials (server-side only)
    const year = new Date().getFullYear();
    const serialCounterByProduct = {};
    const serials = [];

    for (const item of orderItems) {
        const productId = item.productId.toString();

        // fetch last index ONCE per product
        if (serialCounterByProduct[productId] === undefined) {
            serialCounterByProduct[productId] = await getLastSerialIndex(productId);
        }

        for (let i = 0; i < item.quantity; i++) {
            serialCounterByProduct[productId] += 1;

            const rawSerial = generateSerial({
                prefix: item.serialConfig.prefix,
                year,
                index: serialCounterByProduct[productId],
            });

            const serialHash = poseidon2Hash([serialToBigInt(rawSerial)]);

            // ✅ Convert BigInt to bytes32 hex string
            // ✅ Convert BigInt to bytes32 hex string (fixed)
            const serialHashBytes32 = zeroPadValue(
                ethers.toBeHex(serialHash), // Use ethers.toBeHex instead
                32,
            );

            serials.push({
                productId,
                rawSerial,
                serialHash: serialHashBytes32, // ✅ Now it's bytes32-compatible
                status: 'UNPAID',
            });
        }
    }

    // 2️⃣ Create DB skeleton FIRST (event-driven system)
    await Order.create({
        orderId,
        buyerAddress,
        items: orderItems,
        totalAmount,
        status: 'CREATING',
        serials,
    });

    // 4️⃣ Gatekeeper: create order on-chain
    try {
        const tx = await paymentContract.createNewOrder(
            orderId,
            serials.map((s) => s.serialHash),
            totalAmount,
        );
        await tx.wait();
    } catch (error) {
        console.log('Failed creating order contract call : ', error);
        await Order.deleteOne({ orderId });
        return res.status(500).json({ error: 'createNewOrder reverted' });
    }

    // 5️⃣ DB waits for blockchain event
    return res.status(200).json({
        orderId,
        totalAmount,
        next: 'PAY',
    });
};

export const verifyProof = async (req, res) => {
    try {
        let { proof, serialNumber, nonce } = req.body;

        // 🔥 Normalize inputs
        if (!proof || !serialNumber || !nonce) {
            return res.status(400).json({
                success: false,
                message: 'Missing proof / serialNumber / nonce',
            });
        }

        const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);

        const wallet = new ethers.Wallet(process.env.BACKEND_PK, provider);

        const registryContract = new ethers.Contract(process.env.REGISTRY_CONTRACT, ZKMotusRegistry, wallet);

        // Ensure hex format
        if (!proof.startsWith('0x')) proof = '0x' + proof;
        if (!serialNumber.startsWith('0x')) serialNumber = '0x' + serialNumber;
        if (!nonce.startsWith('0x')) nonce = '0x' + nonce;

        console.log('Calling verifyAuthenticity...');
        console.log(
            'ZKMotusRegistry__ItemsAlreadyRegistered:',
            id('ZKMotusRegistry__ItemsAlreadyRegistered(bytes32)').slice(0, 10),
        );

        console.log(
            'ZKMotusRegistry__UnauthorizedBuyer:',
            id('ZKMotusRegistry__UnauthorizedBuyer(bytes32)').slice(0, 10),
        );

        console.log('ZKMotusRegistry__ItemNotPaid:', id('ZKMotusRegistry__ItemNotPaid(bytes32)').slice(0, 10));

        console.log('ZKMotusRegistry__NotFromMerchant:', id('ZKMotusRegistry__NotFromMerchant(address)').slice(0, 10));

        console.log('ZKMotusRegistry__ZeroValue:', id('ZKMotusRegistry__ZeroValue()').slice(0, 10));

        console.log(
            'ZKMotusRegistry__ItemNotRegistered:',
            id('ZKMotusRegistry__ItemNotRegistered(bytes32)').slice(0, 10),
        );

        console.log('ZKMotusRegistry__InvalidNonce:', id('ZKMotusRegistry__InvalidNonce(bytes32)').slice(0, 10));

        console.log('ZKMotusRegistry__InvalidProof:', id('ZKMotusRegistry__InvalidProof()').slice(0, 10));
        // 🚀 Send tx
        const tx = await registryContract.verifyAuthenticity(proof, serialNumber, nonce);

        const receipt = await tx.wait();

        return res.status(200).json({
            success: true,
            txHash: receipt.hash,
        });
    } catch (err) {
        console.error('verifyProof error:', err);

        return res.status(500).json({
            success: false,
            message: 'Verification failed',
            error: parseEthersError(err),
        });
    }
};
