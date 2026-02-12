import mongoose from "mongoose";
import Product from "../models/product.model.js";


export const getAllProduct = async (req, res) => {
  try {
    const { category } = req.query;

    const query = category ? { category } : {};

    const products = await Product.find(query)
      .sort({ createdAt: -1 });

    return res.status(200).json({
      data: products,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
}

export const getRecommendedProduct = async (req, res) => {
  const products = await Product.aggregate([
    { $addFields: { weight: { $cond: ["$isLimitedEdition", 2, 1] } } },
    { $sample: { size: 6 } },
  ]);

  res.json(products);
}

export const getProductDetailsById = async (req, res) => {
  const { id } = req.params;

  // 1. Validate ObjectId format
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({
      error: "Invalid product id",
    });
  }

  try {
    // 2. Query database
    const product = await Product.findById(id).lean();

    if (!product) {
      res.status(404).json({
        error: "Product not found",
      });
    }

    // 3. Return product
    res.status(200).json({
      data: product,
    });
  } catch (err) {
    console.error("GET /products/:id error:", err);

    res.status(500).json({
      error: "Internal server error",
    });
  }
}

export const getAllCategory = async (req, res) => {

  try {
    const categories = await Product.distinct("category");

    const formatted = categories.map((c) => ({
      value: c,
      label: c
        .replace("-", " ")
        .replace(/\b\w/g, (l) => l.toUpperCase()),
    }));

    return res.status(200).json({
      data: formatted,
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch categories",
    });
  }

}
