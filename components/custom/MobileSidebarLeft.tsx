import React from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { ListFilter } from "lucide-react";
import { cn } from "@/lib/utils";
import { ProductSideBar } from "../modules/product";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { Button } from "../ui/button";
import {
  ProductCategory,
  ProductFiltersByPrice,
  ProductHeadingSideBar,
} from "../modules/product/ProductSideBar";
import { Category } from "@/@types";

type MobileSideBarProps = {
  minPrice: number;
  setMinPrice: (value: number) => void;
  maxPrice: number;
  setMaxPrice: (value: number) => void;
  loading: boolean;
  setLoading: (value: boolean) => void;
  categories: Category[];
};

export const MobileSidebarLeft = ({
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
  loading,
  setLoading,
  categories,
}: MobileSideBarProps) => {
  return (
    <div className="flex md:hidden">
      <Sheet>
        <SheetTrigger>
          <Tooltip>
            <TooltipTrigger>
              <Button variant="outline" size="icon">
                <ListFilter size={20} />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Filter Products</p>
            </TooltipContent>
          </Tooltip>
        </SheetTrigger>
        <SheetContent
          side="left"
          className={cn("px-4 w-full [&>#closeBtn]:text-4xl", "md:w-[400px]")}
        >
          <SheetTitle></SheetTitle>
          <SheetDescription></SheetDescription>
          <div className={cn("h-full flex flex-col")}>
            <div className="flex flex-col gap-8 items-center">
              <div className="flex flex-col gap-2 items-center w-full">
                <ProductHeadingSideBar title="Product Categories" />
                <ProductCategory
                  categories={categories}
                  loading={loading}
                  setLoading={setLoading}
                  className="grid grid-cols-3 sm:grid-cols-2 gap-3 w-full px-5 py-3"
                />
              </div>
              <div className="flex flex-col gap-2 items-center w-full">
                <ProductHeadingSideBar title="Filter by price" />
                <ProductFiltersByPrice
                  minPrice={minPrice}
                  maxPrice={maxPrice}
                  setMinPrice={setMinPrice}
                  setMaxPrice={setMaxPrice}
                />
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};
