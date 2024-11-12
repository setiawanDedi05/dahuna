import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  const orderId = req.nextUrl.searchParams.get("order_id");
  const transactionStatus = req.nextUrl.searchParams.get("transaction_status");

  const order = await prisma.order.update({
    where: {
      id: orderId!,
    },
    data: {
      orderStatus: transactionStatus!,
    },
  });

  return NextResponse.redirect("/");
};
