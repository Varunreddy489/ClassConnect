/*
  Warnings:

  - Added the required column `password` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `Teacher` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Student" ADD COLUMN     "dept" TEXT,
ADD COLUMN     "password" TEXT NOT NULL,
ADD COLUMN     "year" INTEGER;

-- AlterTable
ALTER TABLE "Teacher" ADD COLUMN     "designation" TEXT,
ADD COLUMN     "password" TEXT NOT NULL;
