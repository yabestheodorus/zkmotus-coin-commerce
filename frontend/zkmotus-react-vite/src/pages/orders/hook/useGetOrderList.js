import { useAppKitAccount } from '@reown/appkit/react';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { get } from '../../../lib/api';

function useGetOrderList(props) {

  const { address, isConnected } = useAppKitAccount({ namespace: "eip155" });


  const { data, isLoading } = useQuery({
    queryKey: ["orderlist", address],
    queryFn: () => get(`/order/list?buyerAddress=${address}`),
    enabled: !!address,
    staleTime: 10 * 60_000,
  })

  const orderlist = data?.data || []; // Simplified optional chaining

  console.log(orderlist)

  return {
    orderlist,
    isLoading,
    address
  }
}

export default useGetOrderList;