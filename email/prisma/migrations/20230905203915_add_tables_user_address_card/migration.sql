/*
  Warnings:

  - You are about to alter the column `description` on the `events` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(80)`.
  - You are about to alter the column `name` on the `events` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(80)`.
  - You are about to drop the column `email` on the `tickets` table. All the data in the column will be lost.
  - You are about to drop the column `event_id` on the `transactions` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `transactions` table. All the data in the column will be lost.
  - You are about to drop the column `tid` on the `transactions` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[transaction_id]` on the table `transactions` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `user_id` to the `tickets` table without a default value. This is not possible if the table is not empty.
  - Added the required column `paymentType` to the `transactions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `processorResponse` to the `transactions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `total` to the `transactions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `transaction_id` to the `transactions` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "transactions" DROP CONSTRAINT "transactions_event_id_fkey";

-- DropIndex
DROP INDEX "transactions_tid_key";

-- AlterTable
ALTER TABLE "events" ALTER COLUMN "description" SET DATA TYPE VARCHAR(80),
ALTER COLUMN "name" SET DATA TYPE VARCHAR(80);

-- AlterTable
ALTER TABLE "tickets" DROP COLUMN "email",
ADD COLUMN     "user_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "transactions" DROP COLUMN "event_id",
DROP COLUMN "price",
DROP COLUMN "tid",
ADD COLUMN     "card_id" TEXT,
ADD COLUMN     "installments" INTEGER,
ADD COLUMN     "paymentType" TEXT NOT NULL,
ADD COLUMN     "processorResponse" TEXT NOT NULL,
ADD COLUMN     "total" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "transaction_id" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "document" VARCHAR(80) NOT NULL,
    "email" VARCHAR(80) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "mobile_phone" VARCHAR(80) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "addresses" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "zipcode" VARCHAR(80) NOT NULL,
    "address" VARCHAR(80) NOT NULL,
    "number" VARCHAR(80) NOT NULL,
    "complements" VARCHAR(80),
    "neighborhood" VARCHAR(80) NOT NULL,
    "city" VARCHAR(80) NOT NULL,
    "state" VARCHAR(80) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "addresses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cards" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "alias" VARCHAR(80) NOT NULL,
    "number" VARCHAR(80) NOT NULL,
    "brand" VARCHAR(80) NOT NULL,
    "token" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "cards_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_name_key" ON "users"("name");

-- CreateIndex
CREATE UNIQUE INDEX "transactions_transaction_id_key" ON "transactions"("transaction_id");

-- AddForeignKey
ALTER TABLE "addresses" ADD CONSTRAINT "addresses_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cards" ADD CONSTRAINT "cards_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tickets" ADD CONSTRAINT "tickets_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_card_id_fkey" FOREIGN KEY ("card_id") REFERENCES "cards"("id") ON DELETE SET NULL ON UPDATE CASCADE;
