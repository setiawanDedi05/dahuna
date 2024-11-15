"use client";

import { Address, Cart, CostExpedition } from "@/@types";
import { useAuth, useUser } from "@clerk/nextjs";
import useSWR, { Fetcher } from "swr";
import { Skeleton } from "@/components/ui/skeleton";
import ProductListComponent from "@/components/modules/checkout/productList";
import SummaryComponent from "@/components/modules/checkout/summary";
import { useState } from "react";
import AddressComponent from "@/components/modules/checkout/address";
import ExpeditionComponent from "@/components/modules/checkout/expredition";
import VoucherComponent from "@/components/modules/checkout/voucher";
import { Voucher } from "@prisma/client";
import { toast } from "sonner";
import { User } from "@clerk/nextjs/server";

const fetcher: Fetcher<Address[], string> = (args) =>
  fetch(args)
    .then((res) => res.json())
    .then((res) => {
      return res.content;
    });

const fetcherCart: Fetcher<Cart[], string> = (args) =>
  fetch(args)
    .then((res) => res.json())
    .then((res) => {
      return res.content;
    });

export default function CheckoutPage() {
  const [expedition, setExpedition] = useState<CostExpedition>();
  const [voucher, setVoucher] = useState<Voucher>();
  const { userId } = useAuth();
  const [isDropship, setIsDropship] = useState<boolean>(false);
  const [nameDropShip, setNameDropShip] = useState<string>();
  const [noTelpDropShip, setNoTelpDropShip] = useState<string>();
  const [note, setNote] = useState<string>();
  const serviceFee = 1000;
  const { user } = useUser();

  const { data, error, isLoading } = useSWR<Address[]>(
    userId && `${process.env.NEXT_PUBLIC_URL}/api/address?userId=${userId}`,
    fetcher
  );

  const {
    data: carts,
    error: errorCarts,
    isLoading: isLoadingCart,
  } = useSWR<Cart[]>(
    userId && process.env.NEXT_PUBLIC_URL + "/api/cart?userId=" + userId,
    fetcherCart
  );

  const totalAmount = carts?.reduce(
    (accumulator, currenValue) =>
      accumulator + currenValue.price * currenValue.quantity,
    0
  );

  if (error || errorCarts) {
    return toast.info(
      "Gagal dalam mengambil data, Terjadi Kesalahan Tunggu beberapa saat lagi"
    );
  }

  if (isLoading || isLoadingCart) {
    return (
      <div className="bg-primary-foreground flex flex-col justify-center items-center p-5 gap-3">
        <Skeleton className="w-4/5 h-[200px] rounded-md shadow-md px-5 py-3" />
        <Skeleton className="w-4/5 h-[300px] rounded-md shadow-md px-5 py-3" />
        <Skeleton className="w-4/5 h-[300px] rounded-md shadow-md px-5 py-3" />
      </div>
    );
  }

  return (
    <div className="bg-primary-foreground flex flex-col justify-center items-center p-5 gap-3">
      <AddressComponent
        setIsCheck={setIsDropship}
        isCheck={isDropship}
        setName={setNameDropShip}
        name={nameDropShip}
        noTelp={noTelpDropShip}
        setNoTelp={setNoTelpDropShip}
        data={data!}
        note={note as string}
        setNote={setNote}
      />
      <ExpeditionComponent
        data={data ? data[0] : undefined}
        setExpedition={setExpedition}
        expedition={expedition}
      />
      <ProductListComponent carts={carts!} totalAmount={totalAmount} />
      <VoucherComponent voucher={voucher} setVoucher={setVoucher} />
      <SummaryComponent
        carts={carts as Cart[]}
        address={data?.length ? data[0] : undefined}
        voucher={voucher}
        user={user as unknown as User}
        totalAmountProduct={totalAmount ?? 0}
        expeditionFee={Number(expedition?.price ?? 0)}
        serviceFee={serviceFee}
        disabledOrder={
          !Boolean(data?.length) ||
          !Boolean(expedition) ||
          !Boolean(totalAmount)
        }
      />
    </div>
  );
}
