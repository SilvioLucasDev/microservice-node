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
      complement: 'A',
      neighborhood: 'Plano Diretor Norte',
      city: 'Palmas',
      state: 'TO',
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


