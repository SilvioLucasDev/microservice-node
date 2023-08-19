export class PaymentProcessed {
  constructor (
    private readonly ticketId: string,
    private readonly status: string
  ) {
  }
}
