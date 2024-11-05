import {
  Brands,
  Categories,
  FeatureProduct,
  HomeSlide,
  Payment,
} from "@/components/modules/home";
import { Metadata } from "next";

export default function Home() {
  return (
    <>
      <HomeSlide />
      <Payment />
      <Categories />
      <FeatureProduct />
      <Brands />
    </>
  );
}

export const metaData: Metadata = {
  title: "Dahuna - Home page",
  description: "Ecommerce Clothing shop",
};
