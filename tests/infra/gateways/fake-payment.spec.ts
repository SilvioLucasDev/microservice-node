import { FakePaymentGateway } from '@/infra/gateways'

describe('ProcessPaymentUseCase', () => {
  let sut: FakePaymentGateway

  it('should return tid and status when payment is processed', async () => {
    sut = new FakePaymentGateway()

    const result = await sut.makePayment({ email: 'any_email', price: 'any_price', creditCardToken: 'any_credit_card_token' })

    expect(result.tid).toBe('123456789')
    expect(result.status).toBe('approved')
  })
})
