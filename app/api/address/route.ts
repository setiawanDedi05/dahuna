import prisma from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  const { userId } = await auth();
  const data = await prisma.address.findMany({
    where: {
      userId: userId!,
    },
  });
  return NextResponse.json({
    content: data,
  });
};
