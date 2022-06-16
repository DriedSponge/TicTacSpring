-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Player" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "symbol" TEXT NOT NULL,
    "uid" TEXT NOT NULL,
    "gameId" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    CONSTRAINT "Player_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game" ("code") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Player" ("created_at", "gameId", "id", "name", "symbol", "uid", "updated_at") SELECT "created_at", "gameId", "id", "name", "symbol", "uid", "updated_at" FROM "Player";
DROP TABLE "Player";
ALTER TABLE "new_Player" RENAME TO "Player";
CREATE UNIQUE INDEX "Player_name_key" ON "Player"("name");
CREATE INDEX "Player_id_idx" ON "Player"("id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
