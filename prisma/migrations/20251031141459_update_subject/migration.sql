/*
  Warnings:

  - The values [ELEMENTARY,MIDDLE_SCHOOL,HIGH_SCHOOL,UNDERGRADUATE,GRADUATE,PROFESSIONAL,CONTINUING_EDUCATION] on the enum `AcademicLevel` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `credits` on the `Subject` table. All the data in the column will be lost.
  - You are about to drop the column `parentSubjectId` on the `Subject` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `Subject` table. All the data in the column will be lost.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "AcademicLevel_new" AS ENUM ('GRADE1', 'GRADE2', 'GRADE3', 'GRADE4', 'GRADE5', 'GRADE6', 'GRADE7', 'GRADE8', 'GRADE9', 'GRADE10', 'GRADE11', 'GRADE12');
ALTER TABLE "Subject" ALTER COLUMN "level" TYPE "AcademicLevel_new" USING ("level"::text::"AcademicLevel_new");
ALTER TYPE "AcademicLevel" RENAME TO "AcademicLevel_old";
ALTER TYPE "AcademicLevel_new" RENAME TO "AcademicLevel";
DROP TYPE "AcademicLevel_old";
COMMIT;

-- AlterTable
ALTER TABLE "Subject" DROP COLUMN "credits",
DROP COLUMN "parentSubjectId",
DROP COLUMN "type";
