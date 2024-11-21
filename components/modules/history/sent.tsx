import prisma from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { notFound } from "next/navigation";
import React from "react";
import HistoryList from "./historyList";

async function getData(userId: string | null) {
  if (!userId) {
    return notFound();
  }
  const data = await prisma.order.findMany({
    where: {
      userId,
      orderStatus: "settlement",
      resi: {
        not: null,
      },
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
export default async function SentOrder() {
  const { userId } = await auth();
  const histories = await getData(userId);
  return (
    <div className="flex flex-col gap-5">
      <HistoryList histories={histories} />
    </div>
  );
}
