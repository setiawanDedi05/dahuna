"use client";

import { Cart, Product } from "@/@types";
import { toCurrency } from "@/components/custom/Currency";
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import { MinusCircle, PlusCircle } from "lucide-react";
import { useState } from "react";

type ProductDetailImageProps = {
  product: Product | null;
};

export const ProductDetailDescription = ({
  product,
}: ProductDetailImageProps) => {
  const { user } = useUser();
  const [qty, setQty] = useState<number>(1);
  const handleCheckout = async () => {
    const cart: Cart = {
      _id: "",
      product: product!,
      productId: product!.id,
      userId: user!.id,
      quantity: qty,
      price: product!.priceDisplay,
    };
    try {
      const response = await axios({
        method: "POST",
        url: "/api/payment",
        data: {
          cart: [cart],
          user,
        },
      });
      window.snap.pay(response.data.token);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col px-5 h-full">
      <span className="line-through text-md leading-none font-bold text-muted-foreground">
        {toCurrency({ amount: product!.priceReal ?? 0 })}
      </span>
      <span className="text-2xl leading-none font-bold">
        {toCurrency({ amount: product?.priceDisplay ?? 0 })}
      </span>
      <h2 className="text-xl font-bold my-5">{product!.name}</h2>
      <span className="text-md text-muted-foreground rounded-md">
        {product!.description}
      </span>
      <div className="flex w-full mt-auto flex-col justify-start items-start gap-5">
        <div className="flex items-center justify-start gap-5">
          <Button
            variant="outline"
            className="rounded-full"
            size="icon"
            onClick={() =>
              setQty((prev) => {
                if (prev > 0) {
                  return prev - 1;
                }
                return prev;
              })
            }
          >
            <MinusCircle />
          </Button>
          <div className="rounded-md border py-2 px-5">{qty}</div>
          <Button
            variant="outline"
            className="rounded-full"
            size="icon"
            onClick={() =>
              setQty((prev) => {
                return prev + 1;
              })
            }
          >
            <PlusCircle />
          </Button>
        </div>
        <span className="leading-none -mb-4">Total</span>
        <div className="border px-5 py-3">
          {toCurrency({ amount: product!.priceDisplay })} x {qty} ={" "}
          {toCurrency({ amount: product!.priceDisplay * qty })}
        </div>
      </div>
      <div className="flex flex-col lg:flex-row gap-3 mt-auto">
        <Button
          variant="outline"
          className="h-14 lg:w-52 uppercase font-bold"
          onClick={handleCheckout}
        >
          Save to Cart
        </Button>
        <Button
          className="h-14 lg:w-52 uppercase font-bold"
          onClick={handleCheckout}
        >
          Checkout
        </Button>
      </div>
    </div>
  );
};
