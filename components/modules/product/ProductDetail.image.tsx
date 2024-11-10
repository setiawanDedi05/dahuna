"use client";

import { Product, ProductImages } from "@/@types";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

type ProductDetailImageProps = {
  product: Product | null;
};

export const ProductDetailImage = ({ product }: ProductDetailImageProps) => {
  return (
    <div className="w-[300px] h-[400px] mx-auto">
      <Swiper
        navigation={true}
        pagination={false}
        modules={[Autoplay, Navigation, Pagination]}
      >
        {
          <>
            {product &&
              product.Images.map((image: ProductImages) => (
                <SwiperSlide
                  key={image.id}
                  style={{
                    background: `url(${image.url})`,
                    height: "400px",
                    width: "100%",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    borderRadius: "calc(var(--radius) - 2px)",
                  }}
                />
              ))}
          </>
        }
      </Swiper>
    </div>
  );
};
