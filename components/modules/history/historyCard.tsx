import { toCurrency } from "@/components/custom/Currency";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";

export default function HistoryCard({ history }: { history: any }) {
  return (
    <div className="flex flex-col w-full shadow-md rounded-md p-5 border-primary/20 border-2">
      <div className="flex justify-between">
        <span>
          {new Intl.DateTimeFormat("id-ID").format(history.createdAt)}
        </span>
        <div className="flex flex-col">
          <span className="uppercase">{history.resi}</span>
          <span className="uppercase">{history.orderStatus}</span>
        </div>
      </div>
      <div className="flex flex-col gap-5">
        {history.OrderItem.map((item: any) => (
          <div className="flex items-center gap-5" key={item.id}>
            <Image
              src={item.Product.Images[0].url}
              alt={item.Product.name}
              width={150}
              height={150}
              className="h-[100px] object-cover"
            />
            <div className="flex flex-col">
              <span>{item.Product.name}</span>
              <span>x{item.quantity}</span>
            </div>
            <div className="flex flex-col ml-auto">
              <span className="text-sm">
                {toCurrency({ amount: item.price })}/1pcs
              </span>
              <span className="text-xl">
                {toCurrency({ amount: item.price * item.quantity })}
              </span>
            </div>
          </div>
        ))}
      </div>
      <div className="w-full flex justify-between mt-2">
        <span>Expedition Fee</span>
        <span>{toCurrency({ amount: history.expeditionFee })}</span>
      </div>
      <div className="w-full flex justify-between mt-2">
        <span>Potongan Voucher</span>
        <span>- {toCurrency({ amount: history?.Voucher?.amount || 0 })}</span>
      </div>
      <div className="border-t-2 w-full flex justify-end mt-2">
        <span className="text-2xl font-bold text-red-900">
          {toCurrency({ amount: history.totalAmount })}
        </span>
      </div>
      <div className="border-t-2 w-full flex justify-end mt-2">
        <Button variant="primary">Selesaikan</Button>
      </div>
    </div>
  );
}
