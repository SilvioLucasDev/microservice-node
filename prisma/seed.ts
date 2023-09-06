import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.create({
    data: {
      id: '443315ee-4c25-11ee-be56-0242ac120002',
      name: 'Any User Test',
      document: '60062039016',
      email: 'any_user@hotmail.com',
      password: 'hashed',
      mobile_phone: '11912345678'
    }
  })

  await prisma.address.create({
    data: {
      id: '4a9c8140-4c25-11ee-be56-0242ac120002',
      user_id: user.id,
      zipcode: '77006516',
      address: 'Quadra 408 Norte Avenida',
      number: '8',
      complements: 'A',
      neighborhood: 'Plano Diretor Norte',
      city: 'Palmas',
      state: 'TO',
    }
  })

  const card = await prisma.card.create({
    data: {
      id: 'ebfa9e28-4c25-11ee-be56-0242ac120002',
      user_id: user.id,
      alias: 'Roxinho',
      number: '8829',
      brand: 'MASTERCARD',
      token: '98ab6586-2b68-43d8-b44a-bc20ee2c4cfd',
    }
  })

  const event = await prisma.event.create({
    data: {
      id: 'c08c6ed4-757f-44da-b5df-cb856dfdf897',
      name: 'JavaScript Global Summit',
      description: 'JavaScript Global Summit: All about Javascript 19/10/2024 20:00',
      price: 300,
      capacity: 100000
    }
  })

  const ticket = await prisma.ticket.createMany({
    data: [
      {
        id: 'f2e08123-8696-4671-bcbd-a98f3e71622b',
        event_id: event.id,
        user_id: user.id,
        status: 'APPROVED'
      }, {
        id: '5ded906c-4c2b-11ee-be56-0242ac120002',
        event_id: event.id,
        user_id: user.id,
        status: 'RESERVED'
      }
    ]
  })

  await prisma.transaction.create({
    data: {
      id: '8f63e4e0-ae83-46ad-a5c6-b7fe474d2928',
      ticket_id: 'f2e08123-8696-4671-bcbd-a98f3e71622b',
      paymentType: 'CREDIT_CARD',
      card_id: card.id,
      total: 600,
      installments: 3,
      processorResponse: 'Return of gateway',
      transaction_id: 'pay_1758811371749341',
      status: 'APPROVED'
    }
  })

  await prisma.transaction.create({
    data: {
      id: 'c18bdbec-4c2b-11ee-be56-0242ac120002',
      ticket_id: '5ded906c-4c2b-11ee-be56-0242ac120002',
      paymentType: 'BILLET',
      total: 600,
      processorResponse: 'Return of gateway',
      transaction_id: 'pay_6307782655751672',
      status: 'PENDING'
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


