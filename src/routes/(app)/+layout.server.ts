import {redirect, type Page } from '@sveltejs/kit';
import prisma, {isTableName, type TableName} from '$lib/server/prisma';
import {getAccordionList, type SankeyData} from '$lib/server/database'


export async function load({ params, url } : Page) {
  const data = await getAccordionList('category');
  return {accordionList : data}
}





