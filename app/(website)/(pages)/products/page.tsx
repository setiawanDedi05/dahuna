"use client";

import { Container } from "@/components/custom/Container";
import {
  ProductBreadCrumb,
  ProductsContent,
  ProductSideBar,
} from "@/components/modules/product";
import { Category } from "@/@types";
import React, { useEffect, useState } from "react";

const page = () => {
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(10000000);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const getCategories = async () => {
      setLoading(true);
      await fetch(process.env.NEXT_PUBLIC_URL + "/api/categories")
        .then((res) => res.json())
        .then((res) => {
          setCategories([]);
          setCategories(res.content);
        })
        .catch((error) => console.log(error))
        .finally(() => setLoading(false));
    };

    getCategories();
  }, [setLoading]);

  return (
    <section className="my-10">
      <Container>
        <ProductBreadCrumb />
        <div className="grid grid-cols-1 md:grid-cols-[100px_1fr] lg:grid-cols-[200px_1fr] xl:grid-cols-[300px_1fr] gap-12 items-start">
          <ProductSideBar
            minPrice={minPrice}
            setMinPrice={setMinPrice}
            maxPrice={maxPrice}
            setMaxPrice={setMaxPrice}
            loading={loading}
            setLoading={setLoading}
            categories={categories}
            className="hidden md:flex"
          />
          <ProductsContent
            minPrice={minPrice}
            setMinPrice={setMinPrice}
            maxPrice={maxPrice}
            setMaxPrice={setMaxPrice}
            loading={loading}
            setLoading={setLoading}
            categories={categories}
          />
        </div>
      </Container>
    </section>
  );
};

export default page;
