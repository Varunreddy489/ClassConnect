/*
  Warnings:

  - You are about to drop the column `dept` on the `Student` table. All the data in the column will be lost.
  - Added the required column `department` to the `Teacher` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Student" DROP COLUMN "dept",
ADD COLUMN     "course" TEXT,
ADD COLUMN     "department" TEXT,
ADD COLUMN     "profilePic" TEXT,
ADD COLUMN     "semester" INTEGER;

-- AlterTable
ALTER TABLE "Teacher" ADD COLUMN     "department" TEXT NOT NULL,
ADD COLUMN     "profilePic" TEXT,
ADD COLUMN     "qualification" TEXT,
ADD COLUMN     "specialization" TEXT;
