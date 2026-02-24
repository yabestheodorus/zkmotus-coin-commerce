import express from "express"
import Product from "../models/product.model.js";
import { getAllCategory, getAllProduct, getProductByRawSerial, getProductDetailsById, getRecommendedProduct } from "../controllers/product.controller.js";

const router = express.Router();

// GET all products
router.get('/', getAllProduct);

// routes/product.route.js
router.get("/recommended", getRecommendedProduct);

// routes/product.route.js
router.get("/categories", getAllCategory);

// GET product by serial number
router.get("/serial/:serialRaw", getProductByRawSerial);


router.get('/:id', getProductDetailsById);










export default router;
