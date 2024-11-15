import { Address } from "@/@types";
import { useAuth } from "@clerk/nextjs";
import { Loader, Map } from "lucide-react";
import React from "react";
import useSWR, { Fetcher } from "swr";

const fetcher: Fetcher<Address[], string> = (args) =>
  fetch(args)
    .then((res) => res.json())
    .then((res) => {
      return res.content;
    });

export default function AddressList() {
  const { userId } = useAuth();
  const { data, error, isLoading } = useSWR<Address[]>(
    `${process.env.NEXT_PUBLIC_URL}/api/address?userId=${userId}`,
    fetcher
  );

  if (error) {
    return <>{error.toString()}</>;
  }

  if (isLoading) {
    return <Loader className="animate-spin" />;
  }

  if (data?.length === 0) {
    return (
      <div className="border-2 flex justify-center items-center gap-5 my-3 border-dashed border-muted w-full h-[150px] text-muted-foreground">
        <Map /> Tidak ada Alamat terdaftar
      </div>
    );
  }

  return (
    <div className="flex flex-col my-5">
      {data!.map((address) => (
        <div key={address.id} className="border border-dashed p-5 flex flex-col">
          <span className="font-bold">{address.name}</span>
          <span className="text-muted-foreground">{address.noTelp}</span>
          <p>{`${address.detail}, ${address.kelurahan}, ${address.kecamatan}, ${address.kota}, ${address.provinsi}, ${address.kodePos}`}</p>
        </div>
      ))}
    </div>
  );
}
