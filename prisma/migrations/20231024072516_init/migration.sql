-- CreateEnum
CREATE TYPE "Category" AS ENUM ('revenue', 'expense');

-- CreateEnum
CREATE TYPE "Revenue" AS ENUM ('oil', 'other_revenues', 'previous_years');

-- CreateEnum
CREATE TYPE "Expense" AS ENUM ('salaries', 'operational', 'development', 'support');

-- CreateEnum
CREATE TYPE "Oil" AS ENUM ('oil_sales', 'oil_taxes');

-- CreateEnum
CREATE TYPE "OtherRevenues" AS ENUM ('taxes', 'customs', 'telecommunications', 'libyan_central_bank', 'fuel', 'other');

-- CreateTable
CREATE TABLE "category" (
    "type" "Category" NOT NULL,
    "name" TEXT NOT NULL,
    "value" BIGINT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "category_pkey" PRIMARY KEY ("date","type")
);

-- CreateTable
CREATE TABLE "revenue" (
    "type" "Revenue" NOT NULL,
    "name" TEXT NOT NULL,
    "value" BIGINT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "parent_type" "Category" NOT NULL,

    CONSTRAINT "revenue_pkey" PRIMARY KEY ("date","type")
);

-- CreateTable
CREATE TABLE "expense" (
    "type" "Expense" NOT NULL,
    "name" TEXT NOT NULL,
    "value" BIGINT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "parent_type" "Category" NOT NULL,

    CONSTRAINT "expense_pkey" PRIMARY KEY ("date","type")
);

-- CreateTable
CREATE TABLE "oil" (
    "type" "Oil" NOT NULL,
    "name" TEXT NOT NULL,
    "value" BIGINT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "parent_type" "Revenue" NOT NULL,

    CONSTRAINT "oil_pkey" PRIMARY KEY ("date","type")
);

-- CreateTable
CREATE TABLE "other_revenues" (
    "type" "OtherRevenues" NOT NULL,
    "name" TEXT NOT NULL,
    "value" BIGINT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "parent_type" "Revenue" NOT NULL,

    CONSTRAINT "other_revenues_pkey" PRIMARY KEY ("date","type")
);

-- AddForeignKey
ALTER TABLE "revenue" ADD CONSTRAINT "revenue_date_parent_type_fkey" FOREIGN KEY ("date", "parent_type") REFERENCES "category"("date", "type") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "expense" ADD CONSTRAINT "expense_date_parent_type_fkey" FOREIGN KEY ("date", "parent_type") REFERENCES "category"("date", "type") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "oil" ADD CONSTRAINT "oil_date_parent_type_fkey" FOREIGN KEY ("date", "parent_type") REFERENCES "revenue"("date", "type") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "other_revenues" ADD CONSTRAINT "other_revenues_date_parent_type_fkey" FOREIGN KEY ("date", "parent_type") REFERENCES "revenue"("date", "type") ON DELETE RESTRICT ON UPDATE CASCADE;
