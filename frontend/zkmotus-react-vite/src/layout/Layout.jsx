import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import CartDrawer from "../pages/cart/CartDrawer";
import { Toaster } from 'react-hot-toast';
export default function Layout() {
  return (
    <div className="max-w-7xl mx-auto min-h-screen bg-white font-lineseed select-none">
      <Navbar />
      <CartDrawer />
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
            padding: '12px 20px',
          },
        }}
      />
      <main className="pt-24 ">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
