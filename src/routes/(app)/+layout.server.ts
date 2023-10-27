import {redirect, type Page } from '@sveltejs/kit';
import prisma, {isTableName, type TableName} from '$lib/server/prisma';
import {getAccordionList, getData, type SankeyData} from '$lib/server/database'
import type { PageServerLoad } from '../$types';


const date = new Date();
const currentMonth = date.getMonth() + 1;
const currentYear = date.getFullYear()

export async function load({ params, url}) {
  
  let startDate = new Date(url.searchParams.get('startDate') || firstDayInMonth(1,currentYear));
  let endDate = new Date(url.searchParams.get('endDate') || firstDayInMonth(currentMonth,currentYear));
  
  let path : string[] = params.path.split('/')
                                  .filter((value) => value.length > 0);
  let [root, child] : string[] = path.slice(-2);

  if(!isTableName(child)) {
    throw redirect(304, `./.?${url.searchParams.toString()}`);
  }
  const data = await getAccordionList('category');
  
  let detailsData = await getData(root, child, startDate, endDate);


  detailsData = detailsData.map(d => {
  return {
    value : +Number(d.value),
    month : d.date.getMonth() + 1
  };
  });

  console.log(detailsData);

  return {accordionList : data, details : detailsData}
}

function firstDayInMonth(month : number, year : number) : string {
  month = month > 0 ? (month < 13 ? month : 12) : 1;
  month = Math.max(Math.min(month, 12), 1);
  return `${year > 1970 ? year : 1970}-${String(month).padStart(2,'0')}-01`
}



