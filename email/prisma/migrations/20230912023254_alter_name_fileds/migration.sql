/*
  Warnings:

  - You are about to drop the column `paymentType` on the `transactions` table. All the data in the column will be lost.
  - You are about to drop the column `processorResponse` on the `transactions` table. All the data in the column will be lost.
  - Added the required column `due_date` to the `transactions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `payment_type` to the `transactions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `processor_response` to the `transactions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "transactions" DROP COLUMN "paymentType",
DROP COLUMN "processorResponse",
ADD COLUMN     "due_date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "payment_type" TEXT NOT NULL,
ADD COLUMN     "processor_response" TEXT NOT NULL;
