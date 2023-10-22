import prisma, {isTableName, type TableName} from '$lib/server/prisma';
import { merge, sortBy, zipWith } from 'lodash';
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
  if (isTableName(root)) {
    let data = await getAccordionLevel(root)
    data = data.map(v => merge(v, {parent : root}));
    for (const {type} of data) {
      return data.concat(await getAccordionList(type))
    }
  }
  return [] 
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

export async function getSankeyData(root : string, 
                              child : string, 
                              startDate : Date,
                              endDate : Date) : Promise<SankeyData> {

  
  let include = Object.fromEntries([[child, true]]);

  let data = await prisma[root].findMany({
    where: {
      date: {
        gte : startDate,
        lte : endDate
      },
      type : child
    },
    include : include,
    orderBy : {
      date : 'asc'
    }
  });

  let nodes : Node[] = [];
  let links : Link[] = [];

  switch (startDate.getMonth()) {
    case 0:
      data  = data.slice(-1)[0];
      nodes = [[data?.name, data?.type]]
            .concat(data?.[child].map(v => [v.name, v.type]))
            .map(([name, type]) => {return {id: name, type: type};});
      links = data?.[child].map(v => {
        return {
          source : data.name,
          target : v.name,
          value : Number(v.value)
        }
      });
      return {links : links, nodes: nodes}
    default:
      
      let startData = data[0];
      let endData = data.slice(-1)[0];
      
 
      nodes = [[startData?.name, startData?.type]]
            .concat(startData?.[child].map(v => [v.name, v.type]))
            .map(([name, type]) => {return {id: name, type: type};});
      
      let startLinks : Link[] = startData?.[child].map(v => {
        return {
          source : startData?.name,
          target : v?.name,
          value : v?.value
        };
      });
 
      let endLinks : Link[] = endData?.[child].map(v => {
        return {
          source : endData?.name,
          target : v?.name,
          value : v?.value
        };
      });
      
      startLinks = sortBy(startLinks, e => e.target )
      endLinks = sortBy(endLinks, e => e.target )
 
      links = zipWith<Link, Link, Link>(endLinks, startLinks, (e,s) => {
        return {
          source: e.source,
          target: e.target,
          value: Number(e?.value - s?.value)
        };
      });
      return {links: links, nodes: nodes};
  }

}
