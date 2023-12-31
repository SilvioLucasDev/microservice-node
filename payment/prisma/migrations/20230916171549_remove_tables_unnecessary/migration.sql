-- CreateTable
CREATE TABLE "cards" (
    "id" TEXT NOT NULL,
    "user_id" VARCHAR(255) NOT NULL,
    "alias" VARCHAR(80) NOT NULL,
    "number" VARCHAR(80) NOT NULL,
    "brand" VARCHAR(80) NOT NULL,
    "token" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "cards_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "transactions" (
    "id" TEXT NOT NULL,
    "ticket_id" TEXT NOT NULL,
    "payment_type" VARCHAR(60) NOT NULL,
    "card_id" VARCHAR(255),
    "total" DOUBLE PRECISION NOT NULL,
    "installments" INTEGER,
    "due_date" TIMESTAMP(3) NOT NULL,
    "processor_response" TEXT NOT NULL,
    "transaction_id" VARCHAR(255) NOT NULL,
    "status" VARCHAR(60) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "transactions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "transactions_ticket_id_key" ON "transactions"("ticket_id");

-- CreateIndex
CREATE UNIQUE INDEX "transactions_transaction_id_key" ON "transactions"("transaction_id");

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_card_id_fkey" FOREIGN KEY ("card_id") REFERENCES "cards"("id") ON DELETE SET NULL ON UPDATE CASCADE;
