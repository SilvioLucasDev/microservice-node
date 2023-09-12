import { type MakePayment } from '@/application/contracts/gateways'
import { type Publish, type UUIDGenerator } from '@/application/contracts/adapters'
import { Transaction } from '@/domain/entities'
import { type GetCard, type GetUser, type SaveTransaction } from '@/application/contracts/repositories'
import { PaymentProcessed } from '@/domain/event'
import { CardNotFoundError } from '@/application/errors'
import { PaymentType } from '@/domain/enums'

export class ProcessPaymentUseCase {
  constructor (
    private readonly userRepository: GetUser,
    private readonly cardRepository: GetCard,
    private readonly transactionRepository: SaveTransaction,
    private readonly paymentGateway: MakePayment,
    private readonly crypto: UUIDGenerator,
    private readonly queue: Publish
  ) {}

  async execute ({ ticketId, price, paymentType, userId, cardId, installments }: Input): Promise<void> {
    const transaction = Transaction.create({ ticketId, paymentType, cardId, total: price, installments }, this.crypto)
    const user = await this.userRepository.get({ id: userId }) // TODO Isso deve ser uma requisição HTTP para o service de usuários.
    let card = null
    if (paymentType === PaymentType.CREDIT_CARD && cardId !== null) {
      card = await this.cardRepository.get({ id: cardId })
      if (card === undefined) throw new CardNotFoundError()
    }
    const payment = await this.paymentGateway.makePayment({ transactionId: transaction.id, user, card, total: price, paymentType, installments, dueDate: transaction.dueDate })
    transaction.update({ processorResponse: payment.processorResponse, transactionId: payment.transactionId, status: payment.status })
    await this.transactionRepository.save(transaction)
    const paymentProcessed = new PaymentProcessed(transaction.paymentType, ticketId, payment.url, payment.status)
    await this.queue.publish({ queueName: 'paymentProcessed', data: paymentProcessed })
  }
}

type Input = {
  paymentType: string
  price: number
  ticketId: string
  userId: string
  cardId: string | null
  installments: number | null
}
