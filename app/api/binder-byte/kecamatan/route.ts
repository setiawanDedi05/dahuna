import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  const kotaId = req.nextUrl.searchParams.get("kotaId");
  const response = await axios.get(
    `https://api.binderbyte.com/wilayah/kecamatan?api_key=${process.env.BinderByteKey}&id_kabupaten=${kotaId}`
  );

  console.log({ response });
  return NextResponse.json({
    content: response.data.value,
  });
};
