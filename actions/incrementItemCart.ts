"use server";

import prisma from "@/lib/db";

export async function incrementItemCart(id: string) {
  await prisma.cartItem.update({
    data: {
      quantity: {
        increment: 1,
      },
    },
    where: {
      id,
    },
  });
}
