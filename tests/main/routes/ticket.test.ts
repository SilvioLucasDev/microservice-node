import { EventRepositoryMock, RabbitMQAdapterMock, TicketRepositoryMock } from '@/tests/main/routes/mocks'
import { TicketRouter } from '@/main/routes'
import { EventNotFoundError } from '@/application/errors'
import { ExpressAdapter } from '@/presentation/adapters'

import request from 'supertest'

jest.mock('@/infra/adapters/queue/rabbitmq', () => ({
  RabbitMQAdapter: RabbitMQAdapterMock
}))

jest.mock('@/infra/repositories/postgres', () => ({
  PgEventRepository: EventRepositoryMock,
  PgTicketRepository: TicketRepositoryMock
}))

describe('TicketRouter', () => {
  let eventId: string
  let email: string
  let creditCardToken: string

  let httpServer: ExpressAdapter

  beforeAll(() => {
    eventId = 'any_event_id'
    email = 'any_email'
    creditCardToken = 'any_credit_card_token'

    httpServer = new ExpressAdapter()
    new TicketRouter(httpServer)
    httpServer.listen()
  })

  describe('POST /ticket/purchase', () => {
    it('should return 200 with ticketId and status', async () => {
      const { status, body } = await request(httpServer.app)
        .post('/v1/api/ticket/purchase')
        .send({ eventId, email, creditCardToken })

      expect(status).toBe(200)
      expect(body.ticketId).toBeDefined()
      expect(body.status).toBe('reserved')
    })

    it('should return 400 with EventNotFoundError', async () => {
      const { status, body } = await request(httpServer.app)
        .post('/v1/api/ticket/purchase')
        .send({ eventId: 'invalid_event_id', email, creditCardToken })

      expect(status).toBe(400)
      expect(body.error).toBe(new EventNotFoundError().message)
    })
  })
})
