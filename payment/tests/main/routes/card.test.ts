import { prismaMock } from '@/tests/infra/repositories/postgres/mocks'
import { AsaasGatewayMock, UUIDAdapterMock } from '@/tests/main/routes/mocks'
import { app } from '@/main'

import request from 'supertest'
import { type Prisma, type User as UserPrisma } from '@prisma/client'

jest.mock('@/infra/adapters/gateways/asaas', () => ({
  AsaasGateway: AsaasGatewayMock
}))

jest.mock('@/infra/adapters/uuid', () => ({
  UUIDAdapter: UUIDAdapterMock
}))

describe('CardRouter', () => {
  let alias: string
  let holderName: string
  let number: string
  let expiryMonth: string
  let expiryYear: string
  let cvv: number
  let userId: string
  let cardId: string
  let id: string
  let name: string
  let document: string
  let email: string
  let mobilePhone: string
  let zipcode: string
  let address: string
  let complement: string
  let neighborhood: string

  beforeAll(() => {
    alias = 'any_alias'
    holderName = 'Any U. Teste'
    number = '5162306219378829'
    expiryMonth = '05'
    expiryYear = '2024'
    cvv = 318
    userId = '443315ee-4c25-11ee-be56-0242ac120002'
    cardId = 'any_uuid'
    id = '443315ee-4c25-11ee-be56-0242ac120002'
    name = 'Any User Test'
    document = '60062039016'
    email = 'any_user@hotmail.com'
    mobilePhone = 'any_mobile_phone'
    zipcode = '77006516'
    address = 'Quadra 408 Norte Avenida'
    complement = 'a'
    neighborhood = 'Plano Diretor Norte'
  })

  afterAll(async () => {
    await prismaMock.$disconnect()
  })

  describe('POST /tokenize-cards', () => {
    it('should return 200 with cardId', async () => {
      prismaMock.user.findFirst.mockResolvedValueOnce({
        id, name, document, email, mobile_phone: mobilePhone, addresses: [{ zipcode, address, number, complement, neighborhood }]
      } as unknown as Prisma.Prisma__UserClient<UserPrisma>)

      const { status, body } = await request(app)
        .post('/v1/api/tokenize-cards')
        .send({ alias, holderName, number, expiryMonth, expiryYear, cvv, userId })

      expect(status).toBe(200)
      expect(body).toEqual({ cardId })
    })
  })
})
