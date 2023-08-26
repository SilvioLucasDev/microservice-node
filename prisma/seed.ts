import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient();

async function main() {
  const event = await prisma.event.create({
    data: {
      id: 'c08c6ed4-757f-44da-b5df-cb856dfdf897',
      name: 'JavaScript Global Summit',
      description: 'JavaScript Global Summit: All about Javascript 19/10/2024 20:00',
      price: 300,
      capacity: 100000
    }
  })

  const ticket = await prisma.ticket.create({
    data: {
      id: 'f2e08123-8696-4671-bcbd-a98f3e71622b',
      event_id: event.id,
      email: 'any_user@hotmail.com',
      status: 'reserved'
    }
  })

  await prisma.transaction.create({
    data: {
      id: '8f63e4e0-ae83-46ad-a5c6-b7fe474d2928',
      ticket_id: ticket.id,
      event_id: event.id,
      tid: '66199ac9-c147-445d-8204-a24f5c5a11e6',
      price: 300,
      status: 'pending'
    }
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
