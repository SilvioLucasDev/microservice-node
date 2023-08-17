import { type PurchaseTicket } from '@/application/use-cases'

export class PurchaseTicketController {
  constructor (
    private readonly purchaseTicket: PurchaseTicket
  ) {}

  async handle (httpRequest: any): Promise<void> {
    await this.purchaseTicket.execute({ eventId: httpRequest.eventId, email: httpRequest.email, creditCardToken: httpRequest.creditCardToken })
  }
}
