"use client";

import { Container } from "@/components/custom/Container";
import { Currency } from "@/components/custom/Currency";
import { Row } from "@/components/custom/Row";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Product } from "@/types";
import { motion } from "framer-motion";
import { Heart, ShoppingCartIcon } from "lucide-react";
import Image from "next/image";
import React from "react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import useSWR, { Fetcher } from "swr";
import { Heading } from "./Heading";

const SkeletonProductCard = () => (
  <div className="h-[500px] flex flex-col space-y-3">
    <Skeleton className="w-full h-3/4" />
    <div className="space-y-2">
      <Skeleton className="h-4 w-[250px] xl:w-[200px]" />
      <Skeleton className="h-4 w-[200px] xl:w-[150px]" />
    </div>
  </div>
);

export const FeatureProduct = () => {
  const fetcher: Fetcher<Product[], string> = (args) =>
    fetch(args)
      .then((res) => res.json())
      .then((res) => {
        return res.content;
      });

  const { data, error, isLoading } = useSWR<Product[]>(
    process.env.NEXT_PUBLIC_URL + "/api/products",
    fetcher
  );

  if (error) {
    return <>Error</>;
  }

  if (isLoading) {
    return (
      <div className="h-[500px] w-3/4 p-10 mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-10 overflow-hidden">
        <SkeletonProductCard />
        <SkeletonProductCard />
        <SkeletonProductCard />
        <SkeletonProductCard />
        <SkeletonProductCard />
      </div>
    );
  }

  return (
    <motion.section
      initial={{
        opacity: 0,
        x: 100,
      }}
      whileInView={{
        opacity: 1,
        x: 0,
      }}
      transition={{
        duration: 0.3,
      }}
      className="py-10"
    >
      <Container>
        <Row className="mb-10">
          <Heading title="Products" />
        </Row>
        <Swiper
          autoplay={{
            delay: 6000,
            disableOnInteraction: false,
          }}
          spaceBetween={50}
          navigation={false}
          pagination={true}
          modules={[Autoplay, Navigation, Pagination]}
          breakpoints={{
            360: {
              slidesPerView: 1,
              spaceBetween: 40,
            },
            575: {
              slidesPerView: 2,
              spaceBetween: 40,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 40,
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 40,
            },
            1280: {
              slidesPerView: 5,
              spaceBetween: 40,
            },
          }}
        >
          {
            <>
              {data &&
                data.map((item: Product) => (
                  <SwiperSlide
                    key={item._id}
                    style={{
                      height: "500px",
                      width: "400px",
                    }}
                  >
                    <div className="p-3 w-full h-full border flex flex-col justify-start gap-1">
                      <Button
                        variant="outline"
                        className="absolute size-10 right-5 top-5"
                      >
                        <ShoppingCartIcon className="size-8" />
                      </Button>
                      <Button
                        variant="outline"
                        className="absolute size-10 right-16 top-5"
                      >
                        <Heart className="size-8" />
                      </Button>
                      <Image
                        src={item.images && item.images[0]}
                        alt={item.title}
                        width={300}
                        height={400}
                        className="!h-[400px] !w-[300px] object-cover"
                      />
                      <h2 className="text-left truncate text-xl font-bold leading-10">
                        {item.title}
                      </h2>
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
                  </SwiperSlide>
                ))}
            </>
          }
        </Swiper>
      </Container>
    </motion.section>
  );
};
