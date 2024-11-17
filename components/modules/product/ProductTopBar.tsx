"use client";

import { MobileSidebarLeft } from "@/components/modules/header/MobileSidebarLeft";
import { Category, SortingEnum } from "@/@types";
import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type ProductTopBarProps = {
  categories: Category[];
};

export const ProductTopBar = ({ categories }: ProductTopBarProps) => {
  const [filter, setFilter] = useState<SortingEnum>(SortingEnum.Latest);
  const [perPage, setPerPage] = useState<number>(10);
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const { replace } = useRouter();
  const pathname = usePathname();

  function handleSearch(query: string, value: string) {
    if (value) {
      params.set(query, value);
    } else {
      params.delete(query);
    }
    replace(`${pathname}?${params.toString()}`);
  }
  return (
    <div className="lg:flex items-center justify-between w-full mb-10">
      <div className="flex items-center gap-4 flex-1 justify-between">
        <MobileSidebarLeft categories={categories} />
        <div className="ms-auto">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="capitalize">
                {filter}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuSeparator />
              <DropdownMenuRadioGroup value="bottom">
                <DropdownMenuRadioItem
                  value="top"
                  onClick={() => {
                    setFilter(SortingEnum.Alphabetic);
                    handleSearch("sort", SortingEnum.Alphabetic.toLowerCase());
                  }}
                >
                  Alphabetic
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem
                  value={filter}
                  onClick={() => {
                    setFilter(SortingEnum.PriceToHigh);
                    handleSearch("sort", SortingEnum.PriceToHigh.toLowerCase());
                  }}
                >
                  Price: Low to High
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem
                  value={filter}
                  onClick={() => {
                    setFilter(SortingEnum.PriceToLow);
                    handleSearch("sort", SortingEnum.PriceToLow.toLowerCase());
                  }}
                >
                  Price: High to Low
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem
                  value={filter}
                  onClick={() => {
                    setFilter(SortingEnum.Latest);
                    handleSearch("sort", SortingEnum.Latest.toLowerCase());
                  }}
                >
                  Latest
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
          <span className="ms-4">Show: </span>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">{perPage}</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuRadioGroup>
                <DropdownMenuRadioItem
                  value="30"
                  onClick={() => {
                    setPerPage(10);
                    handleSearch("limit", "10");
                  }}
                >
                  10
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem
                  value="20"
                  onClick={() => {
                    setPerPage(20);
                    handleSearch("limit", "20");
                  }}
                >
                  20
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem
                  value="10"
                  onClick={() => {
                    setPerPage(10);
                    handleSearch("limit", "30");
                  }}
                >
                  30
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};
