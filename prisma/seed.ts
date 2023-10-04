// prisma/seed.ts

import { PrismaClient } from '@prisma/client';
import { category,
         revenue,
         expense } from '@prisma/client';

import data from './data.json';

const categories = data["categories"];
const revenues  = data["revenues"];
const expenses  = data["expenses"];

console.log(Object.keys(data));


const prisma = new PrismaClient({
  log: ['query'],
});


function main() {
  console.log(`Start seeding ...`)

  categories.map( v =>  prisma.category.create({
    data: {
      type: v.type as category,
      name: v.name,
      value: v.value,
      date: new Date(v.date)
      }
    })
  );
  revenues.map( v =>  prisma.revenue.create({
    data: {
      type: v.type as revenue,
      name: v.name,
      value: v.value,
      date: new Date(v.date),
      category_type: category.Revenue
      }
    })
  );
  expenses.map( v =>  prisma.expense.create({
    data: {
      type: v.type as expense,
      name: v.name,
      value: v.value,
      date: new Date(v.date),
      category_type: category.Expense
      }
    })
  );
}

main()
