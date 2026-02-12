import { useQuery, useQueryClient } from "@tanstack/react-query";
import AddToCartNotification from "../../../layout/AddToCartNotification";
import toast from "react-hot-toast";

export function useShoppingCart() {

  const cartKeys = {
    all: ["cart"],
  };

  const loadCart = () => {
    const raw = localStorage.getItem("cart");
    return raw ? JSON.parse(raw) : [];
  };

  const queryClient = useQueryClient();

  const { data: items = [] } = useQuery({
    queryKey: cartKeys.all,
    queryFn: loadCart,
    staleTime: Infinity,
  });


  const saveCart = (items) => {
    localStorage.setItem("cart", JSON.stringify(items));
  };

  const setCart = (updater) => {
    queryClient.setQueryData(cartKeys.all, (old = []) => {
      const next = updater(old);
      saveCart(next);
      return next;
    });
  };

  const addToCart = (product, qty = 1) => {
    const updater = (prev) => {
      const existing = prev.find(
        (i) => i.productId === product._id
      );

      if (existing) {
        return prev.map((i) =>
          i.productId === product._id
            ? { ...i, qty: i.qty + qty }
            : i
        );
      }

      return [
        ...prev,
        {
          productId: product._id,
          name: product.name,
          price: product.price,
          currency: product.currency,
          qty,
          image: product.imageURL.thumbnail,
          slug: product.slug,
        },
      ];
    }
    setCart(updater);
    toast.custom((t) => { return <AddToCartNotification t={t} productName={product.name} productImageUrl={product.imageURL.thumbnail} /> })
  };

  const increaseQty = (id) => {
    const updater = (prev) =>
      prev.map((i) =>
        i.productId === id ? { ...i, qty: i.qty + 1 } : i
      )
    setCart(updater);
  }


  const decreaseQty = (id) => {

    const updater = (prev) =>
      prev.map((i) =>
        i.productId === id && i.qty > 1
          ? { ...i, qty: i.qty - 1 }
          : i
      )

    setCart(updater);
  }


  const removeItem = (id) =>
    setCart((prev) => prev.filter((i) => i.productId !== id));

  const subtotal = items.reduce(
    (sum, i) => sum + i.price * i.qty,
    0
  );

  return {
    items,
    addToCart,
    increaseQty,
    decreaseQty,
    removeItem,
    subtotal,
  };
}
