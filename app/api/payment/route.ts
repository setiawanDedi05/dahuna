import { NextResponse } from "next/server";
import { randomUUID } from "crypto";
import Midtrans from "midtrans-client";

let snap = new Midtrans.Snap({
  isProduction: false,
  serverKey: process.env.MIDTRANS_SERVER_KEY,
  clientKey: process.env.MIDTRANS_CLIENT_KEY,
});

export const POST = async (req: Request) => {
  let data = JSON.stringify({
    transaction_details: {
      order_id: `${randomUUID()}-${Date.now()}`,
      gross_amount: 10000,
    },
    credit_card: {
      secure: true,
    },
    item_details: [
      {
        id: "ITEM1",
        price: 10000,
        quantity: 1,
        name: "Midtrans Bear",
      },
    ],
    customer_details: {
      first_name: "TEST",
      last_name: "MIDTRANSER",
      email: "noreply@example.com",
      phone: "+628123456",
      billing_address: {
        first_name: "TEST",
        last_name: "MIDTRANSER",
        email: "noreply@example.com",
        phone: "081 2233 44-55",
        address: "Sudirman",
        city: "Jakarta",
        postal_code: "12190",
        country_code: "IDN",
      },
      shipping_address: {
        first_name: "TEST",
        last_name: "MIDTRANSER",
        email: "noreply@example.com",
        phone: "0812345678910",
        address: "Sudirman",
        city: "Jakarta",
        postal_code: "12190",
        country_code: "IDN",
      },
    },
  });
  try {
    const token = await snap.createTransactionToken(data);
    return NextResponse.json({ token });
    // return NextResponse.json({ response });
  } catch (error) {
    console.log({ error });
    return NextResponse.json({
      error: JSON.stringify(error),
    });
  }
};
