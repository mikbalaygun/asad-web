/*
  Warnings:

  - You are about to drop the column `endDate` on the `Notice` table. All the data in the column will be lost.
  - You are about to drop the column `startDate` on the `Notice` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Article" ADD COLUMN     "pdfUrl" TEXT;

-- AlterTable
ALTER TABLE "ContactInfo" ADD COLUMN     "nextsocial" TEXT;

-- AlterTable
ALTER TABLE "Notice" DROP COLUMN "endDate",
DROP COLUMN "startDate",
ADD COLUMN     "excerpt" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "publishedDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "President" ADD COLUMN     "messageEn" JSONB;

-- AlterTable
ALTER TABLE "Service" ALTER COLUMN "icon" SET DEFAULT '🌊';
