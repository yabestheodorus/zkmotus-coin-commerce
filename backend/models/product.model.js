import mongoose from "mongoose";

const ImageSchema = new mongoose.Schema(
  {
    thumbnail: { type: String, required: true },
    gallery: [{ type: String }],
  },
  { _id: false }
);

const SerialConfigSchema = new mongoose.Schema(
  {
    prefix: { type: String, required: true },
    format: { type: String, required: true },
  },
  { _id: false }
);

const AuthenticitySchema = new mongoose.Schema(
  {
    zkEnabled: { type: Boolean, default: false },
    proofType: {
      type: String,
      enum: ["ownership-proof", "authenticity-proof"],
      required: true,
    },
  },
  { _id: false }
);

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      required: true,
      lowercase: true,
      index: true,
    },

    category: {
      type: String,
      required: true,
      enum: [
        "wallet",
        "handbag",
        "sneakers",
        "running-shoes",
        "tshirt",
        "backpack"
      ],
      index: true,
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    currency: {
      type: String,
      default: "USD",
    },

    description: {
      type: String,
      required: true,
    },

    imageURL: {
      type: ImageSchema,
      required: true,
    },

    specification: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
    },

    features: {
      type: [String],
      default: [],
    },

    isLimitedEdition: {
      type: Boolean,
      default: false,
    },

    maxSupply: {
      type: Number,
      default: null,
    },

    serialConfig: {
      type: SerialConfigSchema,
      required: true,
    },

    authenticity: {
      type: AuthenticitySchema,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Optional but very realistic index
ProductSchema.index({ category: 1, price: 1 });

export default mongoose.model("Product", ProductSchema);
