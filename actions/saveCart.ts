"use server";

import { Cart } from "@/@types";
import prisma from "@/lib/db";
import { useAuth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export async function saveCart(carts: Cart[]) {
  const { userId } = useAuth();

  if (!userId) return;
  
  carts.forEach(async (cart) => {
    await prisma.cartItem.update({
      where: {
        productId_userId: {
          productId: cart.productId,
          userId: userId as string,
        },
      },
      data: {
        quantity: cart.quantity,
        checked: cart.checked
      },
    });
  });

  redirect("/checkout");
}
