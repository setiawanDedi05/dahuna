"use client";

import React, { useState } from "react";

export const usePagination = (data: Array<any>, itemPerPage: number) => {
  const [currentPage, setcurrentPage] = useState(1);
  const maxPage = Math.ceil(data.length / itemPerPage);

  const currentData = () => {
    const begin = (currentPage - 1) * itemPerPage;
    const end = begin + itemPerPage;
    return data.slice(begin, end);
  };
  const next = () => {
    setcurrentPage((currentPage) => Math.min(currentPage + 1, maxPage));
  };
  const prev = () => {
    setcurrentPage((currentPage) => Math.min(currentPage - 1, 1));
  };
  const jump = (page: number) => {
    const pageNumber = Math.max(1, page);
    setcurrentPage(() => Math.min(pageNumber, maxPage));
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
