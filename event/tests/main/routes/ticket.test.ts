import { prismaMock } from '@/tests/infra/repositories/postgres/mocks'
import { RabbitMQAdapterMock } from '@/tests/main/routes/mocks'
import { EventNotFoundError } from '@/application/errors'
import { makeHttpServer as initHttpServer } from '@/main/factories/main/routes'

import express, { type Application } from 'express'
import { type Server } from 'http'
import request from 'supertest'
import { type Prisma, type Event as EventPrisma } from '@prisma/client'

jest.mock('@/infra/adapters/queue/rabbitmq', () => ({
  RabbitMQAdapter: RabbitMQAdapterMock
}))

describe('TicketRouter', () => {
  let paymentType: string
  let eventId: string
  let userId: string
  let cardId: string
  let installments: number
  let name: string
  let price: number

  let server: Server
  let app: Application

  beforeAll(() => {
    paymentType = 'credit_card'
    eventId = 'c08c6ed4-757f-44da-b5df-cb856dfdf897'
    userId = '443315ee-4c25-11ee-be56-0242ac120002'
    cardId = 'ebfa9e28-4c25-11ee-be56-0242ac120002'
    installments = 3
    name = 'JavaScript Global Summit'
    price = 300
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

  describe('POST /purchase-tickets', () => {
    it('should return 202', async () => {
      prismaMock.event.findUnique.mockResolvedValueOnce({ id: eventId, name, price } as unknown as Prisma.Prisma__EventClient<EventPrisma>)

      const { status } = await request(app)
        .post('/v1/api/purchase-tickets')
        .send({ paymentType, eventId, userId, cardId, installments })

      expect(status).toBe(202)
    })

    it('should return 400 with EventNotFoundError', async () => {
      const { status, body } = await request(app)
        .post('/v1/api/purchase-tickets')
        .send({ paymentType, eventId: 'invalid_event_id', userId, cardId, installments })

      expect(status).toBe(400)
      expect(body.error).toBe(new EventNotFoundError().message)
    })
  })
})
