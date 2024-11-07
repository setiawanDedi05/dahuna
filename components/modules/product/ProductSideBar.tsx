import { cn } from "@/lib/utils";
import { Category } from "@/types";
import React from "react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { toCurrency } from "@/components/custom/Currency";
import { Label } from "@/components/ui/label";

type ProductSideBarProps = {
  minPrice: number;
  setMinPrice: (value: number) => void;
  maxPrice: number;
  setMaxPrice: (value: number) => void;
  loading: boolean;
  setLoading: (value: boolean) => void;
  className?: string;
  categories: Category[];
};

export const ProductSideBar = ({
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
  loading,
  setLoading,
  className,
  categories,
}: ProductSideBarProps) => {
  return (
    <div className={cn("h-full flex flex-col", className)}>
      <div className="flex flex-col gap-8 items-center">
        <div className="flex flex-col gap-2 items-center w-full">
          <ProductHeadingSideBar title="Product Categories" />
          <ProductCategory categories={categories} setLoading={setLoading} loading={loading} />
        </div>
        <div className="flex flex-col gap-2 items-center w-full">
          <ProductHeadingSideBar title="Filter by price" />
          <ProductFiltersByPrice
            minPrice={minPrice}
            maxPrice={maxPrice}
            setMinPrice={setMinPrice}
            setMaxPrice={setMaxPrice}
          />
        </div>
      </div>
    </div>
  );
};

export const ProductHeadingSideBar = ({ title }: { title: string }) => {
  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="flex justify-between items-center w-full">
        <h6 className="capitalize">{title}</h6>
      </div>
    </div>
  );
};

export type ProductCategoryProps = {
  loading: boolean;
  setLoading: (value: boolean) => void;
  categories: Category[];
};

export const ProductCategory = ({
  loading,
  categories,
}: ProductCategoryProps) => {
  return loading ? (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-5">
      <Skeleton className="h-10 w-20" />
      <Skeleton className="h-10 w-20" />
      <Skeleton className="h-10 w-20" />
      <Skeleton className="h-10 w-20" />
      <Skeleton className="h-10 w-20" />
    </div>
  ) : (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5">
      {categories.map((category: Category) => (
        <Button variant="outline" key={category._id} className="w-24 h-12">
          <span className="truncate">{category.title}</span>
        </Button>
      ))}
    </div>
  );
};

export type ProductFiltersByPriceProps = {
  minPrice: number;
  setMinPrice: (value: number) => void;
  maxPrice: number;
  setMaxPrice: (value: number) => void;
};

export const ProductFiltersByPrice = ({
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
}: ProductFiltersByPriceProps) => {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-1">
        <Label htmlFor="min-price">Min</Label>
        <Slider
          name="min-price"
          defaultValue={[minPrice]}
          max={maxPrice}
          min={0}
          step={500000}
          onValueCommit={(e: number[]) => setMinPrice(e[0])}
        />
        <Input
          name="min-input"
          type="text"
          value={toCurrency({ amount: minPrice })}
          className="border"
          placeholder="min price"
          disabled
        />
      </div>
      <div className="flex flex-col gap-1">
        <Label htmlFor="max-price">Max</Label>
        <Slider
          name="max-price"
          defaultValue={[maxPrice]}
          max={10000000}
          step={500000}
          min={minPrice}
          onValueCommit={(e: number[]) => setMaxPrice(e[0])}
        />
        <Input
          type="text"
          name="max-input"
          value={toCurrency({ amount: maxPrice })}
          className="border"
          placeholder="max price"
          disabled
        />
      </div>
    </div>
  );
};
