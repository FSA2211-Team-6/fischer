-- CreateTable
CREATE TABLE "ExpertResponse" (
    "id" SERIAL NOT NULL,
    "postId" INTEGER NOT NULL,
    "expertId" INTEGER NOT NULL,
    "content" TEXT NOT NULL,
    "compliance" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "upvotes" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "ExpertResponse_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserExpertResponseVote" (
    "expertResponseId" INTEGER NOT NULL,
    "compliance" INTEGER NOT NULL DEFAULT 0,
    "fischerId" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "Comment" (
    "id" SERIAL NOT NULL,
    "postId" INTEGER NOT NULL,
    "fischerId" INTEGER NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "upvotes" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Comment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserCommentVote" (
    "commentId" INTEGER NOT NULL,
    "compliance" INTEGER NOT NULL DEFAULT 0,
    "fischerId" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "UserCompliance" (
    "postId" INTEGER NOT NULL,
    "compliance" INTEGER NOT NULL,
    "fischerId" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "emailVerified" TIMESTAMP(3),
    "image" TEXT NOT NULL DEFAULT '/images/user.jpeg',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fischerId" SERIAL NOT NULL,
    "currentTokens" INTEGER NOT NULL DEFAULT 1,
    "maxTokens" INTEGER NOT NULL DEFAULT 1,
    "isAdmin" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "User_pkey" PRIMARY KEY ("fischerId")
);

-- CreateTable
CREATE TABLE "BadPost" (
    "id" SERIAL NOT NULL,
    "assertion" TEXT NOT NULL,
    "response" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "websiteArticleId" INTEGER NOT NULL,

    CONSTRAINT "BadPost_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Post" (
    "websiteArticleId" INTEGER,
    "topicId" INTEGER NOT NULL,
    "fischerId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "assertion" TEXT NOT NULL,
    "id" SERIAL NOT NULL,
    "aiResponse" TEXT NOT NULL,
    "aiCompliance" INTEGER NOT NULL DEFAULT 0,
    "publicCompliance" INTEGER NOT NULL DEFAULT 0,
    "topicName" TEXT NOT NULL,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WebsiteArticle" (
    "id" SERIAL NOT NULL,
    "websiteId" INTEGER NOT NULL,
    "articleURL" TEXT NOT NULL,

    CONSTRAINT "WebsiteArticle_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Website" (
    "id" SERIAL NOT NULL,
    "hostSite" TEXT NOT NULL,

    CONSTRAINT "Website_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Expert" (
    "topicId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "id" SERIAL NOT NULL,
    "fischerId" INTEGER NOT NULL,
    "approval" BOOLEAN,

    CONSTRAINT "Expert_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Topic" (
    "name" TEXT NOT NULL,
    "id" SERIAL NOT NULL,

    CONSTRAINT "Topic_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Account" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "sessionToken" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VerificationToken" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "ExpertResponse_expertId_key" ON "ExpertResponse"("expertId");

-- CreateIndex
CREATE UNIQUE INDEX "UserExpertResponseVote_fischerId_expertResponseId_key" ON "UserExpertResponseVote"("fischerId", "expertResponseId");

-- CreateIndex
CREATE UNIQUE INDEX "UserCommentVote_fischerId_commentId_key" ON "UserCommentVote"("fischerId", "commentId");

-- CreateIndex
CREATE UNIQUE INDEX "UserCompliance_fischerId_postId_key" ON "UserCompliance"("fischerId", "postId");

-- CreateIndex
CREATE UNIQUE INDEX "User_id_key" ON "User"("id");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "WebsiteArticle_articleURL_key" ON "WebsiteArticle"("articleURL");

-- CreateIndex
CREATE UNIQUE INDEX "Website_hostSite_key" ON "Website"("hostSite");

-- CreateIndex
CREATE UNIQUE INDEX "Topic_name_key" ON "Topic"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Account_provider_providerAccountId_key" ON "Account"("provider", "providerAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "Session_sessionToken_key" ON "Session"("sessionToken");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_token_key" ON "VerificationToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_identifier_token_key" ON "VerificationToken"("identifier", "token");

-- AddForeignKey
ALTER TABLE "ExpertResponse" ADD CONSTRAINT "ExpertResponse_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExpertResponse" ADD CONSTRAINT "ExpertResponse_expertId_fkey" FOREIGN KEY ("expertId") REFERENCES "Expert"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserExpertResponseVote" ADD CONSTRAINT "UserExpertResponseVote_fischerId_fkey" FOREIGN KEY ("fischerId") REFERENCES "User"("fischerId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserExpertResponseVote" ADD CONSTRAINT "UserExpertResponseVote_expertResponseId_fkey" FOREIGN KEY ("expertResponseId") REFERENCES "ExpertResponse"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_fischerId_fkey" FOREIGN KEY ("fischerId") REFERENCES "User"("fischerId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserCommentVote" ADD CONSTRAINT "UserCommentVote_fischerId_fkey" FOREIGN KEY ("fischerId") REFERENCES "User"("fischerId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserCommentVote" ADD CONSTRAINT "UserCommentVote_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "Comment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserCompliance" ADD CONSTRAINT "UserCompliance_fischerId_fkey" FOREIGN KEY ("fischerId") REFERENCES "User"("fischerId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserCompliance" ADD CONSTRAINT "UserCompliance_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BadPost" ADD CONSTRAINT "BadPost_websiteArticleId_fkey" FOREIGN KEY ("websiteArticleId") REFERENCES "WebsiteArticle"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_websiteArticleId_fkey" FOREIGN KEY ("websiteArticleId") REFERENCES "WebsiteArticle"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_topicId_fkey" FOREIGN KEY ("topicId") REFERENCES "Topic"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_fischerId_fkey" FOREIGN KEY ("fischerId") REFERENCES "User"("fischerId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WebsiteArticle" ADD CONSTRAINT "WebsiteArticle_websiteId_fkey" FOREIGN KEY ("websiteId") REFERENCES "Website"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Expert" ADD CONSTRAINT "Expert_topicId_fkey" FOREIGN KEY ("topicId") REFERENCES "Topic"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Expert" ADD CONSTRAINT "Expert_fischerId_fkey" FOREIGN KEY ("fischerId") REFERENCES "User"("fischerId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
