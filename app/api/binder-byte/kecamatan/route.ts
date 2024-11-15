import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  const kotaId = req.nextUrl.searchParams.get("kotaId");

  try {
    const response = await axios.get(
      `https://api.binderbyte.com/wilayah/kecamatan?api_key=${process.env.BinderByteKey}&id_kabupaten=${kotaId}`
    );

    return NextResponse.json({
      content: response.data.value,
    });
  } catch (error) {
    return NextResponse.json({
      error,
    });
  }
};
