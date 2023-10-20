import prisma, {isTableName, type TableName} from '$lib/server/prisma';
import { sortBy, zipWith } from 'lodash';

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

export async function getSankeyData(root : string, 
                              child : string, 
                              startDate : Date,
                              endDate : Date) : Promise<SankeyData> {

  console.log('startDate: ', startDate)
  console.log('endDate: ', endDate)
  
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
 
 
      console.log('startLinks: ', startLinks)
      console.log('endLinks: ', endLinks)
 
      links = zipWith<Link, Link, Link>(endLinks, startLinks, (e,s) => {
        return {
          source: e.source,
          target: e.target,
          value: Number(e?.value - s?.value)
        };
      });
      console.log(nodes)
      console.log(links)
      return {links: links, nodes: nodes};
  }

}
