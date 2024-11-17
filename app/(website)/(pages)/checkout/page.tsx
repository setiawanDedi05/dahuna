"use client";

import { Skeleton } from "@/components/ui/skeleton";
import ProductListComponent from "@/components/modules/checkout/productList";
import SummaryComponent from "@/components/modules/checkout/summary";
import AddressComponent from "@/components/modules/checkout/address";
import ExpeditionComponent from "@/components/modules/checkout/expredition";
import VoucherComponent from "@/components/modules/checkout/voucher";
import { toast } from "sonner";
import { useAddresses } from "@/hooks/use-address";

export default function CheckoutPage() {
  const { isLoading, error } = useAddresses();

  if (error) {
    return toast.info(
      "Gagal dalam mengambil data, Terjadi Kesalahan Tunggu beberapa saat lagi"
    );
  }

  if (isLoading) {
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
      <AddressComponent />
      <ExpeditionComponent />
      <ProductListComponent />
      <VoucherComponent />
      <SummaryComponent />
    </div>
  );
}
