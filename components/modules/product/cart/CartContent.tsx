"use client";

import { Cart } from "@/@types";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import { Box, Loader } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { ProductListItem } from "./CartProductItem";
import { Total } from "./CartTotal";
import { incrementItemCart } from "@/actions/incrementItemCart";
import { decrementItemCart } from "@/actions/decrementItemCart";
import { deleteItemCart } from "@/actions/deleteItemCart";
import { useRouter } from "next/navigation";
import { saveCart } from "@/actions/saveCart";
import { toast } from "sonner";

export const CartContent = ({
  data,
  setShow,
}: {
  data: Cart[];
  setShow: (value: boolean) => void;
}) => {
  const { user } = useUser();
  const [carts, setCarts] = useState<Cart[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const { refresh } = useRouter();
  useEffect(() => {
    setCarts(data);
  }, [carts]);

  const handleDelete = useCallback(
    (id: string) => {
      const findedCartIndex = carts.findIndex((item) => item.id === id);
      deleteItemCart(id);
      const newCart = carts;
      newCart.splice(findedCartIndex, 1);
      setCarts([...newCart]);
      refresh();
    },
    [carts]
  );

  const handleDecrease = useCallback(
    (id: string) => {
      const findedCartIndex = carts.findIndex((item) => item.id === id);
      if (carts[findedCartIndex].quantity <= 0) return handleDelete(id);
      decrementItemCart(id);
      const newCart = carts;
      newCart[findedCartIndex].quantity = newCart[findedCartIndex].quantity - 1;
      setCarts([...newCart]);
      refresh();
    },
    [carts]
  );

  const handleIncrease = useCallback(
    (id: string) => {
      const findedCartIndex = carts.findIndex((item) => item.id === id);
      incrementItemCart(id);
      const newCart = carts;
      newCart[findedCartIndex].quantity = newCart[findedCartIndex].quantity + 1;
      setCarts([...newCart]);
      refresh();
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
          onClick={async () => {
            try {
              setLoading(true);
              await saveCart(carts, user?.id!);
            } catch (error) {
              toast.error("Error Hubungi Customer Service");
            } finally {
              setLoading(false);
              setShow(false);
            }
          }}
        >
          {loading ? <Loader className="animation-spin" /> : "Checkout"}
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
