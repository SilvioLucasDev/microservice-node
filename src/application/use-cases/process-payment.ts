import { type MakePayment } from '@/application/contracts/gateways'
import { type UUIDGenerator } from '@/application/contracts/adapters'
import { Transaction } from '@/domain/entities'
import { type SaveTransaction } from '@/application/contracts/repositories'
import { PaymentApproved } from '@/domain/event'

export class ProcessPaymentUseCase {
  constructor (
    private readonly paymentGateway: MakePayment,
    private readonly crypto: UUIDGenerator,
    private readonly transactionRepository: SaveTransaction
  ) {}

  async execute ({ ticketId, email, eventId, price, creditCardToken }: Input): Promise<void> {
    await this.paymentGateway.makePayment({ email, creditCardToken, price })
    const transaction = Transaction.create({ eventId, ticketId, price }, this.crypto)
    await this.transactionRepository.save(transaction)
    // eslint-disable-next-line no-new
    new PaymentApproved(ticketId)
  }
}

type Input = {
  ticketId: string
  eventId: string
  email: string
  price: string
  creditCardToken: string
}
