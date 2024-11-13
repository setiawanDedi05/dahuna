"use server";

import { Product } from "@/@types";
import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function addToCart(
  product: Product,
  userId: string,
  quantity?: number
) {
  await prisma.cartItem.upsert({
    create: {
      quantity: quantity!,
      price: product.priceDisplay,
      productId: product.id,
      userId: userId!,
    },
    update: {
      quantity: {
        increment: quantity!,
      },
      price: product.priceDisplay,
      productId: product.id,
      userId: userId!,
    },
    where: {
      productId_userId: {
        productId: product.id,
        userId: userId,
      },
    },
  });

  revalidatePath("/products");
}
