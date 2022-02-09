/*
  Warnings:

  - Added the required column `uid` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "uid" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT,
    "email" TEXT,
    "google_id" TEXT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    "verifiedEmail" BOOLEAN NOT NULL DEFAULT false,
    "guest_account" BOOLEAN NOT NULL DEFAULT false,
    "gameId" INTEGER,
    CONSTRAINT "User_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_User" ("created_at", "email", "gameId", "google_id", "id", "name", "password", "updated_at", "verifiedEmail") SELECT "created_at", "email", "gameId", "google_id", "id", "name", "password", "updated_at", "verifiedEmail" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_uid_key" ON "User"("uid");
CREATE UNIQUE INDEX "User_name_key" ON "User"("name");
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
CREATE INDEX "User_id_idx" ON "User"("id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
