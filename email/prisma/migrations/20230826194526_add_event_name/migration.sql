/*
  Warnings:

  - Added the required column `name` to the `events` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "events" ADD COLUMN     "name" TEXT NOT NULL;
