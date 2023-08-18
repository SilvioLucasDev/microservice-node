import { badRequest, serverError, type HttpResponse, ok } from '@/presentation/helpers'
import { type PurchaseTicket } from '@/application/use-cases'
import { EventNotFoundError } from '@/application/errors'

export class PurchaseTicketController {
  constructor (
    private readonly purchaseTicket: PurchaseTicket
  ) {}

  async handle (httpRequest: httpRequest): Promise<HttpResponse> {
    try {
      if (httpRequest.eventId === undefined || httpRequest.eventId === null || httpRequest.eventId === '' ||
      httpRequest.email === undefined || httpRequest.email === null || httpRequest.email === '' ||
      httpRequest.creditCardToken === undefined || httpRequest.creditCardToken === null || httpRequest.creditCardToken === ''
      ) {
        return badRequest(new Error('The fields in required'))
      }
      const result = await this.purchaseTicket.execute({ eventId: httpRequest.eventId, email: httpRequest.email, creditCardToken: httpRequest.creditCardToken })
      return ok({ ticketId: result.ticketId })
    } catch (error) {
      if (error instanceof EventNotFoundError) return badRequest(error)
      return serverError(error as Error)
    }
  }
}

type httpRequest = {
  eventId: string | null | undefined
  email: string | null | undefined
  creditCardToken: string | null | undefined
}
