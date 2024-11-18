"use server";

import { Product } from "@/@types";
import prisma from "@/lib/db";
import { auth } from "@clerk/nextjs/server";

export async function addToCart(product: Product, quantity?: number) {
  const { userId } = await auth();
  return await prisma.cartItem.upsert({
    create: {
      quantity: quantity!,
      price: product.priceDisplay,
      productId: product.id,
      userId: userId as string,
    },
    update: {
      quantity: {
        increment: quantity!,
      },
      price: product.priceDisplay,
      productId: product.id,
      userId: userId as string,
    },
    where: {
      productId_userId: {
        productId: product.id,
        userId: userId as string,
      },
    },
  });
}
