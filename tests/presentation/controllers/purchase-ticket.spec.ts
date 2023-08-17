import { PurchaseTicketController } from '@/presentation/controllers'
import { type PurchaseTicket } from '@/application/use-cases'

import { mock, type MockProxy } from 'jest-mock-extended'

describe('PurchaseTicketController', () => {
  let sut: PurchaseTicketController
  let purchaseTicket: MockProxy<PurchaseTicket>

  beforeAll(() => {
    purchaseTicket = mock()
  })

  beforeEach(() => {
    sut = new PurchaseTicketController(purchaseTicket)
  })

  it('should call PurchaseTicket with correct params', async () => {
    await sut.handle({ eventId: 'any_event_id', email: 'any_email', creditCardToken: 'any_credit_card_token' })

    expect(purchaseTicket.execute).toHaveBeenCalledWith({ eventId: 'any_event_id', email: 'any_email', creditCardToken: 'any_credit_card_token' })
  })
})
