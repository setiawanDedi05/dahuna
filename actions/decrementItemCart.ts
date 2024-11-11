"use server";

import prisma from "@/lib/db";

export async function decrementItemCart(id: string) {
  await prisma.cartItem.update({
    data: {
      quantity: {
        decrement: 1,
      },
    },
    where: {
      id,
    },
  });
}
