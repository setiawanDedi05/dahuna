import { cn } from "@/lib/utils";
import { Category } from "@/types";
import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

type ProductSideBarProps = {
  minPrice: number;
  setMinPrice: (value: number) => void;
  maxPrice: number;
  setMaxPrice: (value: number) => void;
  loading: boolean;
  setLoading: (value: boolean) => void;
  className?: string;
};

export const ProductSideBar = ({
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
  loading,
  setLoading,
  className,
}: ProductSideBarProps) => {
  return (
    <div className={cn("lg:!max-w-[300px] h-full", className)}>
      <div className="flex flex-col gap-8 items-center">
        <div className="flex flex-col gap-2 items-center w-full">
          <ProductHeadingSideBar title="Product Categories" />
          <ProductCatAccordions />
        </div>
      </div>
    </div>
  );
};

const ProductHeadingSideBar = ({ title }: { title: string }) => {
  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="flex justify-between items-center w-full">
        <h6 className="capitalize">{title}</h6>
      </div>
    </div>
  );
};

const ProductCatAccordions = () => {
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const getCategories = async () => {
      setLoading(true);
      await fetch(process.env.NEXT_PUBLIC_URL + "/api/categories")
        .then((res) => res.json())
        .then((res) => {
          setCategories(res.content);
        })
        .catch((error) => console.log(error))
        .finally(() => setLoading(false));
    };

    getCategories();
  }, []);

  return loading ? (
    <Loader2 className="animation-spin" />
  ) : (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger>see Categories?</AccordionTrigger>
        {categories.map((category: Category) => (
          <AccordionContent key={category._id}>
            {category.title}
          </AccordionContent>
        ))}
      </AccordionItem>
    </Accordion>
  );
};
