"use client";

import { Product } from "@/types";
import React, { useState } from "react";

export const usePagination = (data?: Array<Product>, itemPerPage?: number) => {
  const [currentPage, setcurrentPage] = useState(1);
  const maxPage = data && Math.ceil(data.length / (itemPerPage ?? 1));

  const currentData = () => {
    const begin = (currentPage - 1) * (itemPerPage ?? 1);
    const end = begin + (itemPerPage ?? 1);
    return data ? data.slice(begin, end) : undefined;
  };
  const next = () => {
    setcurrentPage((currentPage) => Math.min(currentPage + 1, maxPage ?? 1));
  };
  const prev = () => {
    setcurrentPage((currentPage) => Math.min(currentPage - 1, 1));
  };
  const jump = (page: number) => {
    const pageNumber = Math.max(1, page);
    setcurrentPage(() => Math.min(pageNumber, maxPage ?? 1));
  };

  return {
    currentData,
    next,
    prev,
    jump,
    currentPage,
    maxPage,
  };
};
