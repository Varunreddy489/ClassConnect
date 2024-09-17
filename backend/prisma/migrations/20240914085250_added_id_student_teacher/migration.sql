/*
  Warnings:

  - Added the required column `studentId` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `facultyId` to the `Teacher` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Student" ADD COLUMN     "studentId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Teacher" ADD COLUMN     "facultyId" TEXT NOT NULL;
