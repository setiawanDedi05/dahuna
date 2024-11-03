"use client";

import { Container } from "@/components/custom/Container";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Slide } from "@/types";
import "swiper/css/navigation";
import "swiper/css";
import "./style.css";

export const HomeSlide = () => {
  const slides: Slide[] = [
    {
      _id: "1",
      name: "Nobis maxime quos eum.",
      link: "/",
      slug: "nulla-distinctio-at",
      title:
        "Consectetur eu sint aliquip excepteur amet deserunt tempor excepteur dolore dolor pariatur.",
      description:
        "Elit commodo consequat laborum laborum dolor ex esse aliquip tempor ut anim proident.",
      subtitle: "Ullamco ex sit laborum reprehenderit.",
      btn: "shopnow",
      image: "/assets/images/image-1.jpg",
      textColor: "#000",
      createdAt: "11/3/2024, 10:07:43 AM",
    },
    {
      _id: "2",
      name: "Debitis maxime natus ad.",
      link: "/",
      slug: "Fugit assumenda et laudantium consequatur provident nostrum.",
      title: "Dolor vel non.",
      description: "deleniti-dolores-ut",
      subtitle:
        "Et asperiores magnam quod fugiat autem veritatis. Neque nulla id inventore tempora iusto doloribus accusantium. Est earum error. Tempora sit adipisci inventore quo aut. Enim at dolorum in iure.",
      btn: "",
      image: "/assets/images/image-2.jpg",
      textColor: "#000",
      createdAt: "11/3/2024, 10:13:52 AM",
    },
  ];
  return (
    <section>
      <Container>
        <Swiper
          autoplay={{
            delay: 6000,
            disableOnInteraction: false,
          }}
          spaceBetween={50}
          slidesPerView={1}
          navigation={true}
          pagination={true}
          modules={[Autoplay, Navigation, Pagination]}
        >
          {
            <>
              {slides.map((item: Slide) => (
                <SwiperSlide
                  key={item._id}
                  style={{
                    background: `url(${item.image})`,
                    height: "700px",
                    width: "100%",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat"
                  }}
                ></SwiperSlide>
              ))}
            </>
          }
        </Swiper>
      </Container>
    </section>
  );
};
