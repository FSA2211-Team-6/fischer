/*
  Warnings:

  - A unique constraint covering the columns `[expertId,postId]` on the table `ExpertCompliance` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "ExpertCompliance_fischerId_postId_key";

-- CreateIndex
CREATE UNIQUE INDEX "ExpertCompliance_expertId_postId_key" ON "ExpertCompliance"("expertId", "postId");
