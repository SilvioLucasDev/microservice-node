import { type PurchaseTicket } from '@/application/use-cases'

export class PurchaseTicketController {
  constructor (
    private readonly purchaseTicket: PurchaseTicket
  ) {}

  async handle (httpRequest: any): Promise<HttpResponse> {
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
      statusCode: 400,
      data: result
    }
  }
}

type HttpResponse = {
  statusCode: number
  data: any
}
