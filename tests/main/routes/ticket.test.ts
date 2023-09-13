import { prismaMock } from '@/tests/infra/repositories/postgres/mocks'
import { RabbitMQAdapterMock } from '@/tests/main/routes/mocks'
import { TicketRouter } from '@/main/routes'
import { EventNotFoundError } from '@/application/errors'
import { ExpressAdapter } from '@/presentation/adapters'

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
  let price: number

  let httpServer: ExpressAdapter

  beforeAll(() => {
    paymentType = 'any_payment_type'
    eventId = 'any_event_id'
    userId = 'any_user_id'
    cardId = 'any_card_id'
    installments = 3
    price = 300

    httpServer = new ExpressAdapter()
    new TicketRouter(httpServer)
    httpServer.listen()
  })

  afterAll(async () => {
    await prismaMock.$disconnect()
  })

  describe('POST /purchase-tickets', () => {
    it('should return 202 with ticketId and status', async () => {
      prismaMock.event.findFirst.mockResolvedValueOnce({ id: eventId, price } as unknown as Prisma.Prisma__EventClient<EventPrisma>)

      const { status } = await request(httpServer.app)
        .post('/v1/api/purchase-tickets')
        .send({ paymentType, eventId, userId, cardId, installments })

      expect(status).toBe(202)
    })

    it('should return 400 with EventNotFoundError', async () => {
      const { status, body } = await request(httpServer.app)
        .post('/v1/api/purchase-tickets')
        .send({ paymentType, eventId: 'invalid_event_id', userId, cardId, installments })

      expect(status).toBe(400)
      expect(body.error).toBe(new EventNotFoundError().message)
    })
  })
})
