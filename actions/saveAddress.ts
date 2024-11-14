"use server";

import prisma from "@/lib/db";
import { z } from "zod";

const schema = z.object({
  name: z.string({
    invalid_type_error: "Invalid Email",
  }),
});

export async function saveAddress(formData: FormData) {
  const name = formData.get("name") as string;
  const noTelp = formData.get("noTelp") as string;
  const kodePos = formData.get("kodePos") as string;
  const detail = formData.get("detail") as string;
  const userId = formData.get("userId") as string;
  const { id: provinsiId, name: provinsiName } = JSON.parse(
    formData.get("provinsi") as string
  );
  const { id: kotaId, name: KotaName } = JSON.parse(
    formData.get("kota") as string
  );
  const { id: kecamatanId, name: kecamatanName } = JSON.parse(
    formData.get("kecamatan") as string
  );
  const { id: kelurahanId, name: kelurahanName } = JSON.parse(
    formData.get("kelurahan") as string
  );

  console.log({ userId });

  await prisma.address.create({
    data: {
      provinsi: provinsiName,
      provinsiId: provinsiId,
      kota: KotaName,
      kotaId: kotaId,
      kecamatan: kecamatanName,
      kecamatanId: kecamatanId,
      kelurahan: kelurahanName,
      kelurahanId: kelurahanId,
      name,
      noTelp,
      kodePos,
      detail,
      User: {
        connect: {
          id: userId,
        },
      },
    },
  });
}
