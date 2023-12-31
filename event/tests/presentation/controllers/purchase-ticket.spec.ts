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
  let purchaseTicketUseCase: MockProxy<PurchaseTicketUseCase>

  beforeAll(() => {
    paymentType = 'credit_card'
    eventId = 'any_event_id'
    userId = 'any_user_id'
    cardId = 'any_card_id'
    installments = 3

    purchaseTicketUseCase = mock()
    purchaseTicketUseCase.execute.mockResolvedValue()
  })

  beforeEach(() => {
    sut = new PurchaseTicketController(purchaseTicketUseCase)
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
      new Required(cardId, 'cardId'),
      new RequiredString(cardId, 'cardId'),
      new Required(installments, 'installments'),
      new RequiredNumber(installments, 'installments')
    ])
    expect(httpResponse).toEqual({
      statusCode: 400,
      data: error
    })
  })

  it('should not validate the cardId and installments if the paymentType is billet', async () => {
    const error = new Error('validation_error')
    const ValidationCompositeSpy = jest.fn().mockImplementationOnce(() => ({
      validate: jest.fn().mockReturnValueOnce(error)
    }))
    jest.mocked(ValidationComposite).mockImplementationOnce(ValidationCompositeSpy)

    const httpResponse = await sut.handle({ paymentType: 'billet', eventId, userId, cardId, installments })

    expect(ValidationComposite).toHaveBeenCalledWith([
      new Required(paymentType = 'billet', 'paymentType'),
      new RequiredString(paymentType = 'billet', 'paymentType'),
      new Required(eventId, 'eventId'),
      new RequiredString(eventId, 'eventId'),
      new Required(userId, 'userId'),
      new RequiredString(userId, 'userId')
    ])
    expect(httpResponse).toEqual({
      statusCode: 400,
      data: error
    })
  })

  it('should call method execute of PurchaseTicketUseCase with correct params', async () => {
    await sut.handle({ paymentType, eventId, userId, cardId, installments })

    expect(purchaseTicketUseCase.execute).toHaveBeenCalledWith({ paymentType, eventId, userId, cardId, installments })
    expect(purchaseTicketUseCase.execute).toHaveBeenCalledTimes(1)
  })

  it('should return 500 if purchase ticket throws', async () => {
    const error = new Error('infra_error')
    purchaseTicketUseCase.execute.mockRejectedValueOnce(error)

    const httpResponse = await sut.handle({ paymentType, eventId, userId, cardId, installments })

    expect(httpResponse).toEqual({
      statusCode: 500,
      data: new ServerError(error)
    })
  })

  it('should return 400 if ticket purchase fails and error is EventNotFoundError', async () => {
    purchaseTicketUseCase.execute.mockRejectedValueOnce(new EventNotFoundError())

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
