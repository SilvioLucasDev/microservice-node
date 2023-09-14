import { PaymentType, TransactionStatus } from '@/domain/enums'
import { PaymentTypeInvalidError, TransactionStatusInvalidError } from '@/domain/errors'
import { type UUIDGenerator } from '@/application/contracts/adapters'

export class Transaction {
  constructor (
    readonly id: string,
    readonly ticketId: string,
    readonly paymentType: string,
    readonly cardId: string | null,
    readonly total: number,
    readonly installments: number | null,
    readonly dueDate: Date,
    public processorResponse: string,
    public transactionId: string,
    public status: string
  ) { }

  public static create ({ ticketId, paymentType, cardId, total, installments }: InputCreate, crypto: UUIDGenerator): Transaction {
    Transaction.validatePaymentType(paymentType)
    const id = crypto.uuid()
    const dueDate = this.getDueDate()
    const initialStatus = TransactionStatus.STARTED
    return new Transaction(id, ticketId, paymentType, cardId, total, installments, dueDate, '', '', initialStatus)
  }

  public update ({ processorResponse, transactionId, status }: InputUpdate): void {
    Transaction.validateTransactionStatus(status)
    this.processorResponse = processorResponse
    this.transactionId = transactionId
    this.status = status
  }

  private static getDueDate (): Date {
    const dueDate = new Date()
    dueDate.setDate(dueDate.getDate() + 10)
    return dueDate
  }

  private static validatePaymentType (paymentType: string): void {
    const typeIsValid = Object.values(PaymentType).includes(paymentType)
    if (!typeIsValid) throw new PaymentTypeInvalidError()
  }

  private static validateTransactionStatus (transactionStatus: string): void {
    const statusIsValid = Object.values(TransactionStatus).includes(transactionStatus)
    if (!statusIsValid) throw new TransactionStatusInvalidError()
  }
}

type InputCreate = {
  ticketId: string
  paymentType: string
  cardId: string | null
  total: number
  installments: number | null
}

type InputUpdate = {
  processorResponse: string
  transactionId: string
  status: string
}
