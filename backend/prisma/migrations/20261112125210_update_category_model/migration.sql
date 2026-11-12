-- DropIndex
DROP INDEX IF EXISTS "Category_userId_name_type_key";

-- AlterTable
ALTER TABLE "Category" DROP COLUMN IF EXISTS "createdAt",
DROP COLUMN IF EXISTS "type";

-- DropEnum
DROP TYPE IF EXISTS "CatrgoryType";

-- CreateIndex
CREATE UNIQUE INDEX IF NOT EXISTS "Category_userId_name_key" ON "Category"("userId", "name");

