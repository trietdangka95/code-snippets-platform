/*
  Warnings:

  - You are about to drop the `SnippetTag` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Tag` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `language` on the `Snippet` table. All the data in the column will be lost.
  - You are about to drop the column `topic` on the `Snippet` table. All the data in the column will be lost.
  - Added the required column `languageId` to the `Snippet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Snippet` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "SnippetTag_tagId_idx";

-- DropIndex
DROP INDEX "Tag_name_key";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "SnippetTag";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Tag";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "SnippetTopic" (
    "snippetId" TEXT NOT NULL,
    "topicId" TEXT NOT NULL,

    PRIMARY KEY ("snippetId", "topicId"),
    CONSTRAINT "SnippetTopic_snippetId_fkey" FOREIGN KEY ("snippetId") REFERENCES "Snippet" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "SnippetTopic_topicId_fkey" FOREIGN KEY ("topicId") REFERENCES "Topic" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Snippet" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "userId" TEXT NOT NULL,
    "languageId" TEXT NOT NULL,
    CONSTRAINT "Snippet_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Snippet_languageId_fkey" FOREIGN KEY ("languageId") REFERENCES "Language" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Snippet" ("code", "createdAt", "id", "updatedAt", "userId") SELECT "code", "createdAt", "id", "updatedAt", "userId" FROM "Snippet";
DROP TABLE "Snippet";
ALTER TABLE "new_Snippet" RENAME TO "Snippet";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
