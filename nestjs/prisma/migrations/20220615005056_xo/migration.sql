-- AlterTable
ALTER TABLE "Game" ADD COLUMN "o" TEXT;
ALTER TABLE "Game" ADD COLUMN "x" TEXT;

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
    "gameId" INTEGER
);
INSERT INTO "new_User" ("created_at", "email", "gameId", "google_id", "guest_account", "id", "name", "password", "uid", "updated_at", "verifiedEmail") SELECT "created_at", "email", "gameId", "google_id", "guest_account", "id", "name", "password", "uid", "updated_at", "verifiedEmail" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_uid_key" ON "User"("uid");
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
CREATE INDEX "User_id_idx" ON "User"("id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
