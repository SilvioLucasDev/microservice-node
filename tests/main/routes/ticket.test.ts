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
  let eventId: string
  let email: string
  let creditCardToken: string
  let price: number

  let httpServer: ExpressAdapter

  beforeAll(() => {
    eventId = 'c08c6ed4-757f-44da-b5df-cb856dfdf897'
    price = 300
    email = 'any_email@hotmail.com'
    creditCardToken = '123456789'

    httpServer = new ExpressAdapter()
    new TicketRouter(httpServer)
    httpServer.listen()
  })

  afterAll(async () => {
    await prismaMock.$disconnect()
  })

  describe('POST /purchase-tickets', () => {
    it('should return 200 with ticketId and status', async () => {
      prismaMock.event.findFirst.mockResolvedValueOnce({ id: eventId, price } as unknown as Prisma.Prisma__EventClient<EventPrisma>)

      const { status, body } = await request(httpServer.app)
        .post('/v1/api/purchase-tickets')
        .send({ eventId, email, creditCardToken })

      expect(status).toBe(200)
      expect(body.ticketId).toBeDefined()
      expect(body.status).toBe('reserved')
    })

    it('should return 400 with EventNotFoundError', async () => {
      const { status, body } = await request(httpServer.app)
        .post('/v1/api/purchase-tickets')
        .send({ eventId: 'invalid_event_id', email, creditCardToken })

      expect(status).toBe(400)
      expect(body.error).toBe(new EventNotFoundError().message)
    })
  })
})
