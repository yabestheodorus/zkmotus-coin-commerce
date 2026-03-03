import mongoose from 'mongoose';
import Product from '../models/product.model.js';
import Order from '../models/order.model.js';

export const getAllProduct = async (req, res) => {
    try {
        const { category } = req.query;

        const query = category ? { category } : {};

        const products = await Product.find(query).sort({ createdAt: -1 });

        return res.status(200).json({
            data: products,
        });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

export const getRecommendedProduct = async (req, res) => {
    const products = await Product.aggregate([
        { $addFields: { weight: { $cond: ['$isLimitedEdition', 2, 1] } } },
        { $sample: { size: 6 } },
    ]);

    res.json(products);
};

export const getProductDetailsById = async (req, res) => {
    const { id } = req.params;

    // 1. Validate ObjectId format
    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(400).json({
            error: 'Invalid product id',
        });
    }

    try {
        // 2. Query database
        const product = await Product.findById(id).lean();

        if (!product) {
            res.status(404).json({
                error: 'Product not found',
            });
        }

        // 3. Return product
        res.status(200).json({
            data: product,
        });
    } catch (err) {
        console.error('GET /products/:id error:', err);

        res.status(500).json({
            error: 'Internal server error',
        });
    }
};

export const getAllCategory = async (req, res) => {
    try {
        const categories = await Product.distinct('category');

        const formatted = categories.map((c) => ({
            value: c,
            label: c.replace('-', ' ').replace(/\b\w/g, (l) => l.toUpperCase()),
        }));

        return res.status(200).json({
            data: formatted,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Failed to fetch categories',
        });
    }
};

export const getProductByRawSerial = async (req, res) => {
    try {
        const { serialRaw } = req.params; // or req.query.serialRaw if using query param

        // Input validation
        if (!serialRaw || typeof serialRaw !== 'string') {
            return res.status(400).json({
                success: false,
                message: 'Valid serialRaw parameter is required',
            });
        }

        // Step 1: Find order containing the rawSerial
        const order = await Order.findOne(
            { 'serials.rawSerial': serialRaw },
            {
                'serials.$': 1, // projection: return only the matched serial array element
                buyerAddress: 1,
                status: 1,
                createdAt: 1,
            },
        );

        if (!order) {
            return res.status(404).json({
                success: false,
                message: 'Serial not found. This product may not be registered.',
            });
        }

        // Extract matched serial and productId
        const matchedSerial = order.serials[0]; // projection returns array with 1 item
        const { productId } = matchedSerial;

        // Step 2: Fetch product details
        const product = await Product.findById(productId).lean();

        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found for this serial',
            });
        }

        // Step 3: Compose response (exclude sensitive/internal fields if needed)
        const response = {
            success: true,
            data: {
                product: {
                    id: product._id,
                    name: product.name,
                    slug: product.slug,
                    category: product.category,
                    price: product.price,
                    currency: product.currency,
                    description: product.description,
                    imageURL: product.imageURL,
                    specification: product.specification,
                    features: product.features,
                    isLimitedEdition: product.isLimitedEdition,
                    authenticity: product.authenticity,
                    // ⚠️ Avoid exposing internal fields like serialConfig.format if not needed publicly
                },
                serial: {
                    serialHash: matchedSerial.serialHash,
                    status: matchedSerial.status,
                    registeredAt: order.createdAt,
                    orderStatus: order.status,
                    // Optional: include buyerAddress only if authenticated/authorized
                    // buyerAddress: order.buyyerAddress
                },
                verification: {
                    verified: matchedSerial.status === 'REGISTERED',
                    message:
                        matchedSerial.status === 'REGISTERED'
                            ? 'Authentic product registered on-chain'
                            : `Serial status: ${matchedSerial.status}`,
                },
            },
        };

        return res.status(200).json(response);
    } catch (error) {
        console.error('Error fetching product by serial:', error);

        // Handle mongoose cast error (invalid ObjectId)
        if (error instanceof mongoose.Error.CastError) {
            return res.status(400).json({
                success: false,
                message: 'Invalid product reference format',
            });
        }

        return res.status(500).json({
            success: false,
            message: 'Internal server error',
            ...(process.env.NODE_ENV === 'development' && { error: error.message }),
        });
    }
};
