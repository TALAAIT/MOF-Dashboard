import { fail } from '@sveltejs/kit';
import { PrismaClient, category, revenue, expense} from '@prisma/client';
import type { Category, Revenue,} from '@prisma/client';

const prisma = new PrismaClient();

type Data = {
  links : Link[]
  nodes : Node[]
}

type Node = { id: string}

type Link = { 
  source : string 
  target : string
  value : number
};


function firstDayInMonth(month : number) : Date {
  return new Date(`2023-${String(month).padStart(2,'0')}-01`);
}

export async function load() {

    let month : Date = firstDayInMonth(1); 


    const monthRevenue = await prisma.category.findUnique({
      where : {
        key : {
          date : month,
          type : category.Revenue
        }
      }, 
      include : {
        Revenue: true
      }
    });

    const monthExpense = await prisma.category.findUnique({
      where : {
        key : {
          date : month,
          type : category.Expense
        }
      }, 
      include : {
        Expense: true
      }
    });

    let nodes : Node[] = [monthExpense?.name]
                    .concat(monthExpense?.Expense
                            .map(c => c.name))
                    .map(c => {return {id : c};});

    let links : Link[] = monthExpense?.Expense
                        .map(c => {return {source: monthExpense.name,
                                           target: c.name,
                                            value: Number(c.value)
                                    };});

    let data : Data = {links: links, nodes: nodes};
    
    return {data: data};
}

//g
//gfunction validDateRange(d1 : string, d2 : string) : boolean {
//g  let t1 = new Date(d1).getTime();
//g  let t2 = new Date(d2).getTime();
//g  return t1 < t2;
//g}
//g
//gexport const actions = {
//g  default: async ({request}) => {
//g
//g    const formData = await request.formData();
//g    const startDate : string = formData.get("startDate");
//g    const endDate : string = formData.get("endDate");
//g
//g
//g    if (!validDateRange(startDate, endDate)) {
//g      return fail(422, {
//g				error: "Invalid date range.",
//g      });
//g    }
//g    
//g    return {
//g      data : data,
//g      startDate : firstDayInMonth(startDate), 
//g      endDate : firstDayInMonth(endDate)
//g    }
//g
//g
//g  }
//g}
