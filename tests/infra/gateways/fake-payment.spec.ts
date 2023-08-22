import { type UUIDGenerator } from '@/application/contracts/adapters'
import { FakePaymentGateway } from '@/infra/gateways'
import { mock, type MockProxy } from 'jest-mock-extended'

describe('ProcessPaymentUseCase', () => {
  let sut: FakePaymentGateway
  let crypto: MockProxy<UUIDGenerator>

  beforeAll(() => {
    crypto = mock()
    crypto.uuid.mockReturnValue('any_ticket_id')
  })

  it('should return tid and status when payment is processed', async () => {
    crypto.uuid.mockReturnValue('any_ticket_id')
    sut = new FakePaymentGateway(crypto)

    const result = await sut.makePayment({ email: 'any_email', price: 'any_price', creditCardToken: 'any_credit_card_token' })

    expect(result.tid).toBe('any_ticket_id')
    expect(result.status).toBe('approved')
  })
})
