import {redirect, type Page } from '@sveltejs/kit';
import prisma, {isTableName, type TableName} from '$lib/prisma';


type Node = { id: string, type: TableName}

type Link = { 
  source : string 
  target : string
  value : number
};


export const trailingSlash = 'always';
export async function load({ params } : Page) {
  console.log(params);
  let date = new Date('2023-01-01');
  let path : string[] = params.path.split('/')
                                  .filter((value) => value.length > 0);
  let [root, child] : string[] = path.slice(-2);

  let include = Object.fromEntries([[child, true]]);
  if(!isTableName(child)) {
    throw redirect(304, "./.");
  }
  const data = await prisma[root].findUnique({
    where : {
      key : {
        date : date,
        type : child
        }
      },
    include : include
  });

  let nodes : Node[] = [[data.name, data.type]]
                      .concat(data[child].map(v => [v.name, v.type]))
                      .map(([name, type]) => {return {id: name, type: type};});
  
  let links : Link[] = data[child].map(v => {
    return {
      source : data.name,
      target : v.name,
      value : Number(v.value)
    };
  });
  return { data : {links : links, nodes : nodes}, title : data.name};
}
