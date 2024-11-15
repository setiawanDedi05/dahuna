import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export const POST = async (req: Request) => {
  const { code } = await req.json();

  try {
    const response = prisma.voucher.findUnique({
      where: {
        code,
      },
    });

    console.log({ response });
    return NextResponse.json({ response });
  } catch (error) {
    console.log({ error });
    return NextResponse.json({
      error: JSON.stringify(error),
    });
  }
};
