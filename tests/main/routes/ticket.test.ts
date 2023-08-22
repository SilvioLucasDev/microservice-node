import { EventRepositoryMock, RabbitMQAdapterMock, TicketRepositoryMock } from '@/tests/main/routes/mocks'
import { EventNotFoundError } from '@/application/errors'
import { SetupExpress } from '@/main/config/express'

import request from 'supertest'

jest.mock('@/infra/adapters/rabbitmq', () => ({
  RabbitMQAdapter: RabbitMQAdapterMock
}))

jest.mock('@/infra/repositories/postgres', () => ({
  PgEventRepository: EventRepositoryMock,
  PgTicketRepository: TicketRepositoryMock
}))

describe('Ticket Routes', () => {
  let setupExpress: SetupExpress

  beforeAll(() => {
    setupExpress = new SetupExpress()
    setupExpress.init()
  })

  describe('POST /ticket/purchase', () => {
    it('should return 200 with ticketID', async () => {
      const { status, body } = await request(setupExpress.app)
        .post('/v1/api/ticket/purchase')
        .send({ eventId: 'any_event_id', email: 'any_email', creditCardToken: 'any_credit_card_token' })

      expect(status).toBe(200)
      expect(body.ticketId).toBeDefined()
    })

    it('should return 400 with EventNotFound', async () => {
      const { status, body } = await request(setupExpress.app)
        .post('/v1/api/ticket/purchase')
        .send({ eventId: 'invalid_event_id', email: 'any_email', creditCardToken: 'any_credit_card_token' })

      expect(status).toBe(400)
      expect(body.error).toBe(new EventNotFoundError().message)
    })
  })
})
