/*
  Warnings:

  - Made the column `symbol` on table `Player` required. This step will fail if there are existing NULL values in that column.
  - Made the column `uid` on table `Player` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Player" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "symbol" TEXT NOT NULL,
    "uid" TEXT NOT NULL,
    "gameId" INTEGER NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    CONSTRAINT "Player_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Player" ("created_at", "gameId", "id", "name", "symbol", "uid", "updated_at") SELECT "created_at", "gameId", "id", "name", "symbol", "uid", "updated_at" FROM "Player";
DROP TABLE "Player";
ALTER TABLE "new_Player" RENAME TO "Player";
CREATE UNIQUE INDEX "Player_name_key" ON "Player"("name");
CREATE INDEX "Player_id_idx" ON "Player"("id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
