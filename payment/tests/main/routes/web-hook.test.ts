import { RabbitMQAdapterMock } from '@/tests/main/routes/mocks'
import { makeHttpServer as initHttpServer } from '@/main/factories/main/routes'

import express, { type Application } from 'express'
import { type Server } from 'http'
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

  let server: Server
  let app: Application

  beforeAll(() => {
    payment = { status: 'CONFIRMED', externalReference: 'any_external_reference', billingType: 'BOLETO', invoiceUrl: 'any_url' }
  })

  beforeEach(() => {
    app = express()
    server = initHttpServer(app)
  })

  afterEach(() => {
    server.close()
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
