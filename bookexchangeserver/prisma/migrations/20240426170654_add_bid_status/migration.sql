-- CreateEnum
CREATE TYPE "bid_status" AS ENUM ('PENDING', 'ACCEPTED', 'DECLINED');

-- AlterTable
ALTER TABLE "bid" ADD COLUMN     "status" "bid_status" NOT NULL DEFAULT 'PENDING';

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP;
