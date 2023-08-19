import { EventRepositoryMock, RabbitMQAdapterMock, TicketRepositoryMock } from '@/tests/main/routes/mocks'
import { app } from '@/main/config/app'

import request from 'supertest'

jest.mock('@/infra/adapters/rabbitmq', () => ({
  RabbitMQAdapter: RabbitMQAdapterMock
}))

jest.mock('@/infra/repositories/postgres', () => ({
  PgEventRepository: EventRepositoryMock,
  PgTicketRepository: TicketRepositoryMock
}))

describe('Ticket Routes', () => {
  describe('POST /ticket/purchase', () => {
    it('should return 200 with ticketID', async () => {
      const { status, body } = await request(app)
        .post('/v1/api/ticket/purchase')
        .send({ eventId: 'any_event_id', email: 'any_email', creditCardToken: 'any_credit_card_token' })

      expect(status).toBe(200)
      expect(body.ticketId).toBeDefined()
    })
  })
})
