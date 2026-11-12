-- DropForeignKey
ALTER TABLE "Category" DROP CONSTRAINT IF EXISTS "Category_userId_fkey";

-- DropIndex
DROP INDEX IF EXISTS "Category_userId_idx";

-- DropIndex
DROP INDEX IF EXISTS "Category_userId_name_key";

-- AlterTable
ALTER TABLE "Category" DROP COLUMN IF EXISTS "userId";

