/*
  Warnings:

  - You are about to drop the column `creadoEn` on the `Producto` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[codigo]` on the table `Producto` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `subtotal` to the `DetalleVenta` table without a default value. This is not possible if the table is not empty.
  - Added the required column `codigo` to the `Producto` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imagenUrl` to the `Producto` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ubicacion` to the `Producto` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "DetalleVenta" ADD COLUMN     "subtotal" DOUBLE PRECISION NOT NULL;

-- AlterTable
ALTER TABLE "Producto" DROP COLUMN "creadoEn",
ADD COLUMN     "codigo" TEXT NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "imagenUrl" TEXT NOT NULL,
ADD COLUMN     "ubicacion" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Producto_codigo_key" ON "Producto"("codigo");
