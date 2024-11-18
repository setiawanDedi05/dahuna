"use server";

import prisma from "@/lib/db";
import { revalidateTag } from "next/cache";

export async function changeChecked(id: string, value: boolean, userId: string) {
  await prisma.cartItem.update({
    data: {
      checked: value,
    },
    where: {
      id,
    },
  });

  revalidateTag(`cart-${userId}`);
}
