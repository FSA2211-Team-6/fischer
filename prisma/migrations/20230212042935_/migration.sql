/*
  Warnings:

  - A unique constraint covering the columns `[expertId]` on the table `ExpertResponse` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "ExpertResponse_postId_expertId_key";

-- CreateIndex
CREATE UNIQUE INDEX "ExpertResponse_expertId_key" ON "ExpertResponse"("expertId");
