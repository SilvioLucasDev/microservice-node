import { PurchaseTicketController } from '@/presentation/controllers'
import { type PurchaseTicket } from '@/application/use-cases'

import { mock, type MockProxy } from 'jest-mock-extended'
import { EventNotFoundError } from '@/domain/errors'

describe('PurchaseTicketController', () => {
  let sut: PurchaseTicketController
  let purchaseTicket: MockProxy<PurchaseTicket>

  beforeAll(() => {
    purchaseTicket = mock()
  })

  beforeEach(() => {
    sut = new PurchaseTicketController(purchaseTicket)
  })

  it('should return 400 if params is missing', async () => {
    const httpResponse = await sut.handle({})

    expect(httpResponse).toEqual({
      statusCode: 400,
      data: new Error('The fields in required')
    })
  })

  it('should call PurchaseTicket with correct params', async () => {
    await sut.handle({ eventId: 'any_event_id', email: 'any_email', creditCardToken: 'any_credit_card_token' })

    expect(purchaseTicket.execute).toHaveBeenCalledWith({ eventId: 'any_event_id', email: 'any_email', creditCardToken: 'any_credit_card_token' })
  })

  it('should return 400 if purchase ticket fails', async () => {
    purchaseTicket.execute.mockResolvedValueOnce(new EventNotFoundError())
    const httpResponse = await sut.handle({ eventId: 'any_event_id', email: 'any_email', creditCardToken: 'any_credit_card_token' })

    expect(httpResponse).toEqual({
      statusCode: 400,
      data: new EventNotFoundError()
    })
  })
})
