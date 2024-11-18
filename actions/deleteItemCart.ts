"use server";

import prisma from "@/lib/db";

export async function deleteItemCart(id: string) {
  return await prisma.cartItem.delete({
    where: {
      id,
    },
  });
}
