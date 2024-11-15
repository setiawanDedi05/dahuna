"use server";

import { Cart } from "@/@types";
import prisma from "@/lib/db";
import { redirect } from "next/navigation";

export async function saveCart(carts: Cart[], userId: string) {
  carts.forEach(async (cart) => {
    await prisma.cartItem.update({
      where: {
        productId_userId: {
          productId: cart.productId,
          userId: userId,
        },
      },
      data: {
        quantity: cart.quantity,
      },
    });
  });
  
  redirect("/checkout");
}
