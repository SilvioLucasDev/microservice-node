import { prismaMock } from '@/tests/infra/repositories/postgres/mocks'
import { AsaasGatewayMock, UUIDAdapterMock } from '@/tests/main/routes/mocks'
import { makeHttpServer as initHttpServer } from '@/main/factories/main/routes'

import express, { type Application } from 'express'
import { type Server } from 'http'
import request from 'supertest'

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
  let cvv: string
  let userId: string
  let cardId: string

  let server: Server
  let app: Application

  beforeAll(() => {
    alias = 'any_alias'
    holderName = 'Any U. Teste'
    number = '5162306219378829'
    expiryMonth = '05'
    expiryYear = '2024'
    cvv = '318'
    userId = '443315ee-4c25-11ee-be56-0242ac120002'
    cardId = 'any_uuid'
  })

  beforeEach(() => {
    app = express()
    server = initHttpServer(app)
  })

  afterEach(() => {
    server.close()
  })

  afterAll(async () => {
    await prismaMock.$disconnect()
  })

  describe('POST /tokenize-cards', () => {
    it('should return 200 with cardId', async () => {
      const { status, body } = await request(app)
        .post('/v1/api/tokenize-cards')
        .send({ alias, holderName, number, expiryMonth, expiryYear, cvv, userId })

      expect(status).toBe(200)
      expect(body).toEqual({ cardId })
    })
  })
})
