import { MobileSidebarLeft } from "@/components/custom/MobileSidebarLeft";
import { Product } from "@/types";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

type ProductTopBarProps = {
  minPrice: number;
  setMinPrice: (value: number) => void;
  maxPrice: number;
  setMaxPrice: (value: number) => void;
  loading: boolean;
  setLoading: (value: boolean) => void;
  perPage: number;
  setPerPage: (value: number) => void;
  filter: string;
  setFilter: (value: string) => void;
  maxPage: number;
  page: number;
  products: Product[];
};
export const ProductTopBar = ({
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
  loading,
  setLoading,
  perPage,
  setPerPage,
  filter,
  setFilter,
  maxPage,
  page,
  products,
}: ProductTopBarProps) => {
  return (
    <div className="lg:flex items-center justify-between w-full">
      <div className="flex items-center gap-4 flex-1 justify-between">
        <MobileSidebarLeft />
        <div className="hidden lg:block">
          Showing {maxPage === page ? products.length : perPage * page} of{" "}
          {products.length} results
        </div>
        <div className="ms-auto">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">{filter}</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuSeparator />
              <DropdownMenuRadioGroup value="bottom">
                <DropdownMenuRadioItem
                  value="top"
                  onClick={() => setFilter("alphabetic")}
                >
                  Alphabetic
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem
                  value={filter}
                  onClick={() => setFilter("priceLowToHigh")}
                >
                  Price: Low to High
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem
                  value={filter}
                  onClick={() => setFilter("priceHighToLow")}
                >
                  Price: High to Low
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem
                  value={filter}
                  onClick={() => setFilter("latest")}
                >
                  Latest
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
          <span className="ms-4">Show:</span>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">{perPage}</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuRadioGroup>
                <DropdownMenuRadioItem
                  value="30"
                  onClick={() => setPerPage(30)}
                >
                  30
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem
                  value="20"
                  onClick={() => setPerPage(20)}
                >
                  20
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem
                  value="10"
                  onClick={() => setPerPage(10)}
                >
                  10
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};
