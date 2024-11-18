"use server";

import { Product } from "@/@types";
import prisma from "@/lib/db";

export async function addToCart(
  product: Product,
  userId: string,
  quantity?: number
) {
  return await prisma.cartItem.update({
    // create: {
    //   quantity: quantity!,
    //   price: product.priceDisplay,
    //   productId: product.id,
    //   userId: userId!,
    // },
    data: {
      quantity: {
        increment: quantity!,
      },
      price: product.priceDisplay,
      productId: product.id,
      userId: userId!,
    },
    where: {
      productId_userId: {
        productId: "Qwerqwer",
        userId: userId,
      },
    },
  });
}
