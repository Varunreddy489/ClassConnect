-- AlterTable
ALTER TABLE "Admin" ADD COLUMN     "resetPasswordExpiresAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "resetPasswordToken" TEXT;

-- AlterTable
ALTER TABLE "Student" ADD COLUMN     "resetPasswordExpiresAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "resetPasswordToken" TEXT;

-- AlterTable
ALTER TABLE "Teacher" ADD COLUMN     "resetPasswordExpiresAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "resetPasswordToken" TEXT;
