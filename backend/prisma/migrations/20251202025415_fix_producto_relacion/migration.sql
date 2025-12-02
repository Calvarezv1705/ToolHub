/*
  Warnings:

  - You are about to drop the column `imagenUrl` on the `Producto` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Producto" DROP COLUMN "imagenUrl",
ADD COLUMN     "imagen" TEXT;
