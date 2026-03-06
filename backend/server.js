import dotenv from 'dotenv';
dotenv.config();
import ZKMotusPayment from './abi/ZKMotusPayment.abi.json' with { type: 'json' };

import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db.js';
import productRoutes from './routes/product.route.js';
import wishlistRoutes from './routes/wishlist.route.js';
import orderRoutes from './routes/order.route.js';
import './controllers/order.events.js';
import { setupOrderEvents } from './controllers/order.events.js';
import { ethers } from 'ethers';

const app = express();

// Connect DB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

setupOrderEvents().catch((err) => {
    console.error('❌ Failed to setup blockchain listeners:', err);
    process.exit(1); // Critical failure — stop server
});

// Routes
app.use('/api/products', productRoutes);
app.use('/api/wishlist', wishlistRoutes);
app.use('/api/order', orderRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
