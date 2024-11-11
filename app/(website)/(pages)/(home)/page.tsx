import {
  Brands,
  Categories,
  FeatureProduct,
  HomeSlide,
  Payment,
} from "@/components/modules/home";
import prisma from "@/lib/db";

export default async function Home() {
  const [slides, categories, products, brands] = await Promise.all([
    prisma.slide.findMany(),
    prisma.category.findMany(),
    prisma.product.findMany({
      include: {
        Images: true,
      },
    }),
    prisma.brands.findMany(),
  ]);
  return (
    <>
      <HomeSlide slides={slides} />
      <Payment />
      <Categories categories={categories} />
      <FeatureProduct products={products} />
      <Brands />
    </>
  );
}
