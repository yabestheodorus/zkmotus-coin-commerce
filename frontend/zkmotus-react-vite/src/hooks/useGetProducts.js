import React, { useState } from 'react';

import { get } from "../lib/api";
import { useQuery } from "@tanstack/react-query";


function useGetProducts(props) {

  const products = useQuery({
    queryKey: ["products"],
    queryFn: () => get("/products"),
    staleTime: 60_000,      // 1 min: products don’t rot instantly
    gcTime: 5 * 60_000,     // cache stays warm
    retry: 1,               // no DDOSing your own backend
  });

  const productsResult = products.data ? products.data : []
  return { products: productsResult };
}

export default useGetProducts;