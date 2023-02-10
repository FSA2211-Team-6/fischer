-- AlterTable
ALTER TABLE "Expert" ADD COLUMN     "approval" BOOLEAN;

-- CreateTable
CREATE TABLE "UserCommentVote" (
    "commentId" INTEGER NOT NULL,
    "compliance" INTEGER NOT NULL DEFAULT 0,
    "fischerId" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "UserCommentVote_fischerId_commentId_key" ON "UserCommentVote"("fischerId", "commentId");

-- AddForeignKey
ALTER TABLE "UserCommentVote" ADD CONSTRAINT "UserCommentVote_fischerId_fkey" FOREIGN KEY ("fischerId") REFERENCES "User"("fischerId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserCommentVote" ADD CONSTRAINT "UserCommentVote_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "Comment"("id") ON DELETE CASCADE ON UPDATE CASCADE;
