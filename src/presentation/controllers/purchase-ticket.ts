import { type HttpResponse } from '@/presentation/helpers'
import { type PurchaseTicket } from '@/application/use-cases'
import { EventNotFoundError } from '@/application/errors'
import { ServerError } from '@/presentation/errors'

export class PurchaseTicketController {
  constructor (
    private readonly purchaseTicket: PurchaseTicket
  ) {}

  async handle (httpRequest: any): Promise<HttpResponse> {
    try {
      if (httpRequest.eventId === undefined || httpRequest.eventId === null || httpRequest.eventId === '' ||
      httpRequest.email === undefined || httpRequest.email === null || httpRequest.email === '' ||
      httpRequest.creditCardToken === undefined || httpRequest.creditCardToken === null || httpRequest.creditCardToken === ''
      ) {
        return {
          statusCode: 400,
          data: new Error('The fields in required')
        }
      }
      const result = await this.purchaseTicket.execute({ eventId: httpRequest.eventId, email: httpRequest.email, creditCardToken: httpRequest.creditCardToken })
      return {
        statusCode: 200,
        data: { ticketId: result.ticketId }
      }
    } catch (error) {
      if (error instanceof EventNotFoundError) {
        return {
          statusCode: 400,
          data: error
        }
      }
      return {
        statusCode: 500,
        data: new ServerError(error as Error)
      }
    }
  }
}
