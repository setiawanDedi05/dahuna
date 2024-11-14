import { Kota, Provinsi } from "@/@types";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { TabsContent } from "@/components/ui/tabs";
import { Loader } from "lucide-react";
import React from "react";
import useSWR, { Fetcher } from "swr";

const fetcher: Fetcher<Kota[], string> = (args) =>
  fetch(args)
    .then((res) => res.json())
    .then((res) => {
      return res.content;
    });

export default function KotaComponent({
  setKota,
  kota,
  provinsi,
}: {
  setKota?: (value: Kota) => void;
  kota?: Kota;
  provinsi?: Provinsi;
}) {
  const { data, error, isLoading } = useSWR<Kota[]>(
    `${process.env.NEXT_PUBLIC_URL}/api/binder-byte/kota?provinsiId=${provinsi?.id}`,
    fetcher
  );

  if (error) {
    return <>{error.toString()}</>;
  }

  if (isLoading) {
    return <Loader className="animate-spin" />;
  }

  return (
    <TabsContent value="kota">
      <ScrollArea className="flex flex-col h-[400px]">
        {data?.map((item) => (
          <Button
            variant={kota?.id === item.id ? "default" : "outline"}
            key={item.id}
            className="block w-full text-start my-2"
            onClick={() => setKota!(item)}
          >
            {item.name}
          </Button>
        ))}
      </ScrollArea>
    </TabsContent>
  );
}