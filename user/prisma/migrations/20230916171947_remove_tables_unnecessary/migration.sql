-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(80) NOT NULL,
    "document" VARCHAR(14) NOT NULL,
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
    "user_id" VARCHAR(255) NOT NULL,
    "zipcode" VARCHAR(80) NOT NULL,
    "address" VARCHAR(80) NOT NULL,
    "number" VARCHAR(80) NOT NULL,
    "complement" VARCHAR(80),
    "neighborhood" VARCHAR(80) NOT NULL,
    "city" VARCHAR(80) NOT NULL,
    "state" VARCHAR(80) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "addresses_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_document_key" ON "users"("document");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_mobile_phone_key" ON "users"("mobile_phone");

-- AddForeignKey
ALTER TABLE "addresses" ADD CONSTRAINT "addresses_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
