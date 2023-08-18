import { type PurchaseTicket } from '@/application/use-cases'
import { EventNotFoundError } from '@/domain/errors'
import { ServerError } from '@/tests/presentation/controllers/purchase-ticket.spec'

export class PurchaseTicketController {
  constructor (
    private readonly purchaseTicket: PurchaseTicket
  ) {}

  async handle (httpRequest: any): Promise<any> {
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

      await this.purchaseTicket.execute({ eventId: httpRequest.eventId, email: httpRequest.email, creditCardToken: httpRequest.creditCardToken })
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
