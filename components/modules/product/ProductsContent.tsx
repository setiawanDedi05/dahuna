import { cn } from "@/lib/utils";
import { Category, Product } from "@/@types";
import { ProductContent, ProductTopBar } from "./";
import { CustomPagination } from "@/components/custom/CustomPagination";

type ProductContentProps = {
  className?: string;
  categories: Category[];
  products: Product[];
  total: number;
};

export function ProductsContent({
  className,
  categories,
  products,
  total,
}: ProductContentProps) {
  return (
    <div className={cn(className)}>
      <ProductTopBar categories={categories} />
      <ProductContent products={products} />
      <div className="py-10 flex justify-between mt-auto">
        <CustomPagination total={total} />
      </div>
    </div>
  );
}
