import type { Actions } from "@sveltejs/kit";
import { json } from '@sveltejs/kit';
import { getStores} from "$app/stores";
import {get} from "svelte/store";
export function load({ params, locals }) {
  console.log("params: ", params);
  console.log("locals: ", locals);
  return {}
}


//export const actions : Actions = {
//  data: async ({request}) => { 
//    const { rootNode, startDate } = await request.json()
//    console.log(typeof rootNode);
//    const data = await prisma[rootNode as string].findMany({
//                                where : {
//                                  date : startDate
//                                }
//                              });
//    return json(data);
//  },
//  node: async ({ request }) => {
//    const { rootNode, startDate, name } = await request.json();
//    const type = await prisma[rootNode as string].findFirst({
//            where : {
//              date: startDate,
//              name: name
//            },
//            select : {
//              type : true
//            }
//        });
//    return json(type);
//  }
//}
