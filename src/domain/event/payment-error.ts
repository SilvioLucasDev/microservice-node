export class PaymentError {
  constructor (
    public readonly ticketId: string,
    public readonly message: string,
    public readonly status = 'error'
  ) {}
}
