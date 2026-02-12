import dotenv from "dotenv";
import mongoose from "mongoose";
import { connectDB } from "./config/db.js";
import Product from "./models/product.model.js";

dotenv.config();

const products = [
  // =========================
  // WALLETS (6)
  // =========================
  {
    name: "Knits ♦ Zero",
    slug: "arc-obsidian-grain",
    category: "wallet",
    price: 3.5e12, // was 35e14 → now 0.0035 "ETH"
    currency: "ETH",
    description: "Minimalist luxury wallet crafted from full-grain Italian leather.",
    imageURL: {
      thumbnail: "/images/products/ZKMotus_knits_zero.png",
      gallery: [
        "/images/products/ZKMotus_knits_zero.png",
        "/images/products/ZKMotus_knits_zero.png",
      ],
    },
    specification: {
      dimensions: "110 x 90 x 12 mm",
      material: "Full-grain Italian leather",
    },
    features: ["6 card slots", "RFID shielding", "Slim profile"],
    isLimitedEdition: false,
    maxSupply: null,
    serialConfig: { prefix: "ZKM-KNT", format: "ZKM-KNT-YYYY-XXXX" },
    authenticity: { zkEnabled: true, proofType: "ownership-proof" },
  },
  {
    name: "Knits ♦ Onyx",
    slug: "arc-proof-edition",
    category: "wallet",
    price: 9.5e12, // was 95e14
    currency: "ETH",
    description: "Limited serialized wallet with zero-knowledge authenticity.",
    imageURL: {
      thumbnail: "/images/products/ZKMotus_knits_onyx.png",
      gallery: ["/images/products/ZKMotus_knits_onyx.png"],
    },
    specification: {
      dimensions: "110 x 90 x 12 mm",
      material: "Embossed calf leather",
    },
    features: ["Serialized edition", "Collector grade"],
    isLimitedEdition: true,
    maxSupply: 500,
    serialConfig: { prefix: "ZKM-KNT-O", format: "ZKM-KNT-O-YYYY-XXXX" },
    authenticity: { zkEnabled: true, proofType: "ownership-proof" },
  },
  {
    name: "Knits ♦ Signature",
    slug: "fold-carbon-noir",
    category: "wallet",
    price: 7.5e12, // was 75e14
    currency: "ETH",
    description: "Ultra-slim wallet with carbon-textured leather finish.",
    imageURL: {
      thumbnail: "/images/products/ZKMotus_knits_signature.png",
      gallery: ["/images/products/ZKMotus_knits_signature.png"],
    },
    specification: {
      dimensions: "105 x 85 x 10 mm",
      material: "Carbon-pattern leather",
    },
    features: ["Minimal carry", "Magnetic closure"],
    isLimitedEdition: false,
    maxSupply: null,
    serialConfig: { prefix: "ZKM-KNT-SG", format: "ZKM-KNT-SG-YYYY-XXXX" },
    authenticity: { zkEnabled: true, proofType: "ownership-proof" },
  },
  {
    name: "Knits ♦ Prime",
    slug: "fold-ivory-proof",
    category: "wallet",
    price: 11e12, // was 110e14
    currency: "ETH",
    description: "Ivory leather wallet, limited and serialized.",
    imageURL: {
      thumbnail: "/images/products/ZKMotus_knit_prime.png",
      gallery: ["/images/products/ZKMotus_knit_prime.png"],
    },
    specification: {
      dimensions: "105 x 85 x 10 mm",
      material: "Italian ivory leather",
    },
    features: ["Limited run", "Soft-touch leather"],
    isLimitedEdition: true,
    maxSupply: 300,
    serialConfig: { prefix: "ZKM-FLD-P", format: "ZKM-FLD-P-YYYY-XXXX" },
    authenticity: { zkEnabled: true, proofType: "ownership-proof" },
  },
  {
    name: "Knits ♦ Solid",
    slug: "vault-mono",
    category: "wallet",
    price: 6.5e12, // was 65e14
    currency: "ETH",
    description: "Secure mono-pocket wallet designed for travel.",
    imageURL: {
      thumbnail: "/images/products/ZKMotus_knit_solid.png",
      gallery: ["/images/products/ZKMotus_knit_solid.png"],
    },
    specification: {
      dimensions: "115 x 75 x 8 mm",
      material: "Vegetable-tanned leather",
    },
    features: ["Travel ready", "Hidden pocket"],
    isLimitedEdition: false,
    maxSupply: null,
    serialConfig: { prefix: "ZKM-VLT", format: "ZKM-VLT-YYYY-XXXX" },
    authenticity: { zkEnabled: true, proofType: "ownership-proof" },
  },
  {
    name: "Knits ♦ Bold",
    slug: "vault-genesis",
    category: "wallet",
    price: 12e12, // was 120e14
    currency: "ETH",
    description: "Genesis limited wallet marking the first release.",
    imageURL: {
      thumbnail: "/images/products/ZKMotus_knit_bold.png",
      gallery: ["/images/products/ZKMotus_knit_bold.png"],
    },
    specification: {
      dimensions: "115 x 75 x 8 mm",
      material: "Heritage leather",
    },
    features: ["Genesis edition", "Collector item"],
    isLimitedEdition: true,
    maxSupply: 200,
    serialConfig: { prefix: "ZKM-VLT-G", format: "ZKM-VLT-G-YYYY-XXXX" },
    authenticity: { zkEnabled: true, proofType: "ownership-proof" },
  },

  // =========================
  // HANDBAGS (5)
  // =========================
  {
    name: "Arc ♦ Studio",
    slug: "strata-noir-carry",
    category: "handbag",
    price: 12e12, // was 120e14
    currency: "ETH",
    description: "Architectural handbag with premium materials.",
    imageURL: {
      thumbnail: "/images/products/ZKMotus_arc_studio.png",
      gallery: ["/images/products/ZKMotus_arc_studio.png"],
    },
    specification: {
      dimensions: "380 x 280 x 140 mm",
      material: "Coated canvas with leather trim",
    },
    features: ["Laptop compartment", "Internal organizer"],
    isLimitedEdition: false,
    maxSupply: null,
    serialConfig: { prefix: "ZKM-STR", format: "ZKM-STR-YYYY-XXXX" },
    authenticity: { zkEnabled: true, proofType: "ownership-proof" },
  },
  {
    name: "Strata ♦ Nargo",
    slug: "strata-proof",
    category: "handbag",
    price: 18e12, // was 180e14
    currency: "ETH",
    description: "Limited Strata handbag with serialized production.",
    imageURL: {
      thumbnail: "/images/products/ZKMotus_Strata_nargo.png",
      gallery: ["/images/products/ZKMotus_Strata_nargo.png"],
    },
    specification: {
      dimensions: "380 x 280 x 140 mm",
      material: "Embossed leather",
    },
    features: ["Serialized", "Luxury lining"],
    isLimitedEdition: true,
    maxSupply: 150,
    serialConfig: { prefix: "ZKM-STR-P", format: "ZKM-STR-P-YYYY-XXXX" },
    authenticity: { zkEnabled: true, proofType: "ownership-proof" },
  },
  {
    name: "Flux ♦ Vector",
    slug: "halo-urban-tote",
    category: "handbag",
    price: 9.5e12, // was 95e14
    currency: "ETH",
    description: "Modern tote for everyday luxury.",
    imageURL: {
      thumbnail: "/images/products/ZKMotus_flux_vector.png",
      gallery: ["/images/products/ZKMotus_flux_vector.png"],
    },
    specification: {
      dimensions: "400 x 300 x 120 mm",
      material: "Premium canvas",
    },
    features: ["Lightweight", "Wide opening"],
    isLimitedEdition: false,
    maxSupply: null,
    serialConfig: { prefix: "ZKM-HAL", format: "ZKM-HAL-YYYY-XXXX" },
    authenticity: { zkEnabled: true, proofType: "ownership-proof" },
  },
  {
    name: "Flux ♦ Veloce",
    slug: "halo-night-proof",
    category: "handbag",
    price: 16e12, // was 160e14
    currency: "ETH",
    description: "Night-proof edition Halo handbag.",
    imageURL: {
      thumbnail: "/images/products/ZKMotus_flux_veloce.png",
      gallery: ["/images/products/ZKMotus_flux_veloce.png"],
    },
    specification: {
      dimensions: "400 x 300 x 120 mm",
      material: "Textured leather",
    },
    features: ["Limited run", "Collector grade"],
    isLimitedEdition: true,
    maxSupply: 120,
    serialConfig: { prefix: "ZKM-HAL-P", format: "ZKM-HAL-P-YYYY-XXXX" },
    authenticity: { zkEnabled: true, proofType: "ownership-proof" },
  },
  {
    name: "Flux ♦ Noir",
    slug: "axis-carry",
    category: "handbag",
    price: 14e12, // was 140e14
    currency: "ETH",
    description: "Structured carry bag for business and travel.",
    imageURL: {
      thumbnail: "/images/products/ZKMotus_Flux_noir.png",
      gallery: ["/images/products/ZKMotus_Flux_noir.png"],
    },
    specification: {
      dimensions: "420 x 310 x 150 mm",
      material: "Hybrid leather-canvas",
    },
    features: ["Structured base", "Travel ready"],
    isLimitedEdition: false,
    maxSupply: null,
    serialConfig: { prefix: "ZKM-AXS", format: "ZKM-AXS-YYYY-XXXX" },
    authenticity: { zkEnabled: true, proofType: "ownership-proof" },
  },

  // =========================
  // SNEAKERS (3)
  // =========================
  {
    name: "Onyx ♦ Black",
    slug: "vector-obsidian-core",
    category: "sneakers",
    price: 8e12, // was 80e14
    currency: "ETH",
    description: "Urban luxury sneakers engineered for comfort.",
    imageURL: {
      thumbnail: "/images/products/ZKMotus_onyx_black.png",
      gallery: ["/images/products/ZKMotus_onyx_black.png"],
    },
    specification: {
      upper: "Engineered knit",
      sole: "Carbon rubber",
    },
    features: ["Breathable", "Shock absorbing"],
    isLimitedEdition: false,
    maxSupply: null,
    serialConfig: { prefix: "ZKM-VEC", format: "ZKM-VEC-YYYY-XXXX" },
    authenticity: { zkEnabled: true, proofType: "ownership-proof" },
  },
  {
    name: "Onyx ♦ Signature",
    slug: "vector-proof",
    category: "sneakers",
    price: 13.5e12, // was 135e14
    currency: "ETH",
    description: "Limited Vector sneaker with serialized supply.",
    imageURL: {
      thumbnail: "/images/products/ZKMotus_onyx_signature.png",
      gallery: ["/images/products/ZKMotus_onyx_signature.png"],
    },
    specification: {
      upper: "Premium Leather",
      sole: "Custom compound",
    },
    features: ["Limited edition", "Collector piece"],
    isLimitedEdition: true,
    maxSupply: 250,
    serialConfig: { prefix: "ZKM-VEC-P", format: "ZKM-VEC-P-YYYY-XXXX" },
    authenticity: { zkEnabled: true, proofType: "ownership-proof" },
  },
  {
    name: "Aether ♦ Weave",
    slug: "flux-street",
    category: "sneakers",
    price: 7e12, // was 70e14
    currency: "ETH",
    description: "Street-focused luxury sneaker.",
    imageURL: {
      thumbnail: "/images/products/ZKMotus_Aether_Weave.png",
      gallery: ["/images/products/ZKMotus_Aether_Weave.png"],
    },
    specification: {
      upper: "Mesh leather blend",
      sole: "Rubber outsole",
    },
    features: ["Daily wear", "Lightweight"],
    isLimitedEdition: false,
    maxSupply: null,
    serialConfig: { prefix: "ZKM-FLX", format: "ZKM-FLX-YYYY-XXXX" },
    authenticity: { zkEnabled: true, proofType: "ownership-proof" },
  },

  // =========================
  // RUNNING SHOES (4)
  // =========================
  {
    name: "Strata ♦ VG",
    slug: "veloce-proof",
    category: "sneakers",
    price: 15e12, // was 150e14
    currency: "ETH",
    description: "High-performance running shoe with limited supply.",
    imageURL: {
      thumbnail: "/images/products/ZKMotus_strata_VG.png",
      gallery: ["/images/products/ZKMotus_strata_VG.png"],
    },
    specification: {
      upper: "Performance mesh",
      sole: "Energy return foam",
    },
    features: ["Race ready", "Serialized"],
    isLimitedEdition: true,
    maxSupply: 300,
    serialConfig: { prefix: "ZKM-VEL-P", format: "ZKM-VEL-P-YYYY-XXXX" },
    authenticity: { zkEnabled: true, proofType: "ownership-proof" },
  },
  {
    name: "Strata ♦ GD",
    slug: "veloce-core",
    category: "sneakers",
    price: 9e12, // was 90e14
    currency: "ETH",
    description: "Daily trainer with luxury finish.",
    imageURL: {
      thumbnail: "/images/products/ZKMotus_strata_GD.png",
      gallery: ["/images/products/ZKMotus_strata_GD.png"],
    },
    specification: {
      upper: "Breathable mesh",
      sole: "Foam compound",
    },
    features: ["Comfort ride", "Durable"],
    isLimitedEdition: false,
    maxSupply: null,
    serialConfig: { prefix: "ZKM-VEL", format: "ZKM-VEL-YYYY-XXXX" },
    authenticity: { zkEnabled: true, proofType: "ownership-proof" },
  },
  {
    name: "Strata ♦ ZG",
    slug: "aero-night",
    category: "sneakers",
    price: 8.5e12, // was 85e14
    currency: "ETH",
    description: "Night-run focused performance shoe.",
    imageURL: {
      thumbnail: "/images/products/ZKMotus_strata_zg.png",
      gallery: ["/images/products/ZKMotus_strata_zg.png"],
    },
    specification: {
      upper: "Reflective mesh",
      sole: "Grip outsole",
    },
    features: ["Night visibility", "Lightweight"],
    isLimitedEdition: false,
    maxSupply: null,
    serialConfig: { prefix: "ZKM-AER", format: "ZKM-AER-YYYY-XXXX" },
    authenticity: { zkEnabled: true, proofType: "ownership-proof" },
  },
  {
    name: "Strata ♦ TD",
    slug: "aero-proof",
    category: "sneakers",
    price: 17.5e12, // was 175e14
    currency: "ETH",
    description: "Limited Aero performance runner.",
    imageURL: {
      thumbnail: "/images/products/ZKMotus_strata_TD.png",
      gallery: ["/images/products/ZKMotus_strata_TD.png"],
    },
    specification: {
      upper: "Premium mesh",
      sole: "Carbon-infused foam",
    },
    features: ["Limited run", "Race grade"],
    isLimitedEdition: true,
    maxSupply: 200,
    serialConfig: { prefix: "ZKM-AER-P", format: "ZKM-AER-P-YYYY-XXXX" },
    authenticity: { zkEnabled: true, proofType: "ownership-proof" },
  },

  // =========================
  // T-SHIRTS (2)
  // =========================
  {
    name: "Aether ♦ Rem",
    slug: "aether-noir",
    category: "tshirt",
    price: 1.5e12, // was 15e14
    currency: "ETH",
    description: "Heavyweight luxury T-shirt with minimalist design.",
    imageURL: {
      thumbnail: "/images/products/ZKMotus_aether_rem.png",
      gallery: ["/images/products/ZKMotus_aether_rem.png"],
    },
    specification: {
      material: "100% organic cotton",
      weight: "240 GSM",
    },
    features: ["Heavyweight", "Soft touch"],
    isLimitedEdition: false,
    maxSupply: null,
    serialConfig: { prefix: "ZKM-AET", format: "ZKM-AET-YYYY-XXXX" },
    authenticity: { zkEnabled: true, proofType: "ownership-proof" },
  },
  {
    name: "Aether ♦ GH",
    slug: "aether-proof",
    category: "tshirt",
    price: 3.5e12, // was 35e14
    currency: "ETH",
    description: "Limited edition Aether T-shirt.",
    imageURL: {
      thumbnail: "/images/products/ZKMotus_aether_GH.png",
      gallery: ["/images/products/ZKMotus_aether_GH.png"],
    },
    specification: {
      material: "Premium cotton blend",
      weight: "260 GSM",
    },
    features: ["Limited edition", "Collector release"],
    isLimitedEdition: true,
    maxSupply: 400,
    serialConfig: { prefix: "ZKM-AET-P", format: "ZKM-AET-P-YYYY-XXXX" },
    authenticity: { zkEnabled: true, proofType: "ownership-proof" },
  },

  // Additional handbags & sneakers
  {
    name: "Atelier ♦ Foxy",
    slug: "exclusive-collections",
    category: "handbag",
    price: 4.5e12, // was 45e14
    currency: "ETH",
    description: "Compact leather pouch with refined stitching.",
    imageURL: {
      thumbnail: "/images/products/atelier_pouch_1.png",
      gallery: ["/images/products/atelier_pouch_1.png"],
    },
    specification: {
      dimensions: "160 x 110 x 40 mm",
      material: "Italian calf leather",
    },
    features: ["Minimal profile", "Hand-stitched edges"],
    isLimitedEdition: true,
    maxSupply: 500,
    serialConfig: { prefix: "ZKM-AP-I", format: "ZKM-AP-I-YYYY-XXXX" },
    authenticity: { zkEnabled: true, proofType: "ownership-proof" },
  },
  {
    name: "Atelier ♦ Phynne",
    slug: "exclusive-collections",
    category: "handbag",
    price: 4.8e12, // was 48e14
    currency: "ETH",
    description: "Soft-structured pouch with quilted surface.",
    imageURL: {
      thumbnail: "/images/products/atelier_pouch_2.png",
      gallery: ["/images/products/atelier_pouch_2.png"],
    },
    specification: {
      dimensions: "170 x 120 x 45 mm",
      material: "Quilted lambskin leather",
    },
    features: ["Rectangular quilting", "Gold zipper hardware"],
    isLimitedEdition: true,
    maxSupply: 450,
    serialConfig: { prefix: "ZKM-AP-II", format: "ZKM-AP-II-YYYY-XXXX" },
    authenticity: { zkEnabled: true, proofType: "ownership-proof" },
  },
  {
    name: "Kirk ♦ Burgy",
    slug: "collectors-edition",
    category: "handbag",
    price: 5e12, // was 50e14
    currency: "ETH",
    description: "Monochrome pouch designed for daily essentials.",
    imageURL: {
      thumbnail: "/images/products/atelier_pouch_3.png",
      gallery: ["/images/products/atelier_pouch_3.png"],
    },
    specification: {
      dimensions: "165 x 115 x 40 mm",
      material: "Vegetable-tanned leather",
    },
    features: ["Soft-touch finish", "Precision stitching"],
    isLimitedEdition: true,
    maxSupply: 400,
    serialConfig: { prefix: "ZKM-AP-III", format: "ZKM-AP-III-YYYY-XXXX" },
    authenticity: { zkEnabled: true, proofType: "ownership-proof" },
  },
  {
    name: "Phoenn ♦ Emerald",
    slug: "exclusive-collections",
    category: "handbag",
    price: 5.2e12, // was 52e14
    currency: "ETH",
    description: "Premium leather pouch with subtle structure.",
    imageURL: {
      thumbnail: "/images/products/atelier_pouch_4.png",
      gallery: ["/images/products/atelier_pouch_4.png"],
    },
    specification: {
      dimensions: "180 x 120 x 45 mm",
      material: "Full-grain leather",
    },
    features: ["Luxury lining", "Gold primaryAccent hardware"],
    isLimitedEdition: true,
    maxSupply: 350,
    serialConfig: { prefix: "ZKM-AP-IV", format: "ZKM-AP-IV-YYYY-XXXX" },
    authenticity: { zkEnabled: true, proofType: "ownership-proof" },
  },

  // ── Backpack ──────────────────────────────
  {
    name: "Voyager ♦ Quilt",
    slug: "collectors-edition",
    category: "handbag",
    price: 16e12, // was 160e14
    currency: "ETH",
    description: "Luxury quilted backpack with architectural form.",
    imageURL: {
      thumbnail: "/images/products/voyager_backpack.png",
      gallery: ["/images/products/voyager_backpack.png"],
    },
    specification: {
      dimensions: "420 x 300 x 140 mm",
      material: "Quilted premium leather",
    },
    features: ["Rectangular quilt pattern", "Gold metal ornaments"],
    isLimitedEdition: true,
    maxSupply: 200,
    serialConfig: { prefix: "ZKM-VQB", format: "ZKM-VQB-YYYY-XXXX" },
    authenticity: { zkEnabled: true, proofType: "ownership-proof" },
  },

  // ── Sneakers ──────────────────────────────
  {
    name: "Stride ♦ Quilt",
    slug: "collectors-edition",
    category: "sneakers",
    price: 9.5e12, // was 95e14
    currency: "ETH",
    description: "Luxury sneakers designed for everyday elegance.",
    imageURL: {
      thumbnail: "/images/products/stride_1.png",
      gallery: ["/images/products/stride_1.png"],
    },
    specification: {
      dimensions: "EU 40–45",
      material: "Premium leather & knit upper",
    },
    features: ["Cushioned sole", "Refined silhouette"],
    isLimitedEdition: true,
    maxSupply: 600,
    serialConfig: { prefix: "ZKM-STR-I", format: "ZKM-STR-I-YYYY-XXXX" },
    authenticity: { zkEnabled: true, proofType: "ownership-proof" },
  },
  {
    name: "Stride ♦ Quilt Signature",
    slug: "collectors-edition",
    category: "sneakers",
    price: 9.8e12, // was 98e14
    currency: "ETH",
    description: "Modern luxury sneakers with premium finish.",
    imageURL: {
      thumbnail: "/images/products/stride_2.png",
      gallery: [
        "/images/products/stride_2.png",
        "/images/products/stride2-alt1.png",
        "/images/products/stride2-alt2.png",
        "/images/products/stride2-alt3.png"
      ],
    },
    specification: {
      dimensions: "EU 40–45",
      material: "Italian leather upper",
    },
    features: ["Breathable lining", "Minimal branding"],
    isLimitedEdition: true,
    maxSupply: 550,
    serialConfig: { prefix: "ZKM-STR-II", format: "ZKM-STR-II-YYYY-XXXX" },
    authenticity: { zkEnabled: true, proofType: "ownership-proof" },
  },
];

const seedDB = async () => {
  try {
    await connectDB();
    await Product.deleteMany({});
    console.log("Old products removed");

    await Product.insertMany(products);
    console.log("20 products seeded successfully");

    await mongoose.connection.close();
  } catch (err) {
    console.error(err);
    await mongoose.connection.close();
  }
};

seedDB();
