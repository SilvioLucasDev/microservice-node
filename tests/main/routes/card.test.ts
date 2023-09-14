import { prismaMock } from '@/tests/infra/repositories/postgres/mocks'
import { AsaasGatewayMock, UUIDAdapterMock } from '@/tests/main/routes/mocks'
import { CardRouter } from '@/main/routes'
import { ExpressAdapter } from '@/presentation/adapters'

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

  let httpServer: ExpressAdapter

  beforeAll(() => {
    alias = 'any_alias'
    holderName = 'any_holder_Name'
    number = 'any_number'
    expiryMonth = 'any_expiry_Month'
    expiryYear = 'any_expiry_Year'
    cvv = 300
    userId = 'any_user_Id'
    cardId = 'any_uuid'
    id = 'any_id'
    name = 'any_name'
    document = 'any_document'
    email = 'any_email'
    mobilePhone = 'any_mobile_phone'
    zipcode = 'any_zipcode'
    address = 'any_address'
    complement = 'any_complement'
    neighborhood = 'any_neighborhood'

    httpServer = new ExpressAdapter()
    new CardRouter(httpServer)
    httpServer.listen()
  })

  afterAll(async () => {
    await prismaMock.$disconnect()
  })

  describe('POST /tokenize-cards', () => {
    it('should return 200 with cardId', async () => {
      prismaMock.user.findFirst.mockResolvedValueOnce({
        id, name, document, email, mobile_phone: mobilePhone, addresses: [{ zipcode, address, number, complement, neighborhood }]
      } as unknown as Prisma.Prisma__UserClient<UserPrisma>)

      const { status, body } = await request(httpServer.app)
        .post('/v1/api/tokenize-cards')
        .send({ alias, holderName, number, expiryMonth, expiryYear, cvv, userId })

      expect(status).toBe(200)
      expect(body).toEqual({ cardId })
    })
  })
})
