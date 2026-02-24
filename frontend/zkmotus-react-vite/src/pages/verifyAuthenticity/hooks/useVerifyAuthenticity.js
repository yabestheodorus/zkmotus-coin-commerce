import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useState } from 'react';
import { get } from "../../../lib/api";
function useVerifyAuthenticity(props) {

  const [serialRaw, setSerialRaw] = useState("");

  const { data, isLoading, refetch, isFetching } = useQuery({
    queryKey: ["productBySerial", serialRaw],
    queryFn: () => get(`/products/serial/${serialRaw}`),
    staleTime: 30 * 60_000,
    enabled: false
  })


  const product = data ? data.data.product : null;
  return { product, isLoading, refetch, isFetching, serialRaw, setSerialRaw }
}

export default useVerifyAuthenticity;