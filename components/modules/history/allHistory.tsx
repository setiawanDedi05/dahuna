import { toCurrency } from "@/components/custom/Currency";
import prisma from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import { notFound } from "next/navigation";
import React from "react";

async function getData(userId: string | null) {
  if (!userId) {
    return notFound();
  }
  const data = await prisma.order.findMany({
    where: {
      userId,
    },
    include: {
      Voucher: true,
      OrderItem: {
        include: {
          Product: {
            include: {
              Images: true,
            },
          },
        },
      },
    },
  });
  if (!data) {
    return notFound();
  }
  return data;
}

export default async function AllHistory() {
  const { userId } = await auth();
  const histories = await getData(userId);
  return (
    <div className="flex flex-col gap-5">
      {histories.map((history: any) => (
        <div
          key={history.id}
          className="flex flex-col w-full shadow-md rounded-md p-5"
        >
          <div className="flex justify-between">
            <span>
              {new Intl.DateTimeFormat("id-ID").format(history.createdAt)}
            </span>
            <span className="uppercase">
              {history.orderStatus === "settlement"
                ? history.resi
                : history.orderStatus}
            </span>
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
            <span>
              - {toCurrency({ amount: history?.Voucher?.amount || 0 })}
            </span>
          </div>
          <div className="border-t-2 w-full flex justify-end mt-2">
            <span className="text-2xl font-bold text-red-900">
              {toCurrency({ amount: history.totalAmount })}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
