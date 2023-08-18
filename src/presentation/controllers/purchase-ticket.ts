import { badRequest, serverError, type HttpResponse, ok } from '@/presentation/helpers'
import { type PurchaseTicket } from '@/application/use-cases'
import { EventNotFoundError } from '@/application/errors'
import { RequiredFieldError } from '@/presentation/errors'

export class PurchaseTicketController {
  constructor (private readonly purchaseTicket: PurchaseTicket) {}

  async handle ({ eventId, email, creditCardToken }: httpRequest): Promise<HttpResponse<Model>> {
    try {
      if (eventId === undefined || eventId === null || eventId === '') return badRequest(new RequiredFieldError('eventId'))
      if (email === undefined || email === null || email === '') return badRequest(new RequiredFieldError('email'))
      if (creditCardToken === undefined || creditCardToken === null || creditCardToken === '') return badRequest(new RequiredFieldError('creditCardToken'))
      const result = await this.purchaseTicket.execute({ eventId, email, creditCardToken })
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

type Model = Error | {
  ticketId: string
}
