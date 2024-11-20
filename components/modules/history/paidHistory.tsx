import prisma from '@/lib/db';
import { notFound } from 'next/navigation';
import React from 'react'

async function getData(userId: string | null) {
    if (!userId) {
      return notFound();
    }
    const data = await prisma.order.findMany({
      where: {
        userId,
        orderStatus: "unpaid"
      },
      include: {
        Voucher: true,
        OrderItem: {
          include: {
            Product: {
              include: {
                Images: true,
              },
            },
          },
        },
      },
    });
    if (!data) {
      return notFound();
    }
    return data;
  }
export default function PaidHistory() {
  return (
    <div>paidHistory</div>
  )
}
