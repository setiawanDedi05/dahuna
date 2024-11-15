/*
  Warnings:

  - Added the required column `addressId` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `expedition` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `expeditionFee` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `weight` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "addressId" TEXT NOT NULL,
ADD COLUMN     "expedition" TEXT NOT NULL,
ADD COLUMN     "expeditionFee" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "isDropship" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "nameDropship" TEXT,
ADD COLUMN     "noTelpDropShip" TEXT,
ADD COLUMN     "note" TEXT,
ADD COLUMN     "voucherId" TEXT;

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "weight" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Address" (
    "id" TEXT NOT NULL,
    "provinsiId" TEXT NOT NULL,
    "kotaId" TEXT NOT NULL,
    "kecamatanId" TEXT NOT NULL,
    "kelurahanId" TEXT NOT NULL,
    "kodePos" TEXT NOT NULL,
    "provinsi" TEXT NOT NULL,
    "kota" TEXT NOT NULL,
    "kecamatan" TEXT NOT NULL,
    "kelurahan" TEXT NOT NULL,
    "detail" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "noTelp" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Address_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Voucher" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "dueDate" TIMESTAMP(3) NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Voucher_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Voucher_code_key" ON "Voucher"("code");

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "Address"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_voucherId_fkey" FOREIGN KEY ("voucherId") REFERENCES "Voucher"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
