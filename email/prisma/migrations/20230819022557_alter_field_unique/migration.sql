/*
  Warnings:

  - A unique constraint covering the columns `[tid]` on the table `transactions` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "tickets_email_key";

-- CreateIndex
CREATE UNIQUE INDEX "transactions_tid_key" ON "transactions"("tid");
