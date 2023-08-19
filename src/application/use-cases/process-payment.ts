import { type MakePayment } from '@/application/contracts/gateways'
import { UnprocessedPaymentError } from '@/application/errors/payment'
import { type UUIDGenerator } from '@/application/contracts/adapters'
import { Transaction } from '@/domain/entities'

export class ProcessPaymentUseCase {
  constructor (
    private readonly paymentGateway: MakePayment,
    private readonly crypto: UUIDGenerator
  ) {}

  async execute ({ ticketId, email, eventId, price, creditCardToken }: Input): Promise<void> {
    const payment = await this.paymentGateway.makePayment({ email, creditCardToken, price })
    if (payment.status !== 'approved') throw new UnprocessedPaymentError()
    Transaction.create({ eventId, ticketId, price }, this.crypto)
  }
}

type Input = {
  ticketId: string
  eventId: string
  email: string
  price: string
  creditCardToken: string
}
