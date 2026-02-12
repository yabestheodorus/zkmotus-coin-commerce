import React from 'react';
import { get } from '../../../lib/api';
import { useQuery } from '@tanstack/react-query';

function useGetRecommendedProduct(props) {



  const { data, isLoading } = useQuery({
    queryKey: ["recommended-products"],
    queryFn: () => get("/products/recommended"),
    staleTime: 60_000,      // 1 min: products don’t rot instantly
    gcTime: 5 * 60_000,     // cache stays warm
    retry: 1,               // no DDOSing your own backend
  });

  const productsResult = data ? data : []
  return { products: productsResult, isLoading };
}

export default useGetRecommendedProduct;