import React from "react";

function AddToCartNotification({ t, productName, productImageUrl }) {
  return (
    <div
      className={`${
        t.visible ? "animate-enter" : "animate-leave"
      } ring-opacity-5 pointer-events-auto z-50 flex w-full max-w-sm rounded-lg bg-white shadow-lg ring-1 ring-black`}
    >
      <div className="w-0 flex-1 p-4">
        <div className="flex items-start">
          <div className="flex-shrink-0 pt-0.5">
            <img
              className="h-10 w-10 rounded-full"
              src={productImageUrl} // replace with your icon
              alt="Cart"
            />
          </div>
          <div className="ml-3 flex-1">
            <p className="text-sm font-medium text-gray-900">
              {productName} added to cart!
            </p>
            <p className="mt-1 text-sm text-gray-500">
              Check your cart to proceed to checkout.
            </p>
          </div>
        </div>
      </div>
      {/* <div className="flex border-l border-gray-200">
        <button
          onClick={() => alert("Asdf")}
          className="z-50 flex w-full items-center justify-center rounded-r-lg border border-transparent p-4 text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
        >
          View Cart
        </button>
      </div> */}
    </div>
  );
}

export default AddToCartNotification;
