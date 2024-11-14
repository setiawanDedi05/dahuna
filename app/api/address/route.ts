import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  const userId = req.nextUrl.searchParams.get("userId");
  const data = await prisma.address.findMany({
    where: {
      userId: userId!,
    },
  });
  return NextResponse.json({
    content: data,
  });
};