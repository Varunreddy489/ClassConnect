/*
  Warnings:

  - You are about to drop the column `collegeId` on the `Admin` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `College` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Admin" DROP CONSTRAINT "Admin_collegeId_fkey";

-- AlterTable
ALTER TABLE "Admin" DROP COLUMN "collegeId",
ADD COLUMN     "collegeName" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "College_name_key" ON "College"("name");

-- AddForeignKey
ALTER TABLE "Admin" ADD CONSTRAINT "Admin_collegeName_fkey" FOREIGN KEY ("collegeName") REFERENCES "College"("name") ON DELETE SET NULL ON UPDATE CASCADE;
