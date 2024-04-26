-- AlterTable
ALTER TABLE "bid" ALTER COLUMN "amount" SET DEFAULT 0;

-- AlterTable
ALTER TABLE "book" ADD COLUMN     "photoUrl" TEXT,
ADD COLUMN  "deletedAt" TIMESTAMP(6);

