import { SortingEnum } from "@/@types";
import { Container } from "@/components/custom/Container";
import {
  ProductBreadCrumb,
  ProductsContent,
  ProductSideBar,
} from "@/components/modules/product";
import prisma from "@/lib/db";

export default async function Products({
  searchParams,
}: {
  searchParams: {
    category: string;
    min: string;
    max: string;
    limit: string;
    sort: string;
    page: string;
  };
}) {
  const { category, min, max, limit, sort, page } = searchParams;
  const orderBy = getOrderBy(sort) as any;
  const slug = category
    ? {
        Category: {
          slug: category,
        },
      }
    : {};
  const [categories, [total, products]] = await Promise.all([
    prisma.category.findMany(),
    prisma.$transaction([
      prisma.product.count({
        where: {
          categoryId: category ? category : { not: "" },
          priceDisplay: {
            gte: Number(min ?? 0),
            lte: Number(max ?? 1000000),
          },
        },
      }),
      prisma.product.findMany({
        where: {
          ...slug,
          priceDisplay: {
            gte: Number(min ?? 0),
            lte: Number(max ?? 1000000),
          },
        },
        orderBy: orderBy,
        skip: Number(page) * Number(limit) - 1 || 0,
        take: Number(limit) || 10,
        include: {
          Images: true,
        },
      }),
    ]),
  ]);

  return (
    <section className="my-10">
      <Container>
        <ProductBreadCrumb />
        <div className="grid grid-cols-1 md:grid-cols-[100px_1fr] lg:grid-cols-[200px_1fr] xl:grid-cols-[300px_1fr] gap-12 items-start">
          <ProductSideBar categories={categories} className="hidden md:flex" />
          <ProductsContent
            categories={categories}
            products={products}
            total={total}
          />
        </div>
      </Container>
    </section>
  );
}

const getOrderBy = (sort: string) => {
  switch (sort) {
    case SortingEnum.Alphabetic.toLowerCase():
      return {
        name: "asc",
      };
    case SortingEnum.Latest.toLowerCase():
      return {
        updatedAt: "desc",
      };
    case SortingEnum.PriceToHigh.toLowerCase():
      return {
        priceDisplay: "desc",
      };
    case SortingEnum.PriceToLow.toLowerCase():
      return {
        priceDisplay: "asc",
      };
    default:
      return {};
  }
};
