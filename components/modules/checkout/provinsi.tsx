import { Provinsi } from "@/@types";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Loader2 } from "lucide-react";
import React from "react";
import { toast } from "sonner";
import useSWR, { Fetcher } from "swr";

const fetcher: Fetcher<Provinsi[], string> = (args) =>
  fetch(args)
    .then((res) => res.json())
    .then((res) => {
      return res.content;
    });

export default function ProvinsiComponent({
  setProvince,
  province,
  setSelectedTab,
}: {
  setProvince: (value: Provinsi) => void;
  setSelectedTab: (
    value: "provinsi" | "kota" | "kecamatan" | "kelurahan"
  ) => void;
  province?: Provinsi;
}) {
  const { data, error, isLoading } = useSWR<Provinsi[]>(
    `${process.env.NEXT_PUBLIC_URL}/api/binder-byte/provinsi`,
    fetcher
  );

  if (error) {
    return toast.info(
      "Gagal dalam mengambil data, Terjadi Kesalahan Tunggu beberapa saat lagi"
    );
  }

  if (isLoading) {
    return (
      <div className="h-[400px] w-full flex justify-center items-center">
        <Loader2 className="animate-spin" />
      </div>
    );
  }

  return (
    <ScrollArea className="flex flex-col h-[400px]">
      {data?.map((item) => (
        <Button
          variant={province?.id === item.id ? "default" : "outline"}
          key={item.id}
          className="block w-full text-start my-2"
          onClick={() => {
            setSelectedTab("kota");
            setProvince(item);
          }}
        >
          {item.name}
        </Button>
      ))}
    </ScrollArea>
  );
}
