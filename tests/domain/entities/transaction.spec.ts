import { type UUIDGenerator } from '@/application/contracts/adapters'
import { Transaction } from '@/domain/entities'
import { PaymentTypeInvalidError, TransactionStatusInvalidError } from '@/domain/errors'

import { mock, type MockProxy } from 'jest-mock-extended'
import MockDate from 'mockdate'

describe('TransactionEntity', () => {
  let ticketId: string
  let paymentType: string
  let cardId: string
  let total: number
  let installments: number
  let dueDate: Date
  let transactionId: string
  let initialStatus: string
  let processorResponse: string
  let status: string

  let sut: Transaction
  let crypto: MockProxy<UUIDGenerator>

  function getDueDate (): Date {
    const dueDate = new Date()
    dueDate.setDate(dueDate.getDate() + 10)
    return dueDate
  }

  beforeAll(() => {
    MockDate.set(new Date())

    ticketId = 'any_ticket_id'
    paymentType = 'credit_card'
    cardId = 'any_card_id'
    total = 300
    installments = 3
    dueDate = getDueDate()
    transactionId = 'any_transaction_id'
    initialStatus = 'started'
    processorResponse = 'any_processor_response'
    status = 'approved'

    crypto = mock()
    crypto.uuid.mockReturnValue(transactionId)
  })

  afterAll(() => {
    MockDate.reset()
  })

  describe('create', () => {
    it('should create a Transaction instance with correct values', () => {
      sut = Transaction.create({ ticketId, paymentType, cardId, total, installments }, crypto)

      expect(sut).toStrictEqual(new Transaction(transactionId, ticketId, paymentType, cardId, total, installments, dueDate, '', '', initialStatus))
    })

    it('should throw PaymentTypeInvalidError for invalid paymentType', () => {
      expect(() => Transaction.create({ ticketId, paymentType: 'invalid_payment_type', cardId, total, installments }, crypto))
        .toThrow(PaymentTypeInvalidError)
    })
  })

  describe('update', () => {
    it('should update the Transaction instance with new values', () => {
      sut.update({ processorResponse, transactionId, status })

      expect(sut.processorResponse).toBe(processorResponse)
      expect(sut.transactionId).toBe(transactionId)
      expect(sut.status).toBe(status)
    })

    it('should throw TransactionStatusInvalidError for invalid status', () => {
      expect(() => sut.update({ processorResponse, transactionId, status: 'invalid_status' }))
        .toThrow(TransactionStatusInvalidError)
    })
  })
})
