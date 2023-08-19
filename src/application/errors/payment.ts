export class UnprocessedPaymentError extends Error {
  constructor () {
    super('Unprocessed payment')
    this.name = 'UnprocessedPaymentError'
  }
}
