"use client";

import { toCurrency } from "@/components/custom/Currency";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Box, Loader2, MinusCircle, PlusCircle, Trash2 } from "lucide-react";
import Image from "next/image";
import { ScrollArea } from "@/components/ui/scroll-area";
import axios from "axios";
import Script from "next/script";
import useSWR, { Fetcher } from "swr";
import { Cart } from "@/@types";
import { useCallback, useEffect, useState } from "react";
import { useAuth, useUser } from "@clerk/nextjs";

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
    <motion.div
      key="chart"
      initial={"close"}
      animate={show ? "open" : "close"}
      variants={variants}
      className="w-[500px] h-auto shadow-lg rounded-sm absolute right-5 top-16 z-20 border bg-primary-foreground p-5"
    >
      <CartContent data={data!} setShow={setShow} />
    </motion.div>
  );
};

const CartContent = ({
  data,
  setShow,
}: {
  data: Cart[];
  setShow: (value: boolean) => void;
}) => {
  const { user } = useUser();
  const [carts, setCarts] = useState<Cart[]>([]);

  useEffect(() => {
    setCarts(data);
  }, [carts]);

  const handleDelete = useCallback(
    (id: String) => {
      const findedCartIndex = carts.findIndex((item) => item._id === id);
      const newCart = carts;
      newCart.splice(findedCartIndex, 1);
      setCarts([...newCart]);
    },
    [carts]
  );

  const handleDecrease = useCallback(
    (id: string) => {
      const findedCartIndex = carts.findIndex((item) => item._id === id);
      const newCart = carts;
      newCart[findedCartIndex].quantity = newCart[findedCartIndex].quantity - 1;
      setCarts([...newCart]);
    },
    [carts]
  );

  const handleIncrease = useCallback(
    (id: string) => {
      const findedCartIndex = carts.findIndex((item) => item._id === id);
      const newCart = carts;
      newCart[findedCartIndex].quantity = newCart[findedCartIndex].quantity + 1;
      setCarts([...newCart]);
    },
    [carts]
  );

  const handleCheckout = async () => {
    try {
      const response = await axios({
        method: "POST",
        url: "/api/payment",
        data: {
          cart: carts,
          user,
        },
      });
      window.snap.pay(response.data.token);
    } catch (error) {
      console.log(error);
    } finally {
      setShow(false);
    }
  };

  const totalAmount = useCallback(() => {
    return carts.reduce(
      (accumulator, currenValue) =>
        accumulator + currenValue.price * currenValue.quantity,
      0
    );
  }, [carts]);

  const totalQty = useCallback(() => {
    return carts.reduce(
      (accumulator, currenValue) => accumulator + currenValue.quantity,
      0
    );
  }, [carts]);

  return carts.length ? (
    <>
      <ScrollArea className="h-[400px] w-full">
        {carts.map((item, index) => (
          <ProductListItem
            key={index}
            cart={item}
            handleDecrease={handleDecrease}
            handleDelete={handleDelete}
            handleIncrease={handleIncrease}
          />
        ))}
      </ScrollArea>
      <Total total={totalQty()} totalAmount={totalAmount()} />
      <div className="flex flex-col gap-2">
        <Button
          className="w-full h-16 rounded-none text-lg font-bold"
          onClick={handleCheckout}
        >
          Checkout
        </Button>
      </div>
    </>
  ) : (
    <div className="h-[400px] w-full border-2 border-dashed flex justify-center items-center gap-5">
      <Box className="text-muted-foreground" size={32} />{" "}
      <span className="text-muted-foreground text-xl">Empty Cart</span>
    </div>
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
  handleDelete: (id: string) => void;
  handleDecrease: (id: string) => void;
  handleIncrease: (id: string) => void;
};

const ProductListItem = ({
  cart,
  handleDecrease,
  handleDelete,
  handleIncrease,
}: ProductListItemProps) => {
  return (
    <div className="flex flex-col my-1">
      <Button
        size="icon"
        variant="destructive"
        className="relative -left-0 shadow-md top-4"
        onClick={() => handleDelete(cart._id)}
      >
        <Trash2 size={30} />
      </Button>
      <div className="flex gap-x-2 justify-between px-5 py-2 border">
        <Image
          src={cart.product.Images[0].url}
          width="100"
          height="400"
          alt={cart.product.name}
        />
        <div className="flex flex-col justify-between items-center">
          <span className="truncate capitalize">{cart.product.name}</span>
          <div className="flex items-center gap-5">
            <Button
              variant="outline"
              className="rounded-full"
              size="icon"
              onClick={() => handleDecrease(cart._id)}
            >
              <MinusCircle />
            </Button>
            <div className="rounded-md border py-2 px-5">{cart.quantity}</div>
            <Button
              variant="outline"
              className="rounded-full"
              size="icon"
              onClick={() => handleIncrease(cart._id)}
            >
              <PlusCircle />
            </Button>
          </div>
          <div className="border px-5 py-3">
            {toCurrency({ amount: cart.price })} x {cart.quantity} ={" "}
            {toCurrency({ amount: cart.price * cart.quantity })}
          </div>
        </div>
      </div>
    </div>
  );
};
