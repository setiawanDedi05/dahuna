import { Product } from "@/@types";
import { ShoppingBasket } from "lucide-react";
import React from "react";
import { ProductCard } from "./ProductCard";

type ProductContentProps = {
  products?: Product[];
};
export const ProductContent = ({ products }: ProductContentProps) => {
  return products && products.length === 0 ? (
    <div className="flex flex-col justify-center items-center py-20 w-full">
      <ShoppingBasket className="font-bold w-10" />
      <h3>No Product Found</h3>
    </div>
  ) : (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 relative">
      {products?.map((item: Product) => (
        <ProductCard key={item.id} item={item} />
      ))}
    </div>
  );
};
