import { RabbitMQAdapterMock } from '@/tests/main/routes/mocks'
import { app } from '@/main'

import request from 'supertest'

jest.mock('@/infra/adapters/queue/rabbitmq', () => ({
  RabbitMQAdapter: RabbitMQAdapterMock
}))

describe('WebHookRouter', () => {
  let payment: {
    status: string
    externalReference: string
    billingType: string
    invoiceUrl: string
  }

  beforeAll(() => {
    payment = { status: 'CONFIRMED', externalReference: 'any_external_reference', billingType: 'BOLETO', invoiceUrl: 'any_url' }
  })

  describe('POST /asaas/process-payment', () => {
    it('should return 202', async () => {
      const { status } = await request(app)
        .post('/v1/api/asaas/process-payment')
        .send({ payment })

      expect(status).toBe(200)
    })
  })
})
