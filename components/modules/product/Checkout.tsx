"use client";

import { CartComponent } from "./cart/Cart";
import useSWR, { Fetcher } from "swr";
import { Cart } from "@/@types";
import { Loader2 } from "lucide-react";
import { useAuth } from "@clerk/nextjs";

type CheckoutProps = {
  show: boolean;
  setShow: (value: boolean) => void;
};

export function Checkout({ show, setShow }: CheckoutProps) {
  const { userId } = useAuth();
  const fetcher: Fetcher<Cart[], string> = (args) =>
    fetch(args)
      .then((res) => res.json())
      .then((res) => {
        return res.content;
      });

  const { data, error, isLoading } = useSWR<Cart[]>(
    process.env.NEXT_PUBLIC_URL + "/api/cart?userId=" + userId,
    fetcher
  );

  if (error || isLoading) {
    return <></>;
  }

  return <CartComponent data={data!} setShow={setShow} show={show} />;
}
