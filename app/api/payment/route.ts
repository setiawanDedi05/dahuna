import { NextResponse } from "next/server";
import Midtrans from "midtrans-client";
import { Cart } from "@/@types";
import prisma from "@/lib/db";
import { User } from "@clerk/nextjs/server";
import { randomUUID } from "crypto";

let snap = new Midtrans.Snap({
  isProduction: false,
  serverKey: process.env.MIDTRANS_SERVER_KEY,
  clientKey: process.env.MIDTRANS_CLIENT_KEY,
});

export const POST = async (req: Request) => {
  const {
    cart,
    user,
    totalAmount,
    addressId,
    expedition,
    expeditionFee,
    voucherId,
  }: {
    cart: Cart[];
    user: User;
    totalAmount: number;
    addressId: string;
    expedition: string;
    expeditionFee: number;
    voucherId: string;
  } = await req.json();

  console.log({
    cart,
    user,
    totalAmount,
    addressId,
    expedition,
    expeditionFee,
    voucherId,
  });

  const newCart = cart.map((item) => {
    return {
      id: item.id,
      price: item.price,
      quantity: item.quantity,
      name: item.Product.name,
    };
  });

  newCart.push({
    id: randomUUID(),
    price: expeditionFee,
    quantity: 1,
    name: expedition,
  });

  newCart.push({
    id: randomUUID(),
    price: 1000,
    quantity: 1,
    name: "serviceFee",
  });

  newCart.push({
    id: randomUUID(),
    price: -100000,
    quantity: 1,
    name: "discount",
  });

  try {
    const order = await prisma.order.create({
      data: {
        userId: user.id,
        orderStatus: "unpaid",
        totalAmount,
        addressId,
        expedition,
        expeditionFee,
        voucherId,
      },
    });

    let data = JSON.stringify({
      transaction_details: {
        order_id: order.id,
        gross_amount: totalAmount,
      },
      credit_card: {
        secure: true,
      },
      item_details: newCart,
      customer_details: {
        first_name: user.firstName,
        last_name: user.lastName,
        email: user.primaryEmailAddress?.emailAddress,
        phone: user.primaryPhoneNumber,
        billing_address: {
          first_name: user.firstName,
          last_name: user.lastName,
          email: user.primaryEmailAddress?.emailAddress,
          phone: user.primaryPhoneNumber,
          address: "",
          city: "",
          postal_code: "",
          country_code: "IDN",
        },
        shipping_address: {
          first_name: user.firstName,
          last_name: user.lastName,
          email: user.primaryEmailAddress?.emailAddress,
          phone: user.primaryPhoneNumber,
          address: "",
          city: "",
          postal_code: "",
          country_code: "",
        },
      },
    });
    const token = await snap.createTransactionToken(data);
    const orderItem = cart.map((item) => {
      return {
        orderid: order.id,
        productid: item.productId,
        quantity: item.quantity,
        price: item.price,
      };
    });

    await Promise.all([
      prisma.orderItem.createMany({
        data: orderItem,
      }),
      prisma.cartItem.deleteMany({
        where: {
          userId: user.id,
        },
      }),
    ]);
    console.log({ token });
    return NextResponse.json({ token });
  } catch (error) {
    console.log({ error });
    return NextResponse.json({
      error,
    });
  }
};
