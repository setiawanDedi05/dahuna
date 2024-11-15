import { Address, Cart } from "@/@types";
import { toCurrency } from "@/components/custom/Currency";
import { Button } from "@/components/ui/button";
import { User } from "@clerk/nextjs/server";
import { Voucher } from "@prisma/client";
import axios from "axios";
import { Paperclip } from "lucide-react";
import React from "react";
import { toast } from "sonner";

export default function SummaryComponent({
  totalAmountProduct,
  expeditionFee,
  serviceFee,
  disabledOrder,
  voucher,
  carts,
  user,
  address,
}: {
  totalAmountProduct: number;
  address: Address | undefined;
  expeditionFee: number;
  serviceFee: number;
  voucher: Voucher | undefined;
  disabledOrder: boolean;
  carts: Cart[];
  user?: User;
}) {
  const total =
    totalAmountProduct + expeditionFee + serviceFee - (voucher?.amount ?? 0);

  const handleCheckout = async () => {
    try {
      const response = await axios({
        method: "POST",
        url: "/api/payment",
        data: {
          cart: carts,
          user,
          totalAmount: total,
          addressId: address?.id as string,
          expedition: "jne",
          expeditionFee: expeditionFee,
          voucherId: voucher?.id as string,
        },
      });
      window.snap.pay(response.data.token);
    } catch (error) {
      return toast.info(
        "Gagal dalam mengambil data, Terjadi Kesalahan Tunggu beberapa saat lagi"
      );
    }
  };
  return (
    <div className="w-4/5 border-t-4 bg-primary-foreground rounded-md shadow-md px-5 py-3">
      <div className="flex items-center gap-x-3">
        <Paperclip size={32} /> <span className="font-bold">Summary</span>
      </div>
      <div className="flex flex-col justify-between items-end gap-y-5">
        <div className="flex w-[300px] justify-between">
          <span>Subtotal Product</span>
          <span>{toCurrency({ amount: totalAmountProduct as number })}</span>
        </div>
        <div className="flex w-[300px] justify-between">
          <span>Subtotal Pengiriman</span>
          <span>{toCurrency({ amount: expeditionFee })}</span>
        </div>
        <div className="flex w-[300px] justify-between">
          <span>Biaya Layanan</span>
          <span>{toCurrency({ amount: serviceFee })}</span>
        </div>
        <div className="flex w-[300px] justify-between">
          <span>Potongan</span>
          <span>- {toCurrency({ amount: voucher?.amount ?? 0 })}</span>
        </div>
        <div className="flex w-[300px] justify-between">
          <span>Total Pembayaran</span>
          <span className="text-xl font-bold">
            {toCurrency({
              amount: total,
            })}
          </span>
        </div>
        <Button
          disabled={disabledOrder}
          className="w-[300px] font-bold"
          onClick={handleCheckout}
        >
          Checkout
        </Button>
      </div>
    </div>
  );
}
