"use client";

import { cn } from "@/lib/utils";
import { Category } from "@/@types";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { toCurrency } from "@/components/custom/Currency";
import { Label } from "@/components/ui/label";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type ProductSideBarProps = {
  className?: string;
  categories: Category[];
};

export const ProductSideBar = ({
  className,
  categories,
}: ProductSideBarProps) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
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
            className="grid grid-cols-1 xl:grid-cols-2 gap-5 w-full"
          />
        </div>
        <div className="flex flex-col gap-2 items-center w-full">
          <ProductHeadingSideBar title="Filter by price" />
          <ProductFiltersByPrice handleSearch={handleSearch} />
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
  categories: Category[];
  className?: string;
  handleSearch(query: string, value: string): void;
};

export const ProductCategory = ({
  categories,
  className,
  handleSearch,
}: ProductCategoryProps) => {
  const searchParams = useSearchParams();

  return (
    <div className={cn(className)}>
      {categories.map((category: Category) => (
        <Button
          variant={
            searchParams.get("category") === category.id ? "default" : "outline"
          }
          key={category.id}
          className="w-24 h-12 lg:w-36"
          onClick={() => handleSearch("category", category.id)}
        >
          <span className="truncate">{category.title}</span>
        </Button>
      ))}
    </div>
  );
};

export type ProductFiltersByPriceProps = {
  handleSearch(query: string, value: string): void;
};

export const ProductFiltersByPrice = ({
  handleSearch,
}: ProductFiltersByPriceProps) => {
  const searchParams = useSearchParams();
  const [min, setMin] = useState<number>(Number(searchParams.get("min")));
  const [max, setMax] = useState<number>(Number(searchParams.get("max")));
  return (
    <div className="flex flex-col gap-5 w-full">
      <div className="flex flex-col gap-2">
        <Label htmlFor="min-price">Min</Label>
        <Slider
          name="min-price"
          defaultValue={[min]}
          max={1000000}
          min={0}
          step={100000}
          onValueCommit={(e: number[]) => {
            setMin(e[0]);
            if (e[0] >= max) {
              setMax(e[0]);
              handleSearch("max", String(e[0]));
            }
            handleSearch("min", String(e[0]));
          }}
        />
        <Input
          name="min-input"
          type="text"
          value={toCurrency({ amount: min })}
          className="border mt-5"
          placeholder="min price"
          disabled
        />
      </div>
      <div className="flex flex-col gap-1">
        <Label htmlFor="max-price">Max</Label>
        <Slider
          name="max-price"
          defaultValue={[max]}
          max={10000000}
          step={500000}
          min={min}
          onValueCommit={(e: number[]) => {
            handleSearch("max", String(e[0]));
            setMax(e[0]);
          }}
        />
        <Input
          type="text"
          name="max-input"
          value={toCurrency({ amount: max })}
          className="border mt-5"
          placeholder="max price"
          disabled
        />
      </div>
    </div>
  );
};
