import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient()

export default prisma
export type TableName = Prisma.ModelName;
export function isTableName(value : string) : value is TableName {
  return Object.hasOwn(Prisma.ModelName, value);
}

