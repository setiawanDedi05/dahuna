import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  const userId = req.nextUrl.searchParams.get("userId");
  const data = await prisma.cartItem.findMany({
    where: {
      userId: userId!
    },
    include: {
      Product: {
        include: {
          Images: true,
        },
      },
    },
  });
  return NextResponse.json({
    content: data,
  });
};
