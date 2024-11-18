"use server";

import prisma from "@/lib/db";

export async function changeChecked(id: string, value: boolean) {
  await prisma.cartItem.update({
    data: {
      checked: value,
    },
    where: {
      id,
    },
  });
}
