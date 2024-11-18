import prisma from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  const { userId } = await auth();
  const data = await prisma.cartItem.findMany({
    where: {
      userId: userId!,
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
