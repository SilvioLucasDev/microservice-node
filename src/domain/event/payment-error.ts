export class PaymentError {
  constructor (
    private readonly ticketId: string,
    private readonly message: string,
    private readonly status = 'error'
  ) {}
}
