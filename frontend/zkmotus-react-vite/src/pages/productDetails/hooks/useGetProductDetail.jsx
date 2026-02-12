import React from 'react';
import { get } from '../../../lib/api';
import { useQuery } from '@tanstack/react-query'


function useGetProductDetail({ productId }) {

  const product = useQuery({
    queryKey: ["product_detail", productId],
    queryFn: () => get("/products/" + productId),
    staleTime: 60_000,
    gcTime: 5 * 60_000,
    retry: 1,
  })

  const productDetail = product.data ? product.data.data : null
  return { product: productDetail };
}

export default useGetProductDetail;