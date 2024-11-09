"use client";

import { toCurrency } from "@/components/custom/Currency";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Loader2, MinusCircle, PlusCircle, Trash2 } from "lucide-react";
import Image from "next/image";
import { ScrollArea } from "@/components/ui/scroll-area";
import axios from "axios";
import Script from "next/script";
import useSWR, { Fetcher } from "swr";
import { Cart } from "@/@types";
import { Skeleton } from "@/components/ui/skeleton";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

const variants = {
  close: { y: 0, opacity: 0 },
  open: { y: 10, opacity: 1 },
};
declare global {
  interface Window {
    snap: any;
  }
}

type CheckoutProps = {
  show: boolean;
  setShow: (value: boolean) => void;
};

export const Checkout = ({ show, setShow }: CheckoutProps) => {
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [totalQty, setTotalQty] = useState<number>(0);
  const handleCheckout = async () => {
    try {
      const response = await axios({
        method: "POST",
        url: "/api/payment",
      });
      window.snap.pay(response.data.token);
    } catch (error) {
      console.log(error);
    } finally {
      setShow(false);
    }
  };

  const fetcher: Fetcher<Cart[], string> = (args) =>
    fetch(args)
      .then((res) => res.json())
      .then((res) => {
        return res.content;
      });

  const { data, error, isLoading } = useSWR<Cart[]>(
    process.env.NEXT_PUBLIC_URL + "/api/cart",
    fetcher
  );

  if (error) {
    return <>Error</>;
  }

  if (isLoading) {
    return <Loader2 className="animate-spin" />;
  }

  return (
    <>
      <Script
        type="text/javascript"
        src="https://app.sandbox.midtrans.com/snap/snap.js"
        data-client-key="SB-Mid-client-njA4aD0cwvtPvD03"
        strategy="lazyOnload"
      />
      <motion.div
        key="chart"
        initial={"close"}
        animate={show ? "open" : "close"}
        variants={variants}
        className="w-[500px] h-auto shadow-lg rounded-sm absolute right-5 top-16 z-20 border bg-primary-foreground p-5"
      >
        <ScrollArea className="h-[400px] w-full">
          {data?.map((item, index) => (
            <ProductListItem
              key={index}
              cart={item}
              setQty={setTotalQty}
              setTotalAmount={setTotalAmount}
            />
          ))}
        </ScrollArea>
        <Total total={totalQty} totalAmount={totalAmount} />
        <div className="flex flex-col gap-2">
          <Button
            className="w-full h-16 rounded-none text-lg font-bold"
            onClick={handleCheckout}
          >
            Checkout
          </Button>
        </div>
      </motion.div>
    </>
  );
};

const Total = ({
  total,
  totalAmount,
}: {
  total: number;
  totalAmount: number;
}) => {
  return (
    <div className="flex flex-col mt-10">
      <div className="flex justify-between">
        <span>Total Item</span>
        <span>{total}</span>
      </div>
      <div className="border-t-2 flex justify-end my-5 py-3 px-5">
        <span className="text-right text-2xl font-bold">
          {toCurrency({ amount: totalAmount })}
        </span>
      </div>
    </div>
  );
};

type ProductListItemProps = {
  cart: Cart;
  setTotalAmount: Dispatch<SetStateAction<number>>;
  setQty: Dispatch<SetStateAction<number>>;
};

const ProductListItem = ({
  cart,
  setQty,
  setTotalAmount,
}: ProductListItemProps) => {
  const [quantity, setQuantity] = useState<number>(cart.quantity);
  useEffect(() => {
    if (typeof window !== "undefined") {
      console.log("Component Did Mount"); // called once
      setQty((prev) => prev + quantity);
      setTotalAmount((prev) => prev + quantity * cart.price);
    }
  }, []);
  return (
    <div className="flex flex-col my-1">
      <Button
        size="icon"
        variant="destructive"
        className="relative -left-0 shadow-md top-4"
      >
        <Trash2 size={30} />
      </Button>
      <div className="flex gap-x-2 justify-between px-5 py-2 border">
        <Image
          src={cart.product.images[0]}
          width="100"
          height="400"
          alt={cart.product.title}
        />
        <div className="flex flex-col justify-between items-center">
          <span className="truncate capitalize">{cart.product.title}</span>
          <div className="flex items-center gap-5">
            <Button
              variant="outline"
              className="rounded-full"
              size="icon"
              onClick={() => {
                setQty((prev) => prev - 1);
                setTotalAmount((prev) => prev - cart.price);
                setQuantity(quantity - 1);
              }}
            >
              <MinusCircle />
            </Button>
            <div className="rounded-md border py-2 px-5">{quantity}</div>
            <Button
              variant="outline"
              className="rounded-full"
              size="icon"
              onClick={() => {
                setQty((prev) => prev + 1);
                setTotalAmount((prev) => prev + cart.price);
                setQuantity(quantity + 1);
              }}
            >
              <PlusCircle />
            </Button>
          </div>
          <div className="border px-5 py-3">
            {toCurrency({ amount: cart.price })} x {quantity} ={" "}
            {toCurrency({ amount: cart.price * quantity })}
          </div>
        </div>
      </div>
    </div>
  );
};
