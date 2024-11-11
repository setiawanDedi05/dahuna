import { NextResponse } from "next/server";
import { randomUUID } from "crypto";
import Midtrans from "midtrans-client";
import { Cart } from "@/@types";

let snap = new Midtrans.Snap({
  isProduction: false,
  serverKey: process.env.MIDTRANS_SERVER_KEY,
  clientKey: process.env.MIDTRANS_CLIENT_KEY,
});

export const POST = async (req: Request) => {
  const {
    cart,
    user,
  }: {
    cart: Cart[];
    user: {
      fullName: string;
      firstName: string;
      lastName: string;
      primaryEmailAddress: {
        emailAddress: string;
      };
      primaryPhoneNumber: string;
    };
  } = await req.json();
  const totalAmount = cart.reduce(
    (accumulator, currenValue) =>
      accumulator + currenValue.price * currenValue.quantity,
    0
  );

  const newCart = cart.map((item) => {
    return {
      id: item.id,
      price: item.price,
      quantity: item.quantity,
      name: item.Product.name,
    };
  });
  let data = JSON.stringify({
    transaction_details: {
      order_id: `${randomUUID()}-${Date.now()}`,
      gross_amount: totalAmount,
    },
    credit_card: {
      secure: true,
    },
    item_details: newCart,
    customer_details: {
      first_name: user.firstName,
      last_name: user.lastName,
      email: user.primaryEmailAddress.emailAddress,
      phone: user.primaryPhoneNumber,
      billing_address: {
        first_name: user.firstName,
        last_name: user.lastName,
        email: user.primaryEmailAddress.emailAddress,
        phone: user.primaryPhoneNumber,
        address: "",
        city: "",
        postal_code: "",
        country_code: "IDN",
      },
      shipping_address: {
        first_name: user.firstName,
        last_name: user.lastName,
        email: user.primaryEmailAddress.emailAddress,
        phone: user.primaryPhoneNumber,
        address: "",
        city: "",
        postal_code: "",
        country_code: "",
      },
    },
  });
  try {
    const token = await snap.createTransactionToken(data);
    return NextResponse.json({ token });
  } catch (error) {
    return NextResponse.json({
      error: JSON.stringify(error),
    });
  }
};
