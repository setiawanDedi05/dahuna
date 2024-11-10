"use client";

import { Container } from "@/components/custom/Container";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Slide } from "@/@types";
import { motion } from "framer-motion";

type HomeSlideProps = {
  slides: Slide[];
};
export const HomeSlide = ({ slides }: HomeSlideProps) => {
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
    >
      <Container>
        <Swiper
          autoplay={{
            delay: 6000,
            disableOnInteraction: false,
          }}
          navigation={true}
          pagination={true}
          modules={[Autoplay, Navigation, Pagination]}
        >
          {
            <>
              {slides &&
                slides.map((item: Slide) => (
                  <SwiperSlide
                    key={item.id}
                    style={{
                      background: `url(${item.image})`,
                      height: "800px",
                      width: "100%",
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      backgroundRepeat: "no-repeat",
                    }}
                  ></SwiperSlide>
                ))}
            </>
          }
        </Swiper>
      </Container>
    </motion.section>
  );
};
