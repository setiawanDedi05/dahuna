"use client";

import { Container } from "@/components/custom/Container";
import { Row } from "@/components/custom/Row";
import {
  ProductBreadCrumb,
  ProductsContent,
  ProductSideBar,
} from "@/components/modules/product";
import React, { useState } from "react";

const page = () => {
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(10000000);
  const [loading, setLoading] = useState(false);

  return (
    <section className="my-10">
      <Container>
        <ProductBreadCrumb />
        <div className="gap-12 grid grid-cols-1 md:grid-cols-4 items-start">
          <ProductSideBar
            minPrice={minPrice}
            setMinPrice={setMinPrice}
            maxPrice={maxPrice}
            setMaxPrice={setMaxPrice}
            loading={loading}
            setLoading={setLoading}
            className="hidden md:flex "
          />
          <ProductsContent
            minPrice={minPrice}
            setMinPrice={setMinPrice}
            maxPrice={maxPrice}
            setMaxPrice={setMaxPrice}
            loading={loading}
            setLoading={setLoading}
            className="col-span-3"
          />
        </div>
      </Container>
    </section>
  );
};

export default page;
