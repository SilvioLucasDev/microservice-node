import { type GetClient, type MakePayment, type UUIDGenerator } from '@/application/contracts/adapters'
import { Transaction } from '@/domain/entities'
import { type GetCard, type SaveTransaction } from '@/application/contracts/repositories'
import { CardNotFoundError } from '@/application/errors'
import { PaymentType } from '@/domain/enums'

export class ProcessPaymentUseCase {
  constructor (
    private readonly userMsUrl: string,
    private readonly cardRepository: GetCard,
    private readonly transactionRepository: SaveTransaction,
    private readonly httpClient: GetClient,
    private readonly paymentGateway: MakePayment,
    private readonly crypto: UUIDGenerator
  ) {}

  async execute ({ ticketId, eventName, price, paymentType, userId, cardId, installments }: Input): Promise<void> {
    const transaction = Transaction.create({ ticketId, paymentType, cardId, total: price, installments }, this.crypto)
    const user = await this.httpClient.get({ url: `${this.userMsUrl}/users/${userId}` })
    let card = null
    if (paymentType === PaymentType.CREDIT_CARD && cardId !== null) {
      card = await this.cardRepository.get({ id: cardId })
      if (card === undefined) throw new CardNotFoundError()
    }
    const payment = await this.paymentGateway.makePayment({ user, card, eventName, total: price, paymentType, installments, dueDate: transaction.dueDate, externalReference: `${transaction.id}&${ticketId}` })
    transaction.update({ processorResponse: payment.processorResponse, transactionId: payment.transactionId, status: payment.status })
    await this.transactionRepository.save(transaction)
  }
}

type Input = {
  paymentType: string
  eventName: string
  price: number
  ticketId: string
  userId: string
  cardId: string | null
  installments: number | null
}
