import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  const kecamatanId = req.nextUrl.searchParams.get("kecamatanId");
  try {
    const response = await axios.get(
      `https://api.binderbyte.com/wilayah/kelurahan?api_key=${process.env.BinderByteKey}&id_kecamatan=${kecamatanId}`
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
