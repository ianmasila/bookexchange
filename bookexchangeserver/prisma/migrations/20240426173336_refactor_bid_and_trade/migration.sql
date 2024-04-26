/*
  Warnings:

  - You are about to drop the column `bookId` on the `trade` table. All the data in the column will be lost.
  - You are about to drop the column `receiverId` on the `trade` table. All the data in the column will be lost.
  - You are about to drop the column `senderId` on the `trade` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[bidId]` on the table `trade` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `ownerId` to the `bid` table without a default value. This is not possible if the table is not empty.
  - Added the required column `bidId` to the `trade` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "trade" DROP CONSTRAINT "trade_bookId_fkey";

-- DropForeignKey
ALTER TABLE "trade" DROP CONSTRAINT "trade_receiverId_fkey";

-- DropForeignKey
ALTER TABLE "trade" DROP CONSTRAINT "trade_senderId_fkey";

-- AlterTable
ALTER TABLE "bid" ADD COLUMN     "ownerId" UUID NOT NULL;

-- AlterTable
ALTER TABLE "trade" DROP COLUMN "bookId",
DROP COLUMN "receiverId",
DROP COLUMN "senderId",
ADD COLUMN     "bidId" UUID NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "trade_bidId_key" ON "trade"("bidId");

-- AddForeignKey
ALTER TABLE "bid" ADD CONSTRAINT "bid_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "trade" ADD CONSTRAINT "trade_bidId_fkey" FOREIGN KEY ("bidId") REFERENCES "bid"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
