import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  const provinsiId = req.nextUrl.searchParams.get("provinsiId");
  const response = await axios.get(
    `https://api.binderbyte.com/wilayah/kabupaten?api_key=${process.env.BinderByteKey}&id_provinsi=${provinsiId}`
  );

  return NextResponse.json({
    content: response.data.value,
  });
};
