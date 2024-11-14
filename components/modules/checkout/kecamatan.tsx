import { Kecamatan, Kota } from "@/@types";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { TabsContent } from "@/components/ui/tabs";
import { Loader } from "lucide-react";
import React from "react";
import useSWR, { Fetcher } from "swr";

const fetcher: Fetcher<Kecamatan[], string> = (args) =>
  fetch(args)
    .then((res) => res.json())
    .then((res) => {
      return res.content;
    });

export default function KecamatanComponent({
  setKecamatan,
  kecamatan,
  kota,
}: {
  setKecamatan?: (value: Kecamatan) => void;
  kecamatan?: Kecamatan;
  kota?: Kota;
}) {
  const { data, error, isLoading } = useSWR<Kecamatan[]>(
    `${process.env.NEXT_PUBLIC_URL}/api/binder-byte/kecamatan?kotaId=${kota?.id}`,
    fetcher
  );

  if (error) {
    return <>{error.toString()}</>;
  }

  if (isLoading) {
    return <Loader className="animate-spin" />;
  }

  return (
    <TabsContent value="kecamatan">
      <ScrollArea className="flex flex-col h-[400px]">
        {data?.map((item) => (
          <Button
            variant={kecamatan?.id === item.id ? "default" : "outline"}
            key={item.id}
            className="block w-full text-start my-2"
            onClick={() => setKecamatan!(item)}
          >
            {item.name}
          </Button>
        ))}
      </ScrollArea>
    </TabsContent>
  );
}
