/*
  Warnings:

  - Made the column `ownerId` on table `book` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "book" DROP CONSTRAINT "book_ownerId_fkey";

-- AlterTable
ALTER TABLE "book" ALTER COLUMN "ownerId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "book" ADD CONSTRAINT "book_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
