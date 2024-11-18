import { Cart } from "@/@types";
import { RootState } from "@/redux/store";
import { initCarts } from "@/redux/reducer/cartSlice";
import { useAuth } from "@clerk/nextjs";
import { useDispatch, useSelector } from "react-redux";
import useSWR, { Fetcher } from "swr";

const fetcherCart: Fetcher<Cart[], string> = (args) =>
  fetch(args[0], {
    next: {
      tags: [`cart-${args[1]}`],
    },
  })
    .then((res) => res.json())
    .then((res) => {
      return res.content;
    });

export const useCart = () => {
  const { userId } = useAuth();
  const dispatch = useDispatch();
  const { initialized } = useSelector((state: RootState) => state.carts);

  const { data, error, isLoading } = useSWR<Cart[]>(
    userId && [
      process.env.NEXT_PUBLIC_URL + "/api/cart?userId=" + userId,
      userId,
    ],
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
