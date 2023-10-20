import {redirect, type Page } from '@sveltejs/kit';
import {isTableName, type TableName} from '$lib/server/prisma';
import {getSankeyData, type SankeyData} from '$lib/server/database'


const date = new Date();
const currentMonth = date.getMonth() + 1;
const currentYear = date.getFullYear()

export const trailingSlash = 'always';
export async function load({ params, url } : Page) {
  console.log(params);
  console.log(url);
  let startDate = new Date(url.searchParams.get('startDate') || firstDayInMonth(1,currentYear));
  let endDate = new Date(url.searchParams.get('endDate') || firstDayInMonth(currentMonth,currentYear));

  console.log(startDate);
  console.log(endDate);


  let path : string[] = params.path.split('/')
                                  .filter((value) => value.length > 0);
  let [root, child] : string[] = path.slice(-2);

  if(!isTableName(child)) {
    throw redirect(304, `./.?${url.searchParams.toString()}`);
  }
  const data = await getSankeyData(root, child, startDate, endDate);

 return { data : data, title : 'title'};
}


function firstDayInMonth(month : number, year : number) : string {
  month = month > 0 ? (month < 13 ? month : 12) : 1;
  month = Math.max(Math.min(month, 12), 1);
  return `${year > 1970 ? year : 1970}-${String(month).padStart(2,'0')}-01`
}






