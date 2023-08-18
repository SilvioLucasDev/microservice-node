import { PurchaseTicketController } from '@/presentation/controllers'
import { type PurchaseTicketUseCase } from '@/application/use-cases'
import { ServerError } from '@/presentation/errors'
import { EventNotFoundError } from '@/application/errors'
import { RequiredString, ValidationComposite } from '@/presentation/validation'

import { mock, type MockProxy } from 'jest-mock-extended'

jest.mock('@/presentation/validation/composite')

describe('PurchaseTicketController', () => {
  let sut: PurchaseTicketController
  let PurchaseTicketUseCase: MockProxy<PurchaseTicketUseCase>
  let eventId: string
  let email: string
  let creditCardToken: string

  beforeAll(() => {
    PurchaseTicketUseCase = mock()
    PurchaseTicketUseCase.execute.mockResolvedValue({ ticketId: 'any_ticket_id' })
    eventId = 'any_event_id'
    email = 'any_email'
    creditCardToken = 'any_credit_card_token'
  })

  beforeEach(() => {
    sut = new PurchaseTicketController(PurchaseTicketUseCase)
  })

  it('should return 400 if validation fails', async () => {
    const error = new Error('validation_error')
    const ValidationCompositeSpy = jest.fn().mockImplementationOnce(() => ({
      validate: jest.fn().mockReturnValueOnce(error)
    }))
    jest.mocked(ValidationComposite).mockImplementationOnce(ValidationCompositeSpy)

    const httpResponse = await sut.handle({ eventId, email, creditCardToken })

    expect(ValidationComposite).toHaveBeenCalledWith([
      new RequiredString('any_event_id', 'eventId'),
      new RequiredString('any_email', 'email'),
      new RequiredString('any_credit_card_token', 'creditCardToken')
    ])
    expect(httpResponse).toEqual({
      statusCode: 400,
      data: error
    })
  })

  it('should call PurchaseTicketUseCase with correct params', async () => {
    await sut.handle({ eventId, email, creditCardToken })

    expect(PurchaseTicketUseCase.execute).toHaveBeenCalledWith({ eventId, email, creditCardToken })
  })

  it('should return 500 if purchase ticket throws', async () => {
    const error = new Error('infra_error')
    PurchaseTicketUseCase.execute.mockRejectedValueOnce(error)

    const httpResponse = await sut.handle({ eventId, email, creditCardToken })

    expect(httpResponse).toEqual({
      statusCode: 500,
      data: new ServerError(error)
    })
  })

  it('should return 400 if purchase ticket fails', async () => {
    PurchaseTicketUseCase.execute.mockRejectedValueOnce(new EventNotFoundError())

    const httpResponse = await sut.handle({ eventId, email, creditCardToken })

    expect(httpResponse).toEqual({
      statusCode: 400,
      data: new EventNotFoundError()
    })
  })

  it('should return 200 if purchase ticket succeeds', async () => {
    const httpResponse = await sut.handle({ eventId, email, creditCardToken })

    expect(httpResponse).toEqual({
      statusCode: 200,
      data: {
        ticketId: 'any_ticket_id'
      }
    })
  })
})
