"use server";

import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function checkVoucher(code: string) {
  const response = await prisma.voucher.findUnique({
    where: {
      code,
    },
  });

  revalidatePath("/checkout");
  return response;
}
