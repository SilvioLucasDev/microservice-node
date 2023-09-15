export class PaymentTypeInvalidError extends Error {
  constructor () {
    super('Payment type invalid')
    this.name = 'PaymentTypeInvalidError'
  }
}

export class TransactionStatusInvalidError extends Error {
  constructor () {
    super('Transaction status invalid')
    this.name = 'TransactionStatusInvalidError'
  }
}
