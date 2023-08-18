import { badRequest, serverError, type HttpResponse, ok } from '@/presentation/helpers'
import { type PurchaseTicket } from '@/application/use-cases'
import { EventNotFoundError } from '@/application/errors'
import { RequiredStringValidator, ValidationComposite } from '@/presentation/validation'

export class PurchaseTicketController {
  constructor (private readonly purchaseTicket: PurchaseTicket) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse<Model>> {
    try {
      const error = this.validate(httpRequest)
      if (error !== undefined) return badRequest(error)
      const result = await this.purchaseTicket.execute({ eventId: httpRequest.eventId, email: httpRequest.email, creditCardToken: httpRequest.creditCardToken })
      return ok({ ticketId: result.ticketId })
    } catch (error) {
      if (error instanceof EventNotFoundError) return badRequest(error)
      return serverError(error as Error)
    }
  }

  private validate ({ creditCardToken, email, eventId }: HttpRequest): Error | undefined {
    return new ValidationComposite([
      new RequiredStringValidator(eventId, 'eventId'),
      new RequiredStringValidator(email, 'email'),
      new RequiredStringValidator(creditCardToken, 'creditCardToken')
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
