"use client";

import { Cart } from "@/@types";
import { RootState } from "@/redux/store";
import { initCarts } from "@/redux/reducer/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import useSWR, { Fetcher } from "swr";

const fetcherCart: Fetcher<Cart[], string> = (args) =>
  fetch(args)
    .then((res) => res.json())
    .then((res) => {
      return res.content;
    });

export const useCart = () => {
  const dispatch = useDispatch();
  const { initialized } = useSelector((state: RootState) => state.carts);

  const { data, error, isLoading } = useSWR<Cart[]>(
    process.env.NEXT_PUBLIC_URL + "/api/cart",
    fetcherCart,
    {
      onSuccess: (data) => {
        if (!initialized) {
          dispatch(initCarts(data));
        }
      },
    }
  );

  return {
    carts: data,
    isLoading,
    error,
  };
};
