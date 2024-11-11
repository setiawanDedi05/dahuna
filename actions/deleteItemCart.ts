"use server";

import prisma from "@/lib/db";

export async function deleteItemCart(id: string) {
  await prisma.cartItem.delete({
    where: {
      id,
    },
  });
}
