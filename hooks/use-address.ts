"use client";

import { initAddress, selectAddress } from "@/redux/reducer/orderSlice";
import { RootState } from "@/redux/store";
import { Address } from "@prisma/client";
import { useDispatch, useSelector } from "react-redux";
import useSWR, { Fetcher } from "swr";

const fetcherAddresses: Fetcher<Address[], string> = (args) =>
  fetch(args)
    .then((res) => res.json())
    .then((res) => {
      return res.content;
    });

export const useAddresses = () => {
  const dispatch = useDispatch();
  const { initialized } = useSelector((state: RootState) => state.order);

  const { data, error, isLoading } = useSWR<Address[]>(
    `${process.env.NEXT_PUBLIC_URL}/api/address`,
    fetcherAddresses,
    {
      onSuccess: (data) => {
        if (!initialized) {
          dispatch(initAddress(data));
          dispatch(selectAddress(data[0]));
        }
      },
    }
  );

  return {
    addresses: data,
    isLoading,
    error,
  };
};
