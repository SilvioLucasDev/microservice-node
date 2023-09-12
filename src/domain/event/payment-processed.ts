export class PaymentProcessed {
  constructor (
    private readonly paymentType: string,
    private readonly ticketId: string,
    private readonly url: string,
    private readonly status: string
  ) {}
}
