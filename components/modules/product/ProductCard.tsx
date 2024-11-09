import { Currency } from "@/components/custom/Currency";
import { Button } from "@/components/ui/button";
import { Product } from "@/@types";
import { Heart, ShoppingCartIcon } from "lucide-react";
import Image from "next/image";
import React from "react";
import Link from "next/link";

export const ProductCard = ({ item }: { item: Product }) => {
  return (
    <div className="p-3 w-full h-full border flex flex-col justify-start gap-1">
      <div className="flex group/image h-[400px] relative overflow-hidden">
        <div className="absolute z-10 left-1 top-3 flex gap-1">
          <Button variant="outline" size="icon">
            <ShoppingCartIcon className="size-11" />
          </Button>
        </div>
        <Image
          src={item.images && item.images[0]}
          alt={item.title}
          width="300"
          height="400"
          className="duration-300 ease-linear group-hover/image:translate-x-full !h-[400px] !w-[300px] object-cover"
        />
        <Image
          src={item.images && item.images[1]}
          alt={item.title}
          width="300"
          height="400"
          className="absolute duration-300 ease-linear -translate-x-full group-hover/image:translate-x-0 !h-[400px] !w-[300px] object-cover"
        />
      </div>
      <Link href={`/products/${item._id}`}>
        <h2 className="text-left truncate text-xl font-bold leading-10">
          {item.title}
        </h2>
      </Link>
      <span className="text-muted-foreground text-sm text-left truncate">
        {item.description}
      </span>
      <div className="flex flex-col justify-start items-start">
        <Currency
          amount={item.real_price}
          className="line-through font-bold text-muted-foreground"
        />
        <Currency
          amount={item.price}
          className="text-center font-bold text-3xl"
        />
      </div>
    </div>
  );
};
