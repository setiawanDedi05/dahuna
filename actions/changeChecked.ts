"use server";

import prisma from "@/lib/db";
import { auth } from "@clerk/nextjs/server";

export async function changeChecked(id: string, value: boolean) {
  const { userId } = await auth();
  await prisma.cartItem.update({
    data: {
      checked: value,
    },
    where: {
      productId_userId: {
        productId: id,
        userId: userId as string,
      },
    },
  });
}
