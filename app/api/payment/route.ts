import { NextResponse } from "next/server";
import axios from "axios";
import { randomUUID } from "crypto";

export const POST = async (req: Request) => {
  let data = JSON.stringify({
    transaction_details: {
      order_id: `${randomUUID()}-${Date.now()}`,
      gross_amount: 10000,
    },
    credit_card: {
      secure: true,
    },
  });
  try {
    const token = Buffer.from(`${process.env.MIDTRANS_SERVER_KEY}:`).toString(
      "base64"
    );
    const response = await axios({
      method: "post",
      url: "https://app.sandbox.midtrans.com/snap/v1/transactions",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Basic ${token}`,
      },
      data,
    });
    return NextResponse.redirect(new URL(response.data.redirect_url));
  } catch (error) {
    console.log({ error });
    return NextResponse.json({
      error,
    });
  }
};
