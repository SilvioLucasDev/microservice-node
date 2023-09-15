import { badRequest, serverError, type HttpResponse, accepted } from '@/presentation/helpers'
import { ValidationComposite, ValidationBuilder as Builder } from '@/presentation/validation'
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

  private validate ({ paymentType, installments, eventId, userId, cardId }: HttpRequest): Error | undefined {
    const validators = [
      ...Builder.of({ value: paymentType, fieldName: 'paymentType' }).required().requiredString().build(),
      ...Builder.of({ value: eventId, fieldName: 'eventId' }).required().requiredString().build(),
      ...Builder.of({ value: userId, fieldName: 'userId' }).required().requiredString().build()
    ]
    if (paymentType === 'credit_card') {
      validators.push(
        ...Builder.of({ value: cardId, fieldName: 'cardId' }).required().requiredString().build(),
        ...Builder.of({ value: installments, fieldName: 'installments' }).required().requiredNumber().build()
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
