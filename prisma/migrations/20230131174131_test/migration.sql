/*
  Warnings:

  - You are about to drop the `userCompliance` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "userCompliance" DROP CONSTRAINT "userCompliance_fischerId_fkey";

-- DropForeignKey
ALTER TABLE "userCompliance" DROP CONSTRAINT "userCompliance_postId_fkey";

-- DropTable
DROP TABLE "userCompliance";

-- CreateTable
CREATE TABLE "UserCompliance" (
    "postId" INTEGER NOT NULL,
    "compliance" INTEGER NOT NULL,
    "fischerId" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "UserCompliance_fischerId_postId_key" ON "UserCompliance"("fischerId", "postId");

-- AddForeignKey
ALTER TABLE "UserCompliance" ADD CONSTRAINT "UserCompliance_fischerId_fkey" FOREIGN KEY ("fischerId") REFERENCES "User"("fischerId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserCompliance" ADD CONSTRAINT "UserCompliance_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;
