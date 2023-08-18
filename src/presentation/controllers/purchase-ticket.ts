import { badRequest, serverError, type HttpResponse, ok } from '@/presentation/helpers'
import { type PurchaseTicket } from '@/application/use-cases'
import { EventNotFoundError } from '@/application/errors'
import { RequiredFieldError } from '@/presentation/errors'

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
    if (eventId === undefined || eventId === null || eventId === '') return new RequiredFieldError('eventId')
    if (email === undefined || email === null || email === '') return new RequiredFieldError('email')
    if (creditCardToken === undefined || creditCardToken === null || creditCardToken === '') return new RequiredFieldError('creditCardToken')
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
