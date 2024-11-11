"use client";

import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Button } from "../ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

export const CustomPagination = ({ total }: { total: number }) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const params = new URLSearchParams(searchParams);
  const totalPage = Math.ceil(total / Number(searchParams.get("limit") ?? 10));

  function handleSearch(query: string, value: string) {
    if (value) {
      params.set(query, value);
    } else {
      params.delete(query);
    }
    replace(`${pathname}?${params.toString()}`);
  }
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <Button
            variant="outline"
            onClick={() =>
              handleSearch("page", String(Number(searchParams.get("page")) - 1))
            }
            disabled={
              searchParams.get("page") === "1" ||
              searchParams.get("page") === undefined
            }
          >
            <ChevronLeft />
          </Button>
        </PaginationItem>
        {Array.from({ length: totalPage }, (_, index) => (
          <PaginationItem>
            <Button
              variant={
                Number(searchParams.get("page")) === index + 1
                  ? "default"
                  : "outline"
              }
              onClick={() => handleSearch("page", String(index + 1))}
            >
              {index + 1}
            </Button>
          </PaginationItem>
        ))}
        <PaginationItem>
          <Button
            variant="outline"
            onClick={() =>
              handleSearch("page", String(Number(searchParams.get("page")) + 1))
            }
            disabled={
              searchParams.get("page") === String(totalPage) ||
              searchParams.get("page") === undefined
            }
          >
            <ChevronRight />
          </Button>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};
