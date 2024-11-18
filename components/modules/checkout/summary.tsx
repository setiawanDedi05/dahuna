import { toCurrency } from "@/components/custom/Currency";
import { Button } from "@/components/ui/button";
import { RootState } from "@/redux/store";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import { Paperclip } from "lucide-react";
import React from "react";
import { useSelector } from "react-redux";
import { toast } from "sonner";

export default function SummaryComponent() {
  const { user } = useUser();
  const { addresses, voucher, serviceFee, expedition } = useSelector(
    (state: RootState) => state.order
  );
  const { value, totalAmount } = useSelector((state: RootState) => state.carts);

  const total =
    totalAmount +
    Number(expedition?.price || 0) +
    serviceFee -
    (voucher?.amount ?? 0);

  const handleCheckout = async () => {
    try {
      const response = await axios({
        method: "POST",
        url: "/api/payment",
        data: {
          cart: value.filter(item => item.checked),
          user,
          totalAmount: total,
          addressId: addresses[0]?.id as string,
          expedition: "jne",
          expeditionFee: expedition?.price,
          voucher: voucher,
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
    <div className="w-full md:w-4/5 border-t-4 bg-primary-foreground rounded-md shadow-md px-5 py-3">
      <div className="flex items-center gap-x-3">
        <Paperclip size={32} /> <span className="font-bold">Summary</span>
      </div>
      <div className="flex flex-col justify-between items-end gap-y-5">
        <div className="flex flex-col md:flex-row w-[300px] justify-between">
          <span>Subtotal Product</span>
          <span>{toCurrency({ amount: totalAmount as number })}</span>
        </div>
        <div className="flex flex-col md:flex-row w-[300px] justify-between">
          <span>Subtotal Pengiriman</span>
          <span>{toCurrency({ amount: expedition?.price || 0 })}</span>
        </div>
        <div className="flex flex-col md:flex-row w-[300px] justify-between">
          <span>Biaya Layanan</span>
          <span>{toCurrency({ amount: serviceFee })}</span>
        </div>
        <div className="flex flex-col md:flex-row w-[300px] justify-between">
          <span>Potongan</span>
          <span>- {toCurrency({ amount: voucher?.amount ?? 0 })}</span>
        </div>
        <div className="flex flex-col md:flex-row w-[300px] justify-between">
          <span>Total Pembayaran</span>
          <span className="text-xl font-bold">
            {toCurrency({
              amount: total,
            })}
          </span>
        </div>
        <Button
          disabled={!Boolean(addresses.length) || !Boolean(expedition) || !Boolean(value.length)  }
          className="w-full md:w-[300px] font-bold"
          onClick={handleCheckout}
        >
          Checkout
        </Button>
      </div>
    </div>
  );
}
