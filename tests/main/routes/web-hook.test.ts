import { RabbitMQAdapterMock } from '@/tests/main/routes/mocks'
import { WebHookRouter } from '@/main/routes'
import { ExpressAdapter } from '@/presentation/adapters'

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

  let httpServer: ExpressAdapter

  beforeAll(() => {
    payment = { status: 'CONFIRMED', externalReference: 'any_external_reference', billingType: 'BOLETO', invoiceUrl: 'any_url' }

    httpServer = new ExpressAdapter()
    new WebHookRouter(httpServer)
    httpServer.listen()
  })

  describe('POST /asaas/process-payment', () => {
    it('should return 202', async () => {
      const { status } = await request(httpServer.app)
        .post('/v1/api/asaas/process-payment')
        .send({ payment })

      expect(status).toBe(202)
    })
  })
})
