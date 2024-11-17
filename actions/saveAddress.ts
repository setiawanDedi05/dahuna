"use server";

import prisma from "@/lib/db";
import { Address } from "@prisma/client";

export async function saveAddress(newAddress: Address) {
  await prisma.address.create({
    data: {
      provinsi: newAddress.provinsi,
      provinsiId: newAddress.provinsiId,
      kota: newAddress.kota,
      kotaId: newAddress.kotaId,
      kecamatan: newAddress.kecamatan,
      kecamatanId: newAddress.kecamatanId,
      kelurahan: newAddress.kelurahan,
      kelurahanId: newAddress.kelurahanId,
      name: newAddress.name,
      noTelp: newAddress.noTelp,
      kodePos: newAddress.kodePos,
      detail: newAddress.detail,
      User: {
        connect: {
          id: newAddress.userId,
        },
      },
    },
  });
}
