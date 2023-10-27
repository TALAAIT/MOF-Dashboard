from prisma import Prisma
import asyncio 
from datetime import datetime

async def main() -> None:
    db = Prisma()
    await db.connect()

    category = await db["category"].find_unique(where={
        "key" : {
            "date" : datetime(2023, 3, 1),
            "type" : "revenue"
            }})

    print(category)

if __name__ == '__main__':
    asyncio.run(main())
