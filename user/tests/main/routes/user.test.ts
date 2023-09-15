import { prismaMock } from '@/tests/infra/repositories/postgres/mocks'
import { app } from '@/main'

import request from 'supertest'
import { type Prisma, type User as UserPrisma } from '@prisma/client'

describe('UserRouter', () => {
  let userId: string
  let name: string
  let document: string
  let email: string
  let mobilePhone: string
  let zipcode: string
  let address: string
  let number: string
  let complement: string
  let neighborhood: string
  let user: object

  beforeAll(() => {
    userId = '443315ee-4c25-11ee-be56-0242ac120002'
    name = 'Any User Test'
    document = '60062039016'
    email = 'any_user@hotmail.com'
    mobilePhone = 'any_mobile_phone'
    zipcode = '77006516'
    address = 'Quadra 408 Norte Avenida'
    number = '8'
    complement = 'a'
    neighborhood = 'Plano Diretor Norte'
    user = { id: userId, name, document, email, mobilePhone, zipcode, address, number, complement, neighborhood }
  })

  afterAll(async () => {
    await prismaMock.$disconnect()
  })

  describe('GET /users', () => {
    it('should return 200 with user data', async () => {
      prismaMock.user.findUnique.mockResolvedValueOnce({
        id: userId, name, document, email, mobile_phone: mobilePhone, addresses: [{ zipcode, address, number, complement, neighborhood }]
      } as unknown as Prisma.Prisma__UserClient<UserPrisma>)

      const { status, body } = await request(app)
        .get('/v1/api/users/443315ee-4c25-11ee-be56-0242ac120002')

      expect(status).toBe(200)
      expect(body).toEqual(user)
    })
  })
})
