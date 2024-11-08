"use client";

import { toCurrency } from "@/components/custom/Currency";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { MinusCircle, PlusCircle, Trash2 } from "lucide-react";
import Image from "next/image";
import { ScrollArea } from "@/components/ui/scroll-area";
import axios from "axios";
import { redirect } from "next/navigation";

const variants = {
  close: { y: 0, opacity: 0 },
  open: { y: 10, opacity: 1 },
};
type CheckoutProps = {
  show: boolean;
};

export const Checkout = ({ show }: CheckoutProps) => {
  return (
    <motion.div
      key="chart"
      initial={"close"}
      animate={show ? "open" : "close"}
      variants={variants}
      className="w-[500px] h-auto shadow-lg rounded-sm absolute right-5 top-16 z-20 border bg-primary-foreground p-5"
    >
      <ScrollArea className="h-[400px] w-full">
        <ProductListItem />
        <ProductListItem />
        <ProductListItem />
      </ScrollArea>
      <Total />
      <GroupButton />
    </motion.div>
  );
};

const Total = () => {
  return (
    <div className="flex flex-col mt-10">
      <div className="flex justify-between">
        <span>Total Item</span>
        <span>3</span>
      </div>
      <div className="border-t-2 flex justify-end my-5 py-3 px-5">
        <span className="text-right text-2xl font-bold">
          {toCurrency({ amount: 500000 })}
        </span>
      </div>
    </div>
  );
};

const GroupButton = () => {
  return (
    <div className="flex flex-col gap-2">
      <Button
        className="w-full h-16 rounded-none text-lg font-bold"
        onClick={async () => {
          const response = await axios({
            method: "POST",
            url: "/api/payment",
          });
        }}
      >
        Checkout
      </Button>
    </div>
  );
};

const ProductListItem = () => {
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
          src="/assets/images/image-1.jpg"
          width="100"
          height="400"
          alt="checkout"
        />
        <div className="flex flex-col justify-between items-center">
          <span className="truncate capitalize">
            repellendus in cum consectetur.
          </span>
          <div className="flex items-center gap-5">
            <Button variant="outline" className="rounded-full" size="icon">
              <MinusCircle />
            </Button>
            <div className="rounded-md border py-2 px-5">1</div>
            <Button variant="outline" className="rounded-full" size="icon">
              <PlusCircle />
            </Button>
          </div>
          <div className="border px-5 py-3">
            {toCurrency({ amount: 500000 })}
          </div>
        </div>
      </div>
    </div>
  );
};
