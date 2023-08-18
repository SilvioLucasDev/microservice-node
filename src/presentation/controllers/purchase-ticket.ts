import { badRequest, serverError, type HttpResponse, ok } from '@/presentation/helpers'
import { type PurchaseTicketUseCase } from '@/application/use-cases'
import { EventNotFoundError } from '@/application/errors'
import { RequiredString, ValidationComposite } from '@/presentation/validation'
import { type Controller } from '@/presentation/controllers'

export class PurchaseTicketController implements Controller {
  constructor (private readonly purchaseTicketUseCase: PurchaseTicketUseCase) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse<Model>> {
    try {
      const error = this.validate(httpRequest)
      if (error !== undefined) return badRequest(error)
      const result = await this.purchaseTicketUseCase.execute({ eventId: httpRequest.eventId, email: httpRequest.email, creditCardToken: httpRequest.creditCardToken })
      return ok({ ticketId: result.ticketId })
    } catch (error) {
      if (error instanceof EventNotFoundError) return badRequest(error)
      return serverError(error as Error)
    }
  }

  private validate ({ creditCardToken, email, eventId }: HttpRequest): Error | undefined {
    return new ValidationComposite([
      new RequiredString(eventId, 'eventId'),
      new RequiredString(email, 'email'),
      new RequiredString(creditCardToken, 'creditCardToken')
    ]).validate()
  }
}
type HttpRequest = {
  eventId: string
  email: string
  creditCardToken: string
}

type Model = Error | {
  ticketId: string
}
