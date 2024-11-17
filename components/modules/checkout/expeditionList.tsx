import { Expedition } from "@/@types";
import { toCurrency } from "@/components/custom/Currency";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { setExpedition } from "@/redux/reducer/orderSlice";
import { RootState } from "@/redux/store";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import useSWR, { Fetcher } from "swr";

const fetcher: Fetcher<Expedition, string> = (args) =>
  fetch(args)
    .then((res) => res.json())
    .then((res) => {
      return res.content;
    });

export default function ExpeditionListComponent({
  setOpen,
}: {
  setOpen: (value: boolean) => void;
}) {
  const dispatch = useDispatch()
  const { addresses, expedition } = useSelector(
    (state: RootState) => state.order
  );
  const {
    data: expeditions,
    error,
    isLoading,
  } = useSWR<Expedition>(
    addresses
      ? `${process.env.NEXT_PUBLIC_URL}/api/expeditions?destination=${addresses[0].kota
          .split(".")[1]
          .toLowerCase()
          .trim()}&weight=${1}`
      : null,
    fetcher
  );

  if (error) {
    return toast.info(
      "Gagal dalam mengambil data, Terjadi Kesalahan Tunggu beberapa saat lagi"
    );
  }

  if (isLoading) {
    return (
      <div className="pt-5 h-[400px]">
        <Skeleton className="h-[80px] my-3 px-5 w-full flex items-starts justify-start shadow-md rounded-md" />
        <Skeleton className="h-[80px] my-3 px-5 w-full flex items-starts justify-start shadow-md rounded-md" />
        <Skeleton className="h-[80px] my-3 px-5 w-full flex items-starts justify-start shadow-md rounded-md" />
        <Skeleton className="h-[80px] my-3 px-5 w-full flex items-starts justify-start shadow-md rounded-md" />
      </div>
    );
  }

  return (
    <ScrollArea className="pt-5 h-[400px]">
      {expeditions?.costs
        // .filter((item) => item.service === "REG")
        .map((item, index) => (
          <Button
            variant={expedition?.code === item.code ? "default" : "outline"}
            key={item.code + "-" + index}
            className="h-[80px] my-3 px-5 w-full flex items-starts justify-start shadow-md rounded-md"
            onClick={() => {
              setOpen(false);
              dispatch(setExpedition(item));
            }}
          >
            <span className="text-xl font-bold">{item.name}</span>
            <div className="ml-auto flex flex-col items-end">
              <span className="text-2xl font-bold">
                {toCurrency({ amount: Number(item.price) })}
              </span>
              <span>Estimasi {item.estimated}</span>
            </div>
          </Button>
        ))}
    </ScrollArea>
  );
}
