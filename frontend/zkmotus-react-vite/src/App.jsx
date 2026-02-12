import { Routes, Route } from "react-router-dom";
import Layout from "./layout/Layout";
import Authenticity from "./pages/Authenticity";
import Collection from "./pages/collection/Collection";
import Provenance from "./pages/provenance/Provenance";
import ProductDetails from "./pages/productDetails/ProductDetails";
import Checkout from "./pages/checkout/Checkout";
import VerifyPage from "./pages/verifyAuthenticity/VerifyPage";
import CollectionPage from "./pages/productCollections/CollectionPage";
import OrderList from "./pages/orders/OrderList";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Provenance />} />
        <Route path="/provenance" element={<Provenance />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/collection/:category" element={<CollectionPage />} />
        <Route path="/collection" element={<Collection />} />
        <Route path="/authenticity" element={<Authenticity />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/verify" element={<VerifyPage />} />
        <Route path="/orders" element={<OrderList />} />
      </Route>
    </Routes>
  );
}
