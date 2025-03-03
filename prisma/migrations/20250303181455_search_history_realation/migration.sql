-- DropForeignKey
ALTER TABLE "flightSearchHistory" DROP CONSTRAINT "flightSearchHistory_profileUserId_fkey";

-- AddForeignKey
ALTER TABLE "flightSearchHistory" ADD CONSTRAINT "flightSearchHistory_profileUserId_fkey" FOREIGN KEY ("profileUserId") REFERENCES "profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
