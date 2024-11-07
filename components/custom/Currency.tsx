import { cn } from "@/lib/utils";
import React from "react";

type CurrencyProps = {
  amount: string | number;
  currency?: string;
  locale?: string;
  className?: string;
};

export const Currency = ({
  amount,
  currency = "IDR",
  locale = "id-ID",
  className,
}: CurrencyProps) => {
  const newAmount = toCurrency({ amount, currency, locale });

  return <span className={cn(className)}>{newAmount}</span>;
};

export const toCurrency = ({
  amount,
  currency = "IDR",
  locale = "id-ID",
}: CurrencyProps) => {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
  }).format(Number(amount));
};
