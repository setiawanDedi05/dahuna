import { ProductDetailImage } from "@/components/modules/product/ProductDetail.image";
import { ProductDetailDescription } from "@/components/modules/product/ProductDetailDescription";
import prisma from "@/lib/db";

async function pages({ params }: { params: { id: string } }) {
  const product = await prisma.product.findUnique({
    where: {
      id: params.id,
    },
    include: {
      Images: true,
    },
  });

  return (
    <section className="grid md:grid-cols-2 justify-center items-center my-10 gap-y-5">
      <ProductDetailImage product={product} />
      <ProductDetailDescription product={product} />
    </section>
  );
}

export default pages;
