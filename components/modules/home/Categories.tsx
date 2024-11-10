"use client";

import { Container } from "@/components/custom/Container";
import { Row } from "@/components/custom/Row";
import { Skeleton } from "@/components/ui/skeleton";
import { Category } from "@/@types";
import { motion } from "framer-motion";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import useSWR, { Fetcher } from "swr";
import { Heading } from "./Heading";
import { useRouter } from "next/navigation";

type CategoryProps = {
  categories: Category[];
};

export const Categories = ({ categories }: CategoryProps) => {
  const { push } = useRouter();
  const animation = {
    hide: { scale: 0, opacity: 0 },
    show: { scale: 1, opacity: 1 },
  };

  // const fetcher: Fetcher<Category[], string> = (args) =>
  //   fetch(args)
  //     .then((res) => res.json())
  //     .then((res) => {
  //       return res.content;
  //     });

  // const { data, error, isLoading } = useSWR<Category[]>(
  //   process.env.NEXT_PUBLIC_URL + "/api/categories",
  //   fetcher
  // );

  // if (error) {
  //   return <>Error</>;
  // }

  // if (isLoading) {
  //   return (
  //     <div className="h-[700px] w-3/4 p-10 mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 overflow-hidden">
  //       <div className="h-[700px] flex flex-col -space-y-28">
  //         <Skeleton className="w-full h-full" />
  //         <div className="space-y-2">
  //           <Skeleton className="h-10 w-[250px] md:w-[200px] mx-auto" />
  //         </div>
  //       </div>
  //       <div className="h-[700px] flex flex-col -space-y-28">
  //         <Skeleton className="w-full h-full" />
  //         <div className="space-y-2">
  //           <Skeleton className="h-10 w-[250px] md:w-[200px] mx-auto" />
  //         </div>
  //       </div>
  //       <div className="h-[700px] flex flex-col -space-y-28">
  //         <Skeleton className="w-full h-full" />
  //         <div className="space-y-2">
  //           <Skeleton className="h-10 w-[250px] md:w-[200px] mx-auto" />
  //         </div>
  //       </div>
  //     </div>
  //   );
  // }

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
        <Row className="mb-10">
          <Heading title="Shop By Category" />
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
              slidesPerView: 1,
              spaceBetween: 40,
            },
            768: {
              slidesPerView: 2,
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
              {categories &&
                categories.map((item: Category, idx: number) => (
                  <SwiperSlide
                    key={item.id}
                    style={{
                      background: `url(${item.image})`,
                      height: "500px",
                      width: "100%",
                      backgroundSize: "contain",
                      backgroundPosition: "center",
                      backgroundRepeat: "no-repeat",
                    }}
                  >
                    <div
                      className="absolute bottom-10 text-primary-foreground hover:bg-primary-foreground/30 hover:text-primary font-extrabold text-2xl bg-black/30 backdrop-blur-sm p-5 rounded-sm shadow-xl duration-300 ease-linear cursor-pointer left-[25%] right-[25%]"
                      onClick={() => {
                        push("/products?category=" + item.id);
                      }}
                    >
                      <motion.h2
                        initial={animation.hide}
                        whileInView={animation.show}
                        transition={{
                          delay: 0.1,
                        }}
                        className="drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] hover:drop-shadow-[0_1.2px_1.2px_rgba(255,255,255,0.8)]"
                      >
                        {item.title}
                      </motion.h2>
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
