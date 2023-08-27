import { type UUIDGenerator } from '@/application/contracts/adapters'
import { FakePaymentGateway } from '@/infra/gateways'
import { mock, type MockProxy } from 'jest-mock-extended'

describe('ProcessPaymentUseCase', () => {
  let email: string
  let creditCardToken: string
  let price: string
  let tid: string
  let status: string

  let sut: FakePaymentGateway
  let crypto: MockProxy<UUIDGenerator>

  beforeAll(() => {
    email = 'any_email'
    creditCardToken = 'any_credit_card_token'
    price = 'any_price'
    tid = 'any_tid'
    status = 'approved'

    crypto = mock()
    crypto.uuid.mockReturnValue(tid)
  })

  beforeEach(() => {
    sut = new FakePaymentGateway(crypto)
  })

  it('should return tid and status when payment is processed', async () => {
    const result = await sut.makePayment({ email, price, creditCardToken })

    expect(result.tid).toBe(tid)
    expect(result.status).toBe(status)
  })
})
