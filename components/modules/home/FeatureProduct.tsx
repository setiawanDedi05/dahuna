"use client";

import { Container } from "@/components/custom/Container";
import { Row } from "@/components/custom/Row";
import { Product } from "@/@types";
import { motion } from "framer-motion";
import React from "react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Heading } from "./Heading";
import { ProductCard } from "../product";

type FeatureProductProps = {
  products: Product[];
};

export const FeatureProduct = ({ products }: FeatureProductProps) => {
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
              {products &&
                products.map((item: Product) => (
                  <SwiperSlide
                    key={item.id}
                    style={{
                      height: "500px",
                      width: "400px",
                    }}
                  >
                    <ProductCard item={item} />
                  </SwiperSlide>
                ))}
            </>
          }
        </Swiper>
      </Container>
    </motion.section>
  );
};
