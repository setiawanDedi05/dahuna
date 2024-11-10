import { cn } from "@/lib/utils";
import { Category } from "@/@types";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { toCurrency } from "@/components/custom/Currency";
import { Label } from "@/components/ui/label";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Checkbox } from "@/components/ui/checkbox";

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
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const [isCheck, setIsCheck] = useState<boolean>(false);
  const params = new URLSearchParams(searchParams);

  function handleSearch(query: string, value: string) {
    if (value) {
      params.set(query, value);
    } else {
      params.delete(query);
    }
    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <div className={cn("h-full flex flex-col", className)}>
      <div className="flex flex-col gap-8 items-center">
        <div className="flex flex-col gap-2 items-center w-full">
          <ProductHeadingSideBar title="Product Categories" />
          <ProductCategory
            handleSearch={handleSearch}
            categories={categories}
            setLoading={setLoading}
            loading={loading}
            className="grid grid-cols-1 xl:grid-cols-2 gap-5 w-full"
          />
        </div>
        <div className="flex flex-col gap-2 items-center w-full">
          <div className="flex w-full gap-3 items-center justify-start">
            <Checkbox
              defaultChecked={isCheck}
              onCheckedChange={(value: boolean) => {
                if (!value) {
                  params.delete("min");
                  params.delete("max");
                  replace(`${pathname}?${params.toString()}`);
                }
                setIsCheck(value);
              }}
            />
            <ProductHeadingSideBar title="Filter by price" />
          </div>
          {isCheck && (
            <ProductFiltersByPrice
              handleSearch={handleSearch}
              minPrice={minPrice}
              maxPrice={maxPrice}
              setMinPrice={setMinPrice}
              setMaxPrice={setMaxPrice}
            />
          )}
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
  className?: string;
  handleSearch(query: string, value: string): void;
};

export const ProductCategory = ({
  loading,
  categories,
  className,
  handleSearch,
}: ProductCategoryProps) => {
  const searchParams = useSearchParams();

  return loading ? (
    <div className={cn(className)}>
      <Skeleton className="h-10 w-20" />
      <Skeleton className="h-10 w-20" />
      <Skeleton className="h-10 w-20" />
      <Skeleton className="h-10 w-20" />
      <Skeleton className="h-10 w-20" />
    </div>
  ) : (
    <div className={cn(className)}>
      {categories.map((category: Category) => (
        <Button
          variant={
            searchParams.get("category") === category._id ? "default" : "outline"
          }
          key={category._id}
          className="w-24 h-12 lg:w-36"
          onClick={() => handleSearch("category", category._id)}
        >
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
  handleSearch(query: string, value: string): void;
};

export const ProductFiltersByPrice = ({
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
  handleSearch,
}: ProductFiltersByPriceProps) => {
  return (
    <div className="flex flex-col gap-5 w-full">
      <div className="flex flex-col gap-2">
        <Label htmlFor="min-price">Min</Label>
        <Slider
          name="min-price"
          defaultValue={[minPrice]}
          max={maxPrice}
          min={0}
          step={500000}
          onValueCommit={(e: number[]) => {
            handleSearch("min", String(e[0]));
            setMinPrice(e[0]);
          }}
        />
        <Input
          name="min-input"
          type="text"
          value={toCurrency({ amount: minPrice })}
          className="border mt-5"
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
          onValueCommit={(e: number[]) => {
            handleSearch("max", String(e[0]));
            setMaxPrice(e[0]);
          }}
        />
        <Input
          type="text"
          name="max-input"
          value={toCurrency({ amount: maxPrice })}
          className="border mt-5"
          placeholder="max price"
          disabled
        />
      </div>
    </div>
  );
};
