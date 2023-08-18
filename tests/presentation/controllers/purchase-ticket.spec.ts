import { PurchaseTicketController } from '@/presentation/controllers'
import { type PurchaseTicket } from '@/application/use-cases'
import { ServerError } from '@/application/errors'
import { EventNotFoundError } from '@/domain/errors'

import { mock, type MockProxy } from 'jest-mock-extended'

describe('PurchaseTicketController', () => {
  let sut: PurchaseTicketController
  let purchaseTicket: MockProxy<PurchaseTicket>

  beforeAll(() => {
    purchaseTicket = mock()
    purchaseTicket.execute.mockResolvedValue({ ticketId: 'any_ticket_id' })
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

  it('should return 500 if purchase ticket throws', async () => {
    const error = new Error('infra_error')
    purchaseTicket.execute.mockRejectedValueOnce(error)

    const httpResponse = await sut.handle({ eventId: 'any_event_id', email: 'any_email', creditCardToken: 'any_credit_card_token' })

    expect(httpResponse).toEqual({
      statusCode: 500,
      data: new ServerError(error)
    })
  })

  it('should return 400 if purchase ticket fails', async () => {
    purchaseTicket.execute.mockRejectedValueOnce(new EventNotFoundError())

    const httpResponse = await sut.handle({ eventId: 'any_event_id', email: 'any_email', creditCardToken: 'any_credit_card_token' })

    expect(httpResponse).toEqual({
      statusCode: 400,
      data: new EventNotFoundError()
    })
  })

  it('should return 200 if purchase ticket succeeds', async () => {
    const httpResponse = await sut.handle({ eventId: 'any_event_id', email: 'any_email', creditCardToken: 'any_credit_card_token' })

    expect(httpResponse).toEqual({
      statusCode: 200,
      data: {
        ticketId: 'any_ticket_id'
      }
    })
  })
})
