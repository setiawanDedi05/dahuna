"use client";

import { Product } from "@/@types";
import { toCurrency } from "@/components/custom/Currency";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import axios from "axios";
import { useParams } from "next/navigation";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import useSWR, { Fetcher } from "swr";

function pages() {
  const params = useParams<{ id: string }>();
  const fetcher: Fetcher<Product, string> = (args) =>
    fetch(args)
      .then((res) => res.json())
      .then((res) => {
        return res.content;
      });

  const { data, error, isLoading } = useSWR<Product>(
    process.env.NEXT_PUBLIC_URL + "/api/products?id=" + params.id,
    fetcher
  );

  if (error) {
    return <>Error</>;
  }

  if (isLoading) {
    return (
      <div className="grid md:grid-cols-2 justify-center items-center my-10 gap-y-5">
        <Skeleton className="w-[300px] h-[400px] mx-auto" />
        <div className="flex flex-col px-5 h-full">
          <Skeleton className="w-2/4 h-3 mb-2" />
          <Skeleton className="w-3/4 h-5" />
          <Skeleton className="w-3/4 h-5 my-5" />
          <Skeleton className="w-full h-5" />
          <Skeleton className="w-full lg:w-52 h-14 mt-auto" />
        </div>
      </div>
    );
  }

  const handleCheckout = async () => {
    try {
      const response = await axios({
        method: "POST",
        url: "/api/payment",
      });
      window.snap.pay(response.data.token);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="grid md:grid-cols-2 justify-center items-center my-10 gap-y-5">
      <div className="w-[300px] h-[400px] mx-auto">
        <Swiper
          navigation={true}
          pagination={false}
          modules={[Autoplay, Navigation, Pagination]}
        >
          {
            <>
              {data &&
                data.images.map((image: string, index: number) => (
                  <SwiperSlide
                    key={index}
                    style={{
                      background: `url(${image})`,
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
      <div className="flex flex-col px-5 h-full">
        <span className="line-through text-md leading-none font-bold text-muted-foreground">
          {toCurrency({ amount: data!.real_price })}
        </span>
        <span className="text-2xl leading-none font-bold">
          {toCurrency({ amount: data!.price })}
        </span>
        <h2 className="text-xl font-bold my-5">{data?.title}</h2>
        <span className="text-md text-muted-foreground rounded-md">
          {data?.description}
        </span>
        <div className="flex flex-col lg:flex-row gap-3 mt-auto">
          <Button
            variant="outline"
            className="h-14 lg:w-52 uppercase font-bold"
            onClick={handleCheckout}
          >
            Save to Cart
          </Button>
          <Button
            className="h-14 lg:w-52 uppercase font-bold"
            onClick={handleCheckout}
          >
            Checkout
          </Button>
        </div>
      </div>
    </section>
  );
}

export default pages;
