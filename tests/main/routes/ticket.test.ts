import { EventRepositoryMock, RabbitMQAdapterMock, TicketRepositoryMock } from '@/tests/main/routes/mocks'
import { EventNotFoundError } from '@/application/errors'
import { TicketRouter } from '@/main/routes'
import { ExpressAdapter } from '@/presentation/adapters'

import request from 'supertest'

jest.mock('@/infra/adapters/queue/rabbitmq', () => ({
  RabbitMQAdapter: RabbitMQAdapterMock
}))

jest.mock('@/infra/repositories/postgres', () => ({
  PgEventRepository: EventRepositoryMock,
  PgTicketRepository: TicketRepositoryMock
}))

describe('Ticket Routes', () => {
  let httpServer: ExpressAdapter

  beforeAll(() => {
    httpServer = new ExpressAdapter()
    new TicketRouter(httpServer)
    httpServer.listen()
  })

  describe('POST /ticket/purchase', () => {
    it('should return 200 with ticketID', async () => {
      const { status, body } = await request(httpServer.app)
        .post('/v1/api/ticket/purchase')
        .send({ eventId: 'any_event_id', email: 'any_email', creditCardToken: 'any_credit_card_token' })

      expect(status).toBe(200)
      expect(body.ticketId).toBeDefined()
      expect(body.status).toBe('reserved')
    })

    it('should return 400 with EventNotFound', async () => {
      const { status, body } = await request(httpServer.app)
        .post('/v1/api/ticket/purchase')
        .send({ eventId: 'invalid_event_id', email: 'any_email', creditCardToken: 'any_credit_card_token' })

      expect(status).toBe(400)
      expect(body.error).toBe(new EventNotFoundError().message)
    })
  })
})
