/*
  Warnings:

  - Added the required column `plan` to the `Company` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Plan" AS ENUM ('BASIC', 'PRO', 'ENTERPRISE');

-- AlterTable
ALTER TABLE "Company" ADD COLUMN     "plan" "Plan" NOT NULL;
