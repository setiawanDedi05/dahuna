"use client";

import { Container } from "@/components/custom/Container";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Slide } from "@/@types";
import { motion } from "framer-motion";
import useSWR, { Fetcher } from "swr";
import { Skeleton } from "@/components/ui/skeleton";

export const HomeSlide = () => {
  const fetcher: Fetcher<Slide[], string> = (args) =>
    fetch(args)
      .then((res) => res.json())
      .then((res) => {
        return res.content;
      });

  const { data, error, isLoading } = useSWR<Slide[]>(
    process.env.NEXT_PUBLIC_URL + "/api/slides",
    fetcher
  );

  if (error) {
    return <>Error</>;
  }

  if (isLoading) {
    return <div className="h-[900px] w-full p-10">
      <Skeleton className="w-full h-full" />
    </div> 
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
              {data &&
                data.map((item: Slide) => (
                  <SwiperSlide
                    key={item._id}
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
