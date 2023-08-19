/*
  Warnings:

  - You are about to drop the column `tid` on the `transactions` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "transactions_tid_key";

-- AlterTable
ALTER TABLE "transactions" DROP COLUMN "tid";
