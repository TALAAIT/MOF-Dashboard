import prisma, {isTableName, type TableName} from '$lib/server/prisma';
import { merge, reduce, sortBy, zipWith } from 'lodash';
import { get } from 'svelte/store';

type Node = { id: string, type: TableName};

type Link = { 
  source : string 
  target : string
  value : number
};

export type SankeyData = {
  links : Link[]
  nodes : Node[]
};


export async function getData(root : string, 
                       child : string,
                       startDate: Date,
                       endDate : Date) {
  let include = Object.fromEntries([[child, true]]);

  let data = await prisma[root].findMany({
    where: {
      date: {
        gte : startDate,
        lt : endDate
      },
      type : child
    },
    include : include,
    orderBy : {
      date : 'asc'
    }
  });

  return data;
}

async function getAccordionLevel(root : string) {
  let data = await prisma[root].findMany({
    select: {
      name: true,
      type: true
    },
    distinct: ['type', 'name'],
  });
  return data;
}

export async function getAccordionList(root : string) {
  let data = await getAccordionLevel(root)
  data = data.map(v => merge(v, {parent : root}));
  for (const {type} of data) {
    if (isTableName(type)) {
      data = data.concat(await getAccordionList(type));
    }
    else {
      data = data.concat([]);
    }
  }
  return data;
}

export async function getPageTitle(root : string, 
                                   child : string) : Promise<string> {
  const { name } = await prisma[root].findFirst({
   where : {
    type : child
   },
    select : {
      name : true
    }
  });
  return name;
}


function getNodes(data : object, child : string) : Node[] {
      return [[data?.name, data?.type]]
            .concat(data?.[child].map(v => [v.name, v.type]))
            .map(([name, type]) => {return {id: name, type: type};});
}


function getLinks(data : object, child : string) : Link[] {
      return data?.[child].map(v => {
        return {
          source : data.name,
          target : v.name,
          value : Number(v.value)
        }
      });
}

export async function getSankeyData(root : string, 
                              child : string, 
                              startDate : Date,
                              endDate : Date) : Promise<SankeyData> {

  
  let data = await getData(root, child, startDate, endDate);

  let nodesList: Node[][] = data.map(d => getNodes(d, child)); 
  let linksList: Link[][] = data.map(d => getLinks(d, child));

  let links : Link[] = reduce<Link[], Link[]>(linksList, (a : Link[], b : Link[]) => {
    let a_sorted = sortBy<Link>(a, a => a.target);
    let b_sorted = sortBy<Link>(b, b => b.target);
    return zipWith<Link, Link, Link>(a_sorted,b_sorted, (x,y) => {
      return {
        source : x.source,
        target : x.target,
        value : Number(x.value + y.value)
      };
    });
  });

  
  let nodes = nodesList[0];

  console.log(links);
  console.log(nodes);

  return {links: links, nodes: nodes};

}
