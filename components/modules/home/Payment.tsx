"use client";

import { Container } from "@/components/custom/Container";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { CreditCard, Headset, Shield } from "lucide-react";
import { motion } from "framer-motion";
import { Heading } from "./Heading";
import { Row } from "@/components/custom/Row";

export const Payment = () => {
  return (
    <motion.section
      className="py-10"
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
    >
      <Container>
        <Row className="mb-10">
          <Heading title="Trusted" />
        </Row>
        <Swiper
          breakpoints={{
            360: {
              slidesPerView: 1,
              spaceBetween: 40,
            },
            575: {
              slidesPerView: 1,
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
          spaceBetween={50}
          slidesPerView={5}
          navigation={false}
          pagination={true}
          modules={[Autoplay, Navigation, Pagination]}
          className="shadow-md w-full flex items-center justify-center border border-slate-200 rounded-md px-20 py-10"
        >
          <SwiperSlide className="relative py-10">
            <div className="flex flex-col justify-center items-center gap-4">
              <Headset className="text-primary size-10 font-bold" />
              <h6 className="uppercase text-base"> 24/7</h6>
              <span className="text-sm">Support every time</span>
            </div>
          </SwiperSlide>
          <SwiperSlide className="relative py-10">
            <div className="flex flex-col items-center gap-4">
              <CreditCard className="text-primary size-10" />
              <h6 className="uppercase"> Accept Payment</h6>
              <span className="text-sm">QRIS, TRANSFER</span>
            </div>
          </SwiperSlide>
          <SwiperSlide className="relative py-10">
            <div className="flex flex-col items-center gap-4">
              <Shield className="text-primary size-10" />
              <h6 className="uppercase">Secure Payment</h6>
              <span className="text-sm">100% Secured</span>
            </div>
          </SwiperSlide>
        </Swiper>
      </Container>
    </motion.section>
  );
};
