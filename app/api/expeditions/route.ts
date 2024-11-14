import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  const destination = req.nextUrl.searchParams.get("destination");
  const weight = req.nextUrl.searchParams.get("weight");
  const response = await axios.get(
    `https://api.binderbyte.com/v1/cost?api_key=${process.env.BinderByteKeyCekOngkir}&courier=jne&origin=cianjur&destination=${destination}&weight=${weight}&volume=100x100x100`
  );

  console.log({ response: response.data });
  return NextResponse.json({
    content: response.data.data,
  });
};
