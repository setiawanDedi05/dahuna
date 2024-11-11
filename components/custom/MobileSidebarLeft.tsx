"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { ListFilter } from "lucide-react";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { Button } from "../ui/button";
import {
  ProductCategory,
  ProductFiltersByPrice,
  ProductHeadingSideBar,
} from "../modules/product/ProductSideBar";
import { Category } from "@/@types";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

type MobileSideBarProps = {
  categories: Category[];
};

export const MobileSidebarLeft = ({ categories }: MobileSideBarProps) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const params = new URLSearchParams(searchParams);

  function handleSearch(query: string, value: string) {
    if (value) {
      params.set(query, value);
    } else {
      params.delete(query);
    }
    replace(`${pathname}?${params.toString()}`);
  }

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
                  className="grid grid-cols-3 sm:grid-cols-2 gap-3 w-full px-5 py-3"
                  handleSearch={handleSearch}
                />
              </div>
              <div className="flex flex-col gap-2 items-center w-full">
                <ProductHeadingSideBar title="Filter by price" />
                <ProductFiltersByPrice handleSearch={handleSearch} />
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};
