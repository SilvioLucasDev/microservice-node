import { ProcessPaymentUseCase } from '@/application/use-cases'
import { type MakePayment } from '@/application/contracts/gateways'

import { mock, type MockProxy } from 'jest-mock-extended'

describe('ProcessPaymentUseCase', () => {
  let sut: ProcessPaymentUseCase
  let paymentGateway: MockProxy<MakePayment>
  let ticketId: string
  let email: string
  let eventId: string
  let price: string
  let creditCardToken: string

  beforeAll(() => {
    paymentGateway = mock()
    ticketId = 'any_ticket_id'
    email = 'any_email'
    eventId = 'any_event_id'
    price = 'any_price'
    creditCardToken = 'any_credit_card_token'
  })

  beforeEach(() => {
    sut = new ProcessPaymentUseCase(paymentGateway)
  })

  it('should call method makePayment of PaymentGateway with correct value', async () => {
    await sut.execute({ ticketId, email, eventId, price, creditCardToken })

    expect(paymentGateway.makePayment).toHaveBeenCalledWith({ email, creditCardToken, price })
    expect(paymentGateway.makePayment).toHaveBeenCalledTimes(1)
  })
})
