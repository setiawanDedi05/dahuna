import { Address, Expedition } from "@/@types";
import { toCurrency } from "@/components/custom/Currency";
import { SheetContent } from "@/components/ui/sheet";
import { Loader } from "lucide-react";
import React from "react";
import useSWR, { Fetcher } from "swr";

const fetcher: Fetcher<Expedition, string> = (args) =>
  fetch(args)
    .then((res) => res.json())
    .then((res) => {
      return res.content;
    });

export default function ExpeditionComponent({ data }: { data: Address }) {
  const {
    data: expeditions,
    error,
    isLoading,
  } = useSWR<Expedition>(
    `${process.env.NEXT_PUBLIC_URL}/api/expeditions?destination=${data.kota
      .split(".")[1]
      .toLowerCase()
      .trim()}&weight=${1}`,
    fetcher
  );

  if (error) {
    return <>{error.toString()}</>;
  }

  if (isLoading) {
    return <Loader className="animate-spin" />;
  }

  console.log({ expeditions });

  return (
    <SheetContent className="pt-5">
      {expeditions!.costs.map((item) => (
        <div key={item.code} className="flex flex-col p-5 shadow-md rounded-md">
          <span>{item.name}</span>
          <span>{item.type}</span>
          <span>{toCurrency({ amount: Number(item.price) })}</span>
          <span>{item.estimated}</span>
        </div>
      ))}
    </SheetContent>
  );
}
