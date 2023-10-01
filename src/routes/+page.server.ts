import jsondata from '$lib/assets/data.json';
import { fail } from '@sveltejs/kit';

type Month = keyof typeof jsondata;


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

export function load() {

    let month : Month = "1"; 

    let nodes :  Array<Node> = ['الإيرادات']
                         .concat(jsondata[month]['الإيرادات']['الموارد المالية العامة'])
                         .map(v => {return {id : v};});
    let links : Array<Link> = ['الإيرادات']
                          .flatMap(v => {return jsondata[month]['الإيرادات']['الموارد المالية العامة']
                                  .map((r, i) => {return {
                                                    source: v, 
                                                    target: r,
                                                    value: jsondata[month]['الإيرادات']['نفقة الشهر'][i]};
                                                    });
                                            });
    let data = {
      nodes : nodes, 
      links : links
    }
    return {data: data}
}

function firstDayInMonth(date : string) : string {
  return date.slice(0, date.length - 2) + '01';
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
