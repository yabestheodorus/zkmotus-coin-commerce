import { useAppKitAccount } from "@reown/appkit/react";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import toast from "react-hot-toast";
import { useBalance } from "wagmi";
import { post } from "../../lib/api";
import Notification from "../../layout/Notification";
import { useNavigate } from "react-router-dom";

const DEFAULT_SHIPPING = {
  firstName: "John",
  lastName: "Doe",
  street: "123 Ethereum Ave",
  city: "Jakarta",
  region: "DKI Jakarta",
  postalCode: "10110",
};

export function useCheckout({ items }) {
  const { address, isConnected } = useAppKitAccount({ namespace: "eip155" });
  const [shipping, setShipping] = useState({
    firstName: "",
    lastName: "",
    street: "",
    city: "",
    region: "",
    postalCode: "",
  });

  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [useDefault, setUseDefault] = useState(false);

  function updateField(field, value) {
    setShipping((prev) => ({ ...prev, [field]: value }));
  }

  function toggleDefaultValues(checked) {
    setUseDefault(checked);
    setShipping(
      checked
        ? DEFAULT_SHIPPING
        : {
            firstName: "",
            lastName: "",
            street: "",
            city: "",
            region: "",
            postalCode: "",
          },
    );
    setErrors({});
  }

  function validate() {
    const nextErrors = {};

    Object.entries(shipping).forEach(([key, value]) => {
      if (!value.trim()) {
        nextErrors[key] = "Required";
      }
    });

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  const submitCheckout = async () => {
    const itemsToSend = items.map((item) => {
      return {
        productId: item.productId,
        quantity: item.qty,
      };
    });

    const param = {
      buyerAddress: address,
      items: itemsToSend,
    };

    const response = await post("order/intent", param);

    return response;
  };

  const checkoutMutation = useMutation({
    mutationFn: submitCheckout,
    onSuccess: (data) => {
      toast.custom((t) => {
        return (
          <Notification
            visible={t.visible}
            title="Order placed successfully!"
            subtitle={`Your order #${data.orderId} is confirmed. Check your email for details.`}
          />
        );
      });

      navigate("/orders");
    },

    onError: (error) => {
      console.error("Failed to create order : ", error);
    },
  });

  const {
    data: balance,
    isError,
    isLoading,
  } = useBalance({
    address,
  });

  return {
    shipping,
    errors,
    useDefault,
    updateField,
    toggleDefaultValues,
    validate,
    address,
    isConnected,
    balance,
    submitCheckout: checkoutMutation.mutate,
    isLoading: checkoutMutation.isPending,
  };
}
