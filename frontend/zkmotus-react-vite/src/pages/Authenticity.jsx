import React from 'react';
import { TbCertificate, TbCurrencyEthereum } from 'react-icons/tb';
import { GiWaxSeal } from "react-icons/gi";
function Authenticity(props) {

  const products = [
    {
      id: "knits-zero",
      name: "Knits ♦ Zero",
      category: "wallet",
      price: 0.035,
      currency: "ETH",
      image: "/images/products/ZKMotus_knits_zero.png",
      isRegistered: true,
      zkEnabled: true,
      serialConfig: { prefix: "ZKM-KNT", format: "ZKM-KNT-YYYY-XXXX" },
      maxSupply: null,
    },
    {
      id: "knits-onyx",
      name: "Knits ♦ Onyx",
      category: "wallet",
      price: 0.095,
      currency: "ETH",
      image: "/images/products/ZKMotus_knits_onyx.png",
      isRegistered: false,
      zkEnabled: true,
      serialConfig: { prefix: "ZKM-KNT-O", format: "ZKM-KNT-O-YYYY-XXXX" },
      maxSupply: 500,
    },
    {
      id: "strata-nargo",
      name: "Strata ♦ Nargo",
      category: "handbag",
      price: 1.8,
      currency: "ETH",
      image: "/images/products/ZKMotus_Strata_nargo.png",
      isRegistered: false,
      zkEnabled: true,
      serialConfig: { prefix: "ZKM-STR-P", format: "ZKM-STR-P-YYYY-XXXX" },
      maxSupply: 150,
    },
    {
      id: "flux-veloce",
      name: "Flux ♦ Veloce",
      category: "handbag",
      price: 1.6,
      currency: "ETH",
      image: "/images/products/ZKMotus_flux_veloce.png",
      isRegistered: false,
      zkEnabled: true,
      serialConfig: { prefix: "ZKM-HAL-P", format: "ZKM-HAL-P-YYYY-XXXX" },
      maxSupply: 120,
    },
    {
      id: "onyx-signature",
      name: "Onyx ♦ Signature",
      category: "sneakers",
      price: 1.35,
      currency: "ETH",
      image: "/images/products/ZKMotus_onyx_signature.png",
      isRegistered: false,
      zkEnabled: true,
      serialConfig: { prefix: "ZKM-VEC-P", format: "ZKM-VEC-P-YYYY-XXXX" },
      maxSupply: 250,
    },
    {
      id: "strata-vg",
      name: "Strata ♦ VG",
      category: "running-shoes",
      price: 1.5,
      currency: "ETH",
      image: "/images/products/ZKMotus_strata_VG.png",
      isRegistered: false,
      zkEnabled: true,
      serialConfig: { prefix: "ZKM-VEL-P", format: "ZKM-VEL-P-YYYY-XXXX" },
      maxSupply: 300,
    },
    {
      id: "aether-gh",
      name: "Aether ♦ GH",
      category: "tshirt",
      price: 0.35,
      currency: "ETH",
      image: "/images/products/ZKMotus_aether_GH.png",
      isRegistered: false,
      zkEnabled: true,
      serialConfig: { prefix: "ZKM-AET-P", format: "ZKM-AET-P-YYYY-XXXX" },
      maxSupply: 400,
    },
    {
      id: "voyager-quilt",
      name: "Voyager ♦ Quilt",
      category: "backpack",
      price: 1.6,
      currency: "ETH",
      image: "/images/products/voyager_backpack.png",
      isRegistered: false,
      zkEnabled: true,
      serialConfig: { prefix: "ZKM-VQB", format: "ZKM-VQB-YYYY-XXXX" },
      maxSupply: 200,
    },
  ];


  return (
    <section className="text-ink font-lineseed px-6 py-12">

      {/* Header */}
      <header className="max-w-7xl mx-auto mb-10">
        <h1 className="text-4xl font-serif mb-2">Your Collection</h1>
        <p className="text-sm opacity-60">
          Manage and register authenticity for your products.
        </p>
      </header>

      {/* Product Grid */}
      <main className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {products.map(product => (
          <div
            key={product.id}
            className="relative bg-parchment rounded-3xl p-6 shadow-xl hover:shadow-2xl transition overflow-hidden"
          >
            {/* Product Image */}
            <div className="relative w-full h-64 mb-4 rounded-2xl overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="object-contain w-full h-full"
              />
            </div>

            {/* Product Info */}
            <div className="mb-4">
              <h2 className="font-libre text-lg font-medium">{product.name}</h2>
              <p className="text-sm opacity-60">{product.price} ETH</p>
            </div>

            {/* Authenticity Registration */}
            <div className="flex items-center justify-between">
              {product.isRegistered ? (
                <span className="flex items-center gap-2 px-4 py-2 rounded-full bg-burgundy/10 text-burgundy text-sm font-medium shadow-sm">
                  <TbCertificate size={20} /> Registered
                </span>
              ) : (
                <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-burgundy/80 text-parchment text-sm font-medium hover:brightness-110 transition shadow-md">
                  <GiWaxSeal size={18} /> Register Authenticity
                </button>
              )}
            </div>
          </div>
        ))}

      </main>

      {/* Footer CTA */}
      <div className="max-w-7xl mx-auto mt-12 flex justify-end">
        <button className="px-6 py-3 rounded-full bg-burgundy text-parchment font-medium shadow-lg hover:brightness-110 transition flex items-center gap-2">
          <TbCurrencyEthereum size={20} /> Register All
        </button>
      </div>

    </section>
  );
}

export default Authenticity;