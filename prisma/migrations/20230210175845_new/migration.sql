-- CreateTable
CREATE TABLE "UserExpertResponseVote" (
    "expertResponseId" INTEGER NOT NULL,
    "compliance" INTEGER NOT NULL DEFAULT 0,
    "fischerId" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "UserExpertResponseVote_fischerId_expertResponseId_key" ON "UserExpertResponseVote"("fischerId", "expertResponseId");

-- AddForeignKey
ALTER TABLE "UserExpertResponseVote" ADD CONSTRAINT "UserExpertResponseVote_fischerId_fkey" FOREIGN KEY ("fischerId") REFERENCES "User"("fischerId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserExpertResponseVote" ADD CONSTRAINT "UserExpertResponseVote_expertResponseId_fkey" FOREIGN KEY ("expertResponseId") REFERENCES "ExpertResponse"("id") ON DELETE CASCADE ON UPDATE CASCADE;
