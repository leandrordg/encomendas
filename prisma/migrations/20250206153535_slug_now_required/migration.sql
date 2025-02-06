/*
  Warnings:

  - Made the column `slug` on table `Restaurant` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Restaurant" ALTER COLUMN "slug" SET NOT NULL;
