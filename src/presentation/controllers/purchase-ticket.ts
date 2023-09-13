import { badRequest, serverError, type HttpResponse, accepted } from '@/presentation/helpers'
import { Required, RequiredNumber, RequiredString, ValidationComposite } from '@/presentation/validation'
import { type Controller } from '@/presentation/controllers'
import { type PurchaseTicketUseCase } from '@/application/use-cases'
import { EventNotFoundError } from '@/application/errors'

export class PurchaseTicketController implements Controller {
  constructor (private readonly purchaseTicketUseCase: PurchaseTicketUseCase) { }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse<Model>> {
    try {
      const error = this.validate(httpRequest)
      if (error !== undefined) return badRequest(error)
      const { paymentType, eventId, userId, cardId, installments } = httpRequest
      await this.purchaseTicketUseCase.execute({ paymentType, eventId, userId, cardId, installments })
      return accepted()
    } catch (error) {
      if (error instanceof EventNotFoundError) return badRequest(error)
      return serverError(error as Error)
    }
  }

  private validate ({ paymentType, installments, eventId, userId, cardId }: HttpRequest): Model {
    const validators = [
      new Required(paymentType, 'paymentType'),
      new RequiredString(paymentType, 'paymentType'),
      new Required(eventId, 'eventId'),
      new RequiredString(eventId, 'eventId'),
      new Required(userId, 'userId'),
      new RequiredString(userId, 'userId')
    ]
    if (paymentType === 'credit_card') {
      validators.push(
        new Required(cardId, 'cardId'),
        new RequiredString(cardId, 'cardId'),
        new Required(installments, 'installments'),
        new RequiredNumber(installments, 'installments')
      )
    }
    return new ValidationComposite(validators).validate()
  }
}
type HttpRequest = {
  paymentType: string
  eventId: string
  userId: string
  cardId: string | null
  installments: number | null
}

type Model = Error | undefined
