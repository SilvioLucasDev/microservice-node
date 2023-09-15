import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient();

async function main() {
  const event = await prisma.event.create({
    data: {
      id: 'c08c6ed4-757f-44da-b5df-cb856dfdf897',
      name: 'JavaScript Global Summit',
      description: 'JavaScript Global Summit: All about Javascript 19/10/2024 20:00',
      price: 600,
      capacity: 100000
    }
  })

  await prisma.ticket.createMany({
    data: [
      {
        id: 'f2e08123-8696-4671-bcbd-a98f3e71622b',
        event_id: event.id,
        user_id: '443315ee-4c25-11ee-be56-0242ac120002',
        status: 'approved'
      }, {
        id: '5ded906c-4c2b-11ee-be56-0242ac120002',
        event_id: event.id,
        user_id: '443315ee-4c25-11ee-be56-0242ac120002',
        status: 'reserved'
      }
    ]
  })
}

main()
  .then(async () => {
    console.log('Seed created')
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.log('Error created seed')
    await prisma.$disconnect()
    process.exit(1)
  })


