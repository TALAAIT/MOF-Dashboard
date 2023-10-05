import { fail } from '@sveltejs/kit';
import { PrismaClient, category, revenue, expense} from '@prisma/client';
import type { Category } from '@prisma/client';

const prisma = new PrismaClient();



type Data = {
  nodes : Array<Node>
  links : Array<Link>
}

type Node = { id: string };
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
      select: {
        date : month,
        type : category.Revenue
      }
    });

    const monthRevenues = await prisma.revenue.findMany({
      select : {
        date : monthRevenue.date,
      }
    });

    let nodes :  Array<Node> = [monthRevenue.name] 
                              .concat(monthRevenues.map(c => c.name))
                              .map(v => {return {id : v};});

    let links : Array<Link> = [monthRevenue.name]
                          .flatMap(v => monthRevenues.map(c => {return 
                                                          {
                                                            source : v,
                                                            target : c.name,
                                                            value : c.value
                          };}));
    let data = {
      nodes : nodes, 
      links : links
    }
    return {data: data}
}


function validDateRange(d1 : string, d2 : string) : boolean {
  let t1 = new Date(d1).getTime();
  let t2 = new Date(d2).getTime();
  return t1 < t2;
}

export const actions = {
  default: async ({request}) => {

    const formData = await request.formData();
    const startDate : string = formData.get("startDate");
    const endDate : string = formData.get("endDate");


    if (!validDateRange(startDate, endDate)) {
      return fail(422, {
				error: "Invalid date range.",
      });
    }
    
    return {
      data : data,
      startDate : firstDayInMonth(startDate), 
      endDate : firstDayInMonth(endDate)
    }


  }
}
