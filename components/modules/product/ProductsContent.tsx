"use client";

import { usePagination } from "@/hooks/usePagination";
import { cn } from "@/lib/utils";
import { Category, Product } from "@/@types";
import React, { useEffect, useState } from "react";
import { LoaderProducts, ProductContent, ProductTopBar } from "./";
import { CustomPagination } from "@/components/custom/CustomPagination";

type ProductContentProps = {
  minPrice: number;
  setMinPrice: (value: number) => void;
  maxPrice: number;
  setMaxPrice: (value: number) => void;
  loading: boolean;
  setLoading: (value: boolean) => void;
  className?: string;
  categories: Category[];
};

export const ProductsContent = ({
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
  loading,
  setLoading,
  className,
  categories,
}: ProductContentProps) => {
  const [products, setproducts] = useState<Product[]>();
  const [perPage, setperPage] = useState<number>(10);
  const [filter, setfilter] = useState<string>("latest");
  const [page, setpage] = useState(1);
  const count = products && Math.ceil(products.length / perPage);
  const _DATA = usePagination(products, perPage);

  const handleChange = (e: React.ChangeEvent<unknown>, p: number) => {
    setpage(p);
    _DATA.jump(p);
  };

  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);
      await fetch(
        process.env.NEXT_PUBLIC_URL +
          "/api/products?" +
          new URLSearchParams({
            filter,
            minPrice: String(minPrice),
            maxPrice: String(maxPrice),
          }).toString()
      )
        .then((res) => res.json())
        .then((res) => {
          setproducts(res.content);
        })
        .catch((error) => console.log(error))
        .finally(() => setLoading(false));
    };

    getProducts();
  }, [page, filter, minPrice, maxPrice]);

  if (loading || !_DATA.currentData()) return <LoaderProducts />;

  return (
    <div className={cn(className)}>
      <ProductTopBar
        minPrice={minPrice}
        setMinPrice={setMinPrice}
        maxPrice={maxPrice}
        setMaxPrice={setMaxPrice}
        loading={loading}
        setLoading={setLoading}
        perPage={perPage}
        setPerPage={setperPage}
        filter={filter}
        setFilter={setfilter}
        maxPage={_DATA.maxPage ?? 1}
        page={page}
        products={products}
        categories={categories}
      />
      <ProductContent products={_DATA.currentData()} />
      <div className="py-10 flex justify-between mt-auto">
        <CustomPagination />
      </div>
    </div>
  );
};
