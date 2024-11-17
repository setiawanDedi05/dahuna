-- AlterTable
ALTER TABLE "CartItem" ADD COLUMN     "checked" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "resi" TEXT;
