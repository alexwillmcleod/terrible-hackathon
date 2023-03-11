/*
  Warnings:

  - You are about to drop the column `authorId` on the `Article` table. All the data in the column will be lost.
  - You are about to drop the `Author` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `authorFirstName` to the `Article` table without a default value. This is not possible if the table is not empty.
  - Added the required column `authorLastName` to the `Article` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Article" DROP CONSTRAINT "Article_authorId_fkey";

-- AlterTable
ALTER TABLE "Article" DROP COLUMN "authorId",
ADD COLUMN     "authorFirstName" TEXT NOT NULL,
ADD COLUMN     "authorLastName" TEXT NOT NULL;

-- DropTable
DROP TABLE "Author";
