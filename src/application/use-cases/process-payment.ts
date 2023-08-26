import { type MakePayment } from '@/application/contracts/gateways'
import { type Publish, type UUIDGenerator } from '@/application/contracts/adapters'
import { Transaction } from '@/domain/entities'
import { type SaveTransaction } from '@/application/contracts/repositories'
import { PaymentProcessed } from '@/domain/event'

export class ProcessPaymentUseCase {
  constructor (
    private readonly paymentGateway: MakePayment,
    private readonly crypto: UUIDGenerator,
    private readonly transactionRepository: SaveTransaction,
    private readonly queue: Publish
  ) {}

  async execute ({ ticketId, email, eventId, price, creditCardToken }: Input): Promise<void> {
    const payment = await this.paymentGateway.makePayment({ email, creditCardToken, price })
    const transaction = Transaction.create({ eventId, ticketId, tid: payment.tid, price, status: payment.status }, this.crypto)
    await this.transactionRepository.save(transaction)
    const paymentProcessed = new PaymentProcessed(ticketId, email, payment.status)
    await this.queue.publish({ queueName: 'paymentProcessed', data: paymentProcessed })
  }
}

type Input = {
  ticketId: string
  eventId: string
  email: string
  price: string
  creditCardToken: string
}
