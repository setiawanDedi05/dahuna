import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  const response = await axios.get(
    `https://api.binderbyte.com/wilayah/provinsi?api_key=${process.env.BinderByteKey}`
  );

  return NextResponse.json({
    content: response.data.value,
  });
};
