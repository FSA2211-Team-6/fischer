/*
  Warnings:

  - A unique constraint covering the columns `[postId,expertId]` on the table `ExpertResponse` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "ExpertResponse_postId_expertId_key" ON "ExpertResponse"("postId", "expertId");
