-- CreateEnum
CREATE TYPE "category" AS ENUM ('Revenue', 'Expense');

-- CreateEnum
CREATE TYPE "revenue" AS ENUM ('Oil', 'Other', 'PreviousYears');

-- CreateEnum
CREATE TYPE "expense" AS ENUM ('Salaries', 'Operational', 'Development', 'Support');

-- CreateTable
CREATE TABLE "Category" (
    "type" "category" NOT NULL,
    "name" TEXT NOT NULL,
    "value" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("date","type")
);

-- CreateTable
CREATE TABLE "Revenue" (
    "type" "revenue" NOT NULL,
    "name" TEXT NOT NULL,
    "value" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "category_type" "category" NOT NULL,

    CONSTRAINT "Revenue_pkey" PRIMARY KEY ("date","type")
);

-- CreateTable
CREATE TABLE "Expense" (
    "type" "expense" NOT NULL,
    "name" TEXT NOT NULL,
    "value" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "category_type" "category" NOT NULL,

    CONSTRAINT "Expense_pkey" PRIMARY KEY ("date","type")
);

-- AddForeignKey
ALTER TABLE "Revenue" ADD CONSTRAINT "Revenue_date_category_type_fkey" FOREIGN KEY ("date", "category_type") REFERENCES "Category"("date", "type") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Expense" ADD CONSTRAINT "Expense_date_category_type_fkey" FOREIGN KEY ("date", "category_type") REFERENCES "Category"("date", "type") ON DELETE RESTRICT ON UPDATE CASCADE;
