import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient();

async function main() {
  const card = await prisma.card.create({
    data: {
      id: 'ebfa9e28-4c25-11ee-be56-0242ac120002',
      user_id: '443315ee-4c25-11ee-be56-0242ac120002',
      alias: 'Roxinho',
      number: '8829',
      brand: 'MASTERCARD',
      token: '98ab6586-2b68-43d8-b44a-bc20ee2c4cfd',
    }
  })

  await prisma.transaction.create({
    data: {
      id: '8f63e4e0-ae83-46ad-a5c6-b7fe474d2928',
      ticket_id: 'f2e08123-8696-4671-bcbd-a98f3e71622b',
      payment_type: 'credit_card',
      card_id: card.id,
      total: 600,
      installments: 3,
      due_date: getDueDate(),
      processor_response: 'Return of gateway',
      transaction_id: 'pay_1758811371749341',
      status: 'approved'
    }
  })

  await prisma.transaction.create({
    data: {
      id: 'c18bdbec-4c2b-11ee-be56-0242ac120002',
      ticket_id: '5ded906c-4c2b-11ee-be56-0242ac120002',
      payment_type: 'billet',
      total: 600,
      due_date: getDueDate(),
      processor_response: 'Return of gateway',
      transaction_id: 'pay_6307782655751672',
      status: 'pending'
    }
  })

  function getDueDate (): Date {
    const dueDate = new Date()
    dueDate.setDate(dueDate.getDate() + 10)
    return dueDate
  }
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


