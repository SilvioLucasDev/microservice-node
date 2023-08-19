import { ProcessPaymentUseCase } from '@/application/use-cases'
import { type MakePayment } from '@/application/contracts/gateways'
import { UnprocessedPaymentError } from '@/application/errors/payment'
import { type UUIDGenerator } from '@/application/contracts/adapters'

import { mock, type MockProxy } from 'jest-mock-extended'

describe('ProcessPaymentUseCase', () => {
  let sut: ProcessPaymentUseCase
  let paymentGateway: MockProxy<MakePayment>
  let crypto: MockProxy<UUIDGenerator>
  let ticketId: string
  let email: string
  let eventId: string
  let price: string
  let creditCardToken: string

  beforeAll(() => {
    paymentGateway = mock()
    paymentGateway.makePayment.mockResolvedValue({ tid: '12344', status: 'approved' })
    crypto = mock()
    crypto.uuid.mockReturnValue('any_ticket_id')
    ticketId = 'any_ticket_id'
    email = 'any_email'
    eventId = 'any_event_id'
    price = 'any_price'
    creditCardToken = 'any_credit_card_token'
  })

  beforeEach(() => {
    sut = new ProcessPaymentUseCase(paymentGateway, crypto)
  })

  it('should call method makePayment of PaymentGateway with correct values', async () => {
    await sut.execute({ ticketId, email, eventId, price, creditCardToken })

    expect(paymentGateway.makePayment).toHaveBeenCalledWith({ email, creditCardToken, price })
    expect(paymentGateway.makePayment).toHaveBeenCalledTimes(1)
  })

  it('should throw UnprocessedPaymentError if PaymentGateway returns status diff approved', async () => {
    paymentGateway.makePayment.mockResolvedValueOnce({ tid: '12344', status: 'rejected' })

    const promise = sut.execute({ ticketId, email, eventId, price, creditCardToken })

    await expect(promise).rejects.toThrow(new UnprocessedPaymentError())
  })
})
