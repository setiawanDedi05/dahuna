"use client";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Box } from "lucide-react";
import { ProductListItem } from "./CartProductItem";
import { Total } from "./CartTotal";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useRouter } from "next-nprogress-bar";

export const CartContent = ({
  setShow,
}: {
  setShow: (value: boolean) => void;
}) => {
  const {
    value: carts,
    totalAmount,
    totalItems,
    status,
  } = useSelector((state: RootState) => state.carts);
  const { push } = useRouter();

  return carts?.length ? (
    <>
      <ScrollArea className="h-[400px] w-full">
        {carts?.map((item, index) => (
          <ProductListItem key={index} cart={item} index={index} />
        ))}
      </ScrollArea>
      <Total total={totalItems} totalAmount={totalAmount} />
      <div className="flex flex-col gap-2">
        <Button
          className="w-full h-16 rounded-none text-lg font-bold"
          onClick={() => {
            setShow(false);
            push("/checkout");
          }}
          disabled={status === "loading"}
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
