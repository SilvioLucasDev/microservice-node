import { type UUIDGenerator } from '@/application/contracts/adapters'
import { FakePaymentGateway } from '@/infra/adapters/gateways'

import { mock, type MockProxy } from 'jest-mock-extended'

describe('ProcessPaymentUseCase', () => {
  let transactionId: string
  let user: object
  let card: object
  let total: number
  let paymentType: string
  let installments: number
  let dueDate: Date
  let tid: string
  let status: string
  let url: string
  let processorResponse: string

  let sut: FakePaymentGateway
  let crypto: MockProxy<UUIDGenerator>

  beforeAll(() => {
    transactionId = 'any_transaction_id'
    user = { any: 'any' }
    card = { any: 'any' }
    total = 300
    paymentType = 'credit_card'
    installments = 3
    dueDate = new Date()
    tid = 'any_tid'
    status = 'approved'
    url = 'any_url'
    processorResponse = 'Retorno do gateway'

    crypto = mock()
    crypto.uuid.mockReturnValue(tid)
  })

  beforeEach(() => {
    sut = new FakePaymentGateway(crypto)
  })

  it('should return tid, status, url and processorResponse when payment is processed', async () => {
    const result = await sut.makePayment({ transactionId, user, card, total, paymentType, installments, dueDate })

    expect(result.transactionId).toBe(tid)
    expect(result.status).toBe(status)
    expect(result.url).toBe(url)
    expect(result.processorResponse).toBe(processorResponse)
  })
})
