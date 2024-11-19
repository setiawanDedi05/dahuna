"use server";

import prisma from "@/lib/db";
import { auth } from "@clerk/nextjs/server";

export async function deleteItemCart(id: string) {
  const { userId } = await auth();
  return await prisma.cartItem.delete({
    where: {
      productId_userId: {
        productId: id,
        userId: userId as string,
      },
    },
  });
}
