"use client";

import { Currency } from "@/components/custom/Currency";
import { Button } from "@/components/ui/button";
import { Product } from "@/@types";
import { Heart, ShoppingCartIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { addToCart } from "@/actions/addToCart";
import { useAuth } from "@clerk/nextjs";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { addItem, changeStatus, rollbackAdd } from "../../../redux/reducer/cartSlice";

export const ProductCard = ({ item }: { item: Product }) => {
  const { userId } = useAuth();
  const dispatch = useDispatch();
  return (
    <div className="p-3 w-full h-full border flex flex-col justify-start gap-1">
      <div className="flex group/image h-[400px] relative overflow-hidden">
        <div className="absolute z-10 left-1 top-3 flex gap-1">
          <Button
            variant="outline"
            size="icon"
            onClick={async () => {
              dispatch(
                addItem({ product: item, userId: userId!, quantity: 1 })
              );
              try {
                dispatch(changeStatus("loading"));
                await addToCart(item, 1);
                toast.success("berhasil menambahkan produk ke keranjang");
              } catch (error) {
                dispatch(changeStatus("failed"));
                toast.error("Terjadi Kesalahan Silahkan Hubungi Admin");
                dispatch(rollbackAdd(item.id));
              } finally {
                dispatch(changeStatus("idle"));
              }
            }}
          >
            <ShoppingCartIcon className="size-11" />
          </Button>
          <Button
            variant="outline"
            size="icon"
          >
            <Heart className="size-11" />
          </Button>
        </div>
        <Image
          src={item.Images[0]?.url ?? "/assets/images/default-image.jpg"}
          alt={item.name}
          width={300}
          height={400}
          priority
          className="duration-300 ease-linear !w-full !h-full object-cover"
        />
      </div>
      <Link href={`/products/${item.slug}`}>
        <h2 className="text-left truncate text-xl font-bold leading-10">
          {item.name}
        </h2>
      </Link>
      <span className="text-muted-foreground text-sm text-left truncate">
        {item.description}
      </span>
      <div className="flex flex-col justify-start items-start">
        <Currency
          amount={item.priceReal}
          className="line-through font-bold text-muted-foreground"
        />
        <Currency
          amount={item.priceDisplay}
          className="text-center font-bold text-3xl"
        />
      </div>
    </div>
  );
};
