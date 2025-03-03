-- CreateTable
CREATE TABLE "profile" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "birthDate" TIMESTAMP(3) NOT NULL,
    "active" BOOLEAN NOT NULL,

    CONSTRAINT "profile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "flightSearchHistory" (
    "id" TEXT NOT NULL,
    "profileUserId" TEXT NOT NULL,
    "origin" TEXT NOT NULL,
    "destination" TEXT NOT NULL,
    "originDate" TIMESTAMP(3) NOT NULL,
    "destinationDate" TIMESTAMP(3) NOT NULL,
    "countPassengers" INTEGER NOT NULL,
    "lowestPrice" DECIMAL(65,30) NOT NULL,
    "higherPrice" DECIMAL(65,30) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "flightSearchHistory_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "profile_email_key" ON "profile"("email");

-- CreateIndex
CREATE UNIQUE INDEX "profile_userId_key" ON "profile"("userId");

-- CreateIndex
CREATE INDEX "flightSearchHistory_profileUserId_idx" ON "flightSearchHistory"("profileUserId");

-- AddForeignKey
ALTER TABLE "flightSearchHistory" ADD CONSTRAINT "flightSearchHistory_profileUserId_fkey" FOREIGN KEY ("profileUserId") REFERENCES "profile"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
