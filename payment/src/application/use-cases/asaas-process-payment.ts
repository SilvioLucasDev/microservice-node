import { type Publish } from '@/application/contracts/adapters'
import { type UpdateStatusTransaction } from '@/application/contracts/repositories'
import { PaymentType, TransactionStatus } from '@/domain/enums'
import { PaymentProcessed } from '@/domain/event'

export class AsaasProcessPaymentUseCase {
  constructor (
    private readonly transactionRepository: UpdateStatusTransaction,
    private readonly queue: Publish
  ) {}

  async execute ({ status, externalReference, paymentType, url }: Input): Promise<Output> {
    const [transactionId, ticketId] = externalReference.split('&')
    const mappedStatus = this.statusMap(status)
    const mappedPaymentType = this.paymentTypeMap(paymentType)
    await this.transactionRepository.updateStatus({ id: transactionId, status: mappedStatus })
    const paymentProcessed = new PaymentProcessed(mappedPaymentType, ticketId, url, mappedStatus)
    await this.queue.publish({ queueName: 'paymentProcessed', data: paymentProcessed })
    return { statusTransaction: mappedStatus }
  }

  private statusMap (status: string): string {
    const statusMap: Record<string, string> = {
      AWAITING_RISK_ANALYSIS: TransactionStatus.PROCESSING,
      PENDING: TransactionStatus.PENDING,
      RECEIVED: TransactionStatus.APPROVED,
      CONFIRMED: TransactionStatus.APPROVED,
      REFUNDED: TransactionStatus.REFUNDED,
      REFUND_REQUESTED: TransactionStatus.REFUNDED,
      REFUND_IN_PROGRESS: TransactionStatus.REFUNDED,
      CHARGEBACK_REQUESTED: TransactionStatus.CHARGEBACK,
      CHARGEBACK_DISPUTE: TransactionStatus.CHARGEBACK,
      AWAITING_CHARGEBACK_REVERSAL: TransactionStatus.CHARGEBACK,
      DUNNING_REQUESTED: TransactionStatus.CHARGEBACK,
      DUNNING_RECEIVED: TransactionStatus.CHARGEBACK
    }
    return statusMap[status]
  }

  private paymentTypeMap (paymentType: string): string {
    const paymentTypeMap: Record<string, string> = {
      CREDIT_CARD: PaymentType.CREDIT_CARD,
      BOLETO: PaymentType.BILLET
    }
    return paymentTypeMap[paymentType]
  }
}

type Input = {
  status: string
  externalReference: string
  paymentType: string
  url: string
}

type Output = {
  statusTransaction: string
}
