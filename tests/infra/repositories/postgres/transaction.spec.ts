import { prismaMock } from '@/tests/infra/repositories/postgres/mocks'
import { PgTransactionRepository } from '@/infra/repositories/postgres'
import { Transaction } from '@/domain/entities'
import { type UUIDGenerator } from '@/application/contracts/adapters'

import { type MockProxy, mock } from 'jest-mock-extended'

describe('PgTransactionRepository', () => {
  let id: string
  let ticketId: string
  let eventId: string
  let tid: string
  let price: number
  let status: string
  let createdAt: Date
  let updatedAt: Date

  let sut: PgTransactionRepository
  let crypto: MockProxy<UUIDGenerator>

  beforeEach(() => {
    id = 'any_id'
    ticketId = 'any_ticket_id'
    eventId = 'any_event_id'
    tid = 'any_tid'
    price = 300
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
    prismaMock.transaction.create.mockResolvedValue({ id, ticket_id: ticketId, event_id: eventId, tid, price, status, created_at: createdAt, updated_at: updatedAt })
    const transactionEntity = Transaction.create({ eventId, ticketId, tid, price: price.toString(), status }, crypto)

    const result = sut.save(transactionEntity)

    await expect(result).resolves.toBeUndefined()
  })
})
