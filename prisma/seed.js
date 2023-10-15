// prisma/seed.ts

import { PrismaClient} from '@prisma/client';
import data from './data.json'  assert { type: "json" };

const keys = Object.keys(data);

console.log(keys);

const prisma = new PrismaClient({
  log: ['query'],
});



function main() {
  console.log(`start seeding ...`)

  keys.map( key => { return Promise.all(
    data[key].map((v)  => {
      let data = {
        type: v.type,
        name: v.name,
        value: v.value,
        date: new Date(v.date),
      };
      switch (key) {
        case "category": 
          return prisma[key].create({ data : data});
        case "revenue":
        case "expense":
        case "oil":
        case "other_revenues":
          data["parent_type"] = key;
          return prisma[key].create({ data : data});
        default:
          throw new Error("Wrong key");
      }
    }))
    .then(() => console.info(`[seed] successfully created ${key} records`))
    .catch(e => console.error(`[seed] failed to create ${key} records`, e))
  }); 
  
}

main();
