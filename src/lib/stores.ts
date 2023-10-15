import { get, writable, derived } from "svelte/store";
import type { TableName } from "$lib/prisma";
//import prisma from "$lib/prisma";
//import { browser } from "$app/environment";
//
//type Data = {
//  links : Link[]
//  nodes : Node[]
//}
//
export const startDate = writable(firstDayInMonth(1, 2023)); 
export const rootNode = writable("category" as TableName);
//export const data = derived([rootNode, startDate], 
//                           async ([$rootNode, $startDate]) => {
//                            console.log(`rootNode : ${$rootNode}`);
//                            const response = await fetch('/api/data', {
//                              method: 'POST',
//                              body : JSON.stringify({
//                                rootNode : $rootNode, 
//                                startDate : $startDate
//                              }),
//                              headers : { 
//                                'content-type' : 'application/json'
//                              }
//                            });
//                            return await response.json()
//});
//
//export const childNode = writable<string>('');
//export const sankeyData = derived([data, rootNode, childNode], 
//                                async ([$data, $rootNode, $childNode]) => {
//  let sankey_data = await $data;
//  console.log('sankey_data: ', sankey_data);
//  let nodes : Node[] = await sankey_data.map((v : any) => {return {id : v.name};});
//  let links : Link [] = [];
//  switch ($rootNode) {
//    case "category":
//      let revenue = sankey_data.filter((v : any) => v.type === "revenue")[0]
//      let expense = sankey_data.filter((v : any) => v.type === "expense")[0]
//      if (revenue.value > expense.value) {
//        links = [{ source: revenue.name, 
//                   target: expense.name, 
//                   value: Number(expense.value)},
//                 { source: revenue.name,
//                   target: "الفائض",
//                   value: Number(revenue.value - expense.value)}];
//        nodes.push({id : "الفائض"});
//      } else {
//        links = [{ source: expense.name, 
//                   target: revenue.name, 
//                   value: Number(revenue.value)},
//                 { source: expense.name,
//                   target: "العجز",
//                   value: Number(expense.value - revenue.value)}];
//        nodes.push({id : "العجز"});
//      }
//      break
//  ye  default:
//      links = sankey_data.map((v : any) => { return {source: $childNode,
//                                             target: v.name, 
//                                              value: Number(v.value)}; });
//      nodes.push({id: $childNode});
//      break
//  }
//  return {links : links, nodes : nodes};
//});
//
//
//
////childNode.subscribe(async (name) => {
////  console.log('name: ', name);
////  const response = await fetch('/api/node', {
////  method: 'GET',
////    body: JSON.stringify({
////      rootNode : get(rootNode), 
////      startDate : get(startDate), 
////      name: name
////    }),
////    headers : {
////      'content-type' : 'application/json'
////    }
////  });
////  let newRoot = await response.json();
////  console.log('newRoot: ', newRoot);
////  rootNode.set(newRoot);
////});
////
function firstDayInMonth(month : number, year : number) : Date {
  month = month > 0 ? (month < 13 ? month : 12) : 1;
  month = Math.max(Math.min(month, 12), 1);
  return new Date(`${year > 1970 ? year : 1970}-${String(month).padStart(2,'0')}-01`);
}
//
//
