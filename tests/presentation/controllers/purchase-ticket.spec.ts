import { PurchaseTicketController } from '@/presentation/controllers'
import { Required, RequiredNumber, RequiredString, ValidationComposite } from '@/presentation/validation'
import { ServerError } from '@/presentation/errors'
import { type PurchaseTicketUseCase } from '@/application/use-cases'
import { EventNotFoundError } from '@/application/errors'

import { mock, type MockProxy } from 'jest-mock-extended'

jest.mock('@/presentation/validation/composite')

describe('PurchaseTicketController', () => {
  let paymentType: string
  let eventId: string
  let userId: string
  let cardId: string
  let installments: number

  let sut: PurchaseTicketController
  let PurchaseTicketUseCase: MockProxy<PurchaseTicketUseCase>

  beforeAll(() => {
    paymentType = 'any_payment_type'
    eventId = 'any_event_id'
    userId = 'any_user_id'
    cardId = 'any_card_id'
    installments = 3

    PurchaseTicketUseCase = mock()
    PurchaseTicketUseCase.execute.mockResolvedValue()
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

    const httpResponse = await sut.handle({ paymentType, eventId, userId, cardId, installments })

    expect(ValidationComposite).toHaveBeenCalledWith([
      new Required(paymentType, 'paymentType'),
      new RequiredString(paymentType, 'paymentType'),
      new Required(eventId, 'eventId'),
      new RequiredString(eventId, 'eventId'),
      new Required(userId, 'userId'),
      new RequiredString(userId, 'userId'),
      new RequiredString(cardId, 'cardId'),
      new RequiredNumber(installments, 'installments')
    ])
    expect(httpResponse).toEqual({
      statusCode: 400,
      data: error
    })
  })

  it('should call method execute of PurchaseTicketUseCase with correct params', async () => {
    await sut.handle({ paymentType, eventId, userId, cardId, installments })

    expect(PurchaseTicketUseCase.execute).toHaveBeenCalledWith({ paymentType, eventId, userId, cardId, installments })
    expect(PurchaseTicketUseCase.execute).toHaveBeenCalledTimes(1)
  })

  it('should return 500 if purchase ticket throws', async () => {
    const error = new Error('infra_error')
    PurchaseTicketUseCase.execute.mockRejectedValueOnce(error)

    const httpResponse = await sut.handle({ paymentType, eventId, userId, cardId, installments })

    expect(httpResponse).toEqual({
      statusCode: 500,
      data: new ServerError(error)
    })
  })

  it('should return 400 if ticket purchase fails and error is EventNotFoundError', async () => {
    PurchaseTicketUseCase.execute.mockRejectedValueOnce(new EventNotFoundError())

    const httpResponse = await sut.handle({ paymentType, eventId, userId, cardId, installments })

    expect(httpResponse).toEqual({
      statusCode: 400,
      data: new EventNotFoundError()
    })
  })

  it('should return 202 if purchase ticket succeeds', async () => {
    const httpResponse = await sut.handle({ paymentType, eventId, userId, cardId, installments })

    expect(httpResponse).toEqual({
      statusCode: 202,
      data: undefined
    })
  })
})
