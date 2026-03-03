import { ethers } from 'ethers';
import ZKMotusPayment from '../abi/ZKMotusPayment.abi.json' with { type: 'json' };
import ZKMotusRegistry from '../abi/ZKMotusRegistry.abi.json' with { type: 'json' };
import Order from '../models/order.model.js';
import { SerialCounter } from '../models/serialcounter.model.js';

export async function setupOrderEvents() {
    // Validate env at runtime (not module load)
    if (!process.env.RPC_URL || !process.env.BACKEND_PK || !process.env.PAYMENT_CONTRACT) {
        throw new Error('Missing blockchain env vars: RPC_URL, BACKEND_PK, PAYMENT_CONTRACT');
    }

    const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
    const paymentContract = new ethers.Contract(process.env.PAYMENT_CONTRACT, ZKMotusPayment, provider);

    const registryContract = new ethers.Contract(process.env.REGISTRY_CONTRACT, ZKMotusRegistry, provider);

    paymentContract.on('*', (event) => {
        console.log('Event caught:', event.event, event.args);
    });

    paymentContract.on('OrderCreated', async (orderId, totalPrice) => {
        console.log('🎉 OrderCreated event triggered!', { orderId, totalPrice });
        try {
            const order = await Order.findOne({ orderId: orderId.toString() });
            if (!order) {
                console.log('⚠️ Order not found');
                return;
            }
            if (order.status === 'UNPAID') {
                console.log('ℹ️ Already UNPAID');
                return;
            }

            updateSerialCounterBasedOnProductQty(order);

            order.status = 'UNPAID';
            await order.save();
            console.log('✅ Order status updated');
        } catch (error) {
            console.error('❌ Error handling event:', error);
        }
    });

    paymentContract.on('OrderPaid', async (orderId, orderCommitment, amount, serialNumbers) => {
        try {
            const orderIdStr = orderId.toString();

            const order = await Order.findOne({ orderId: orderIdStr });

            if (!order) {
                console.warn(`❌ Order not found for ID: ${orderIdStr}`);
                return;
            }

            let updatedCount = 0;
            for (const sn of serialNumbers) {
                const snStr = sn.toString().toLowerCase(); // e.g. "0x0142b50e..."

                const s = order.serials.find((x) => x.serialHash?.toLowerCase() === snStr);

                if (s && s.status !== 'UNREGISTERED') {
                    s.status = 'UNREGISTERED';
                    updatedCount++;
                }
            }

            if (updatedCount === 0) {
                console.warn('⚠️ No serials were updated! Possible hash mismatch.');
                console.log(
                    'Event serials:',
                    serialNumbers.map((s) => s.toString()),
                );
                console.log(
                    'DB serials:',
                    order.serials.map((s) => s.serialHash),
                );
                return; // optional: skip save if nothing changed
            }

            // 4️⃣ Finalize order
            order.orderCommitment = orderCommitment;
            order.amountPaid = amount;
            order.status = 'PAID';
            await order.save();
            console.log(`✅ Updated ${updatedCount} serials to UNREGISTERED for order ${orderIdStr}`);
        } catch (error) {
            console.error('❌ OrderPaid handler error:', error);
        }
    });

    registryContract.on('ItemsAuthenticityRegistered', async (serialNumber) => {
        try {
            const serialHash = serialNumber.toString().toLowerCase();

            // Find order containing this serial in UNREGISTERED state
            const order = await Order.findOne({
                'serials.serialHash': serialHash,
                'serials.status': 'UNREGISTERED',
            });

            if (!order) {
                console.warn(`⚠️ No UNREGISTERED serial found for hash: ${serialHash}`);
                return;
            }

            // Update serial status to REGISTERED
            const serial = order.serials.find((s) => s.serialHash.toLowerCase() === serialHash);

            if (serial) {
                serial.status = 'REGISTERED';
                await order.save();
                console.log(`✅ Serial ${serialHash} updated to REGISTERED`);
            }
        } catch (error) {
            console.error('❌ ItemsAuthenticityRegistered handler error:', error);
        }
    });

    console.log('✅ Order event listeners initialized');
    return () => paymentContract.removeAllListeners(); // Cleanup function
}

const updateSerialCounterBasedOnProductQty = async (order) => {
    // 2️⃣ Count per product
    const qtyByProduct = {};
    for (const s of order.serials) {
        qtyByProduct[s.productId] = (qtyByProduct[s.productId] || 0) + 1;
    }

    // 3️⃣ Advance serial counters (source of truth)
    for (const [productId, qty] of Object.entries(qtyByProduct)) {
        await SerialCounter.updateOne({ productId }, { $inc: { lastIndex: qty } });
    }
};
