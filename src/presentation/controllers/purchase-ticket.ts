import { type PurchaseTicket } from '@/application/use-cases'

export class PurchaseTicketController {
  constructor (
    private readonly purchaseTicket: PurchaseTicket
  ) {}

  async handle (httpRequest: any): Promise<HttpResponse> {
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
