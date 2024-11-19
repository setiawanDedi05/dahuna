"use server";

import prisma from "@/lib/db";
import { auth } from "@clerk/nextjs/server";

export async function incrementItemCart(id: string) {
  const { userId } = await auth();
  return await prisma.cartItem.update({
    data: {
      quantity: {
        increment: 1,
      },
    },
    where: {
      productId_userId: {
        productId: id,
        userId: userId as string,
      },
    },
  });
}
