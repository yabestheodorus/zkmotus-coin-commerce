import express from "express";
import Wishlist from "../models/wishlist.model.js";

const router = express.Router();


// GET wishlist count
router.get("/:userId/count", async (req, res) => {
  try {
    const wishlist = await Wishlist.findOne(
      { userId: req.params.userId },
      { products: 1 }
    );

    res.json({
      count: wishlist ? wishlist.products.length : 0,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// GET wishlist by userId
router.get("/:userId", async (req, res) => {
  try {
    const wishlist = await Wishlist.findOne({
      userId: req.params.userId,
    }).populate("products");

    res.json(wishlist || { userId: req.params.userId, products: [] });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ADD product to wishlist
router.post("/:userId/add", async (req, res) => {
  const { productId } = req.body;

  try {
    let wishlist = await Wishlist.findOne({
      userId: req.params.userId,
    });

    if (!wishlist) {
      wishlist = new Wishlist({
        userId: req.params.userId,
        products: [],
      });
    }

    if (!wishlist.products.includes(productId)) {
      wishlist.products.push(productId);
    }

    await wishlist.save();
    res.json(wishlist);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// REMOVE product from wishlist
router.post("/:userId/remove", async (req, res) => {
  const { productId } = req.body;

  try {
    const wishlist = await Wishlist.findOne({
      userId: req.params.userId,
    });

    if (!wishlist) {
      return res.status(404).json({ message: "Wishlist not found" });
    }

    wishlist.products = wishlist.products.filter(
      (id) => id.toString() !== productId
    );

    await wishlist.save();
    res.json(wishlist);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
