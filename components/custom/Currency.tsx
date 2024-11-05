import { cn } from "@/lib/utils";
import React from "react";

type iAppProps = {
  amount: string;
  currency?: string;
  locale?: string;
  className: string;
};

export const Currency = ({
  amount,
  currency = "IDR",
  locale = "id-ID",
  className,
}: iAppProps) => {
  const newAmount = new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
  }).format(Number(amount));

  return <span className={cn(className)}>{newAmount}</span>;
};
