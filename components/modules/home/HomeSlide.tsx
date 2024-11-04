"use client";

import { Container } from "@/components/custom/Container";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Slide } from "@/types";
import "swiper/css/navigation";
import "swiper/css";
import "./style.css";
import { motion } from "framer-motion";
import { LoaderIcon } from "lucide-react";
import useSWR, { Fetcher } from "swr";

export const HomeSlide = () => {
  const fetcher: Fetcher<Slide[], string> = (args) =>
    fetch(args)
      .then((res) => res.json())
      .then((res) => {
        console.log({ res });
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
                      height: "900px",
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
