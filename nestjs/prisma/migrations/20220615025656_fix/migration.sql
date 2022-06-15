-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Game" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "code" TEXT NOT NULL,
    "x" TEXT,
    "o" TEXT,
    "turn" TEXT DEFAULT 'x',
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);
INSERT INTO "new_Game" ("code", "created_at", "id", "o", "turn", "updated_at", "x") SELECT "code", "created_at", "id", "o", "turn", "updated_at", "x" FROM "Game";
DROP TABLE "Game";
ALTER TABLE "new_Game" RENAME TO "Game";
CREATE UNIQUE INDEX "Game_code_key" ON "Game"("code");
CREATE INDEX "Game_id_idx" ON "Game"("id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
