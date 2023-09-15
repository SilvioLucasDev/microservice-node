/*
  Warnings:

  - You are about to drop the column `complements` on the `addresses` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "addresses" DROP COLUMN "complements",
ADD COLUMN     "complement" VARCHAR(80);
