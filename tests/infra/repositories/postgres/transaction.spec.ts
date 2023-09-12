import { prismaMock } from '@/tests/infra/repositories/postgres/mocks'
import { PgTransactionRepository } from '@/infra/repositories/postgres'
import { Transaction } from '@/domain/entities'
import { type UUIDGenerator } from '@/application/contracts/adapters'

import { type MockProxy, mock } from 'jest-mock-extended'

describe('PgTransactionRepository', () => {
  let id: string
  let ticketId: string
  let paymentType: string
  let cardId: string
  let total: number
  let installments: number
  let dueDate: Date
  let processorResponse: string
  let transactionId: string
  let status: string
  let createdAt: Date
  let updatedAt: Date

  let sut: PgTransactionRepository
  let crypto: MockProxy<UUIDGenerator>

  beforeEach(() => {
    id = 'any_id'
    ticketId = 'any_ticket_id'
    paymentType = 'credit_card'
    cardId = 'any_card_id'
    total = 300
    installments = 3
    dueDate = new Date()
    processorResponse = 'any_processor_response'
    transactionId = 'any_transaction_id'
    status = 'any_status'
    createdAt = new Date()
    updatedAt = new Date()

    sut = new PgTransactionRepository()
    crypto = mock()
  })

  afterAll(async () => {
    await prismaMock.$disconnect()
  })

  it('should return undefined an create new transaction', async () => {
    prismaMock.transaction.create.mockResolvedValue({
      id, ticket_id: ticketId, payment_type: paymentType, card_id: cardId, total, installments, due_date: dueDate, processor_response: processorResponse, transaction_id: transactionId, status, created_at: createdAt, updated_at: updatedAt
    })
    const transactionEntity = Transaction.create({ ticketId, paymentType, cardId, total, installments }, crypto)

    const result = sut.save(transactionEntity)

    await expect(result).resolves.toBeUndefined()
  })
})
