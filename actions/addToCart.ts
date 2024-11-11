"use server";

import { Product } from "@/@types";
import prisma from "@/lib/db";

export async function addToCart(
  product: Product,
  userId: string,
  quantity?: number
) {
  await prisma.cartItem.upsert({
    create: {
      quantity: quantity ?? 1,
      price: product.priceDisplay,
      productId: product.id,
      userId: userId!,
    },
    update: {
      quantity: {
        increment: quantity ?? 1,
      },
      price: product.priceDisplay,
      productId: product.id,
      userId: userId!,
    },
    where: {
      productId_userId_status: {
        productId: product.id,
        status: "mark",
        userId: userId,
      },
    },
  });
}
