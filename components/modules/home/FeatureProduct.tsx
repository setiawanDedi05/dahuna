"use client";

import { Container } from "@/components/custom/Container";
import { Product } from "@/types";
import { motion } from "framer-motion";
import { LoaderIcon } from "lucide-react";
import Image from "next/image";
import React from "react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import useSWR, { Fetcher } from "swr";

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
    return <LoaderIcon className="animate-spin" />;
  }

  return (
    <motion.section
      initial={{
        opacity: 0,
        x: -100,
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
              slidesPerView: 1,
              spaceBetween: 40,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 40,
            },
            1280: {
              slidesPerView: 3,
              spaceBetween: 40,
            },
          }}
        >
          {
            <>
              {data &&
                data.map((item: Product) => (
                  <SwiperSlide key={item._id}>
                    <div className="p-5 shadow-md">
                      <Image
                        src={item.images && item.images[0]}
                        alt={item.title}
                        width={200}
                        height={300}
                      />
                      <h2 className="text-left">{item.title}</h2>
                      <h3 className="text-center font-bold text-3xl">
                        Rp. {item.price}
                      </h3>
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
