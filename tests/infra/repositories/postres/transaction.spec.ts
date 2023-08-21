import { prismaMock } from '@/tests/infra/repositories/postres/mocks'
import { PgTransactionRepository } from '@/infra/repositories/postgres'

describe('PgTransactionRepository', () => {
  let sut: PgTransactionRepository

  beforeEach(() => {
    sut = new PgTransactionRepository()
  })

  afterAll(async () => {
    await prismaMock.$disconnect()
  })

  it('should return undefined an create new transaction', async () => {
    const result = {
      id: 'any_id',
      ticket_id: 'any_ticket_id',
      event_id: 'any_event_id',
      tid: 'any_tid',
      price: 300,
      status: 'any_status'
    }
    prismaMock.transaction.create.mockResolvedValue(result)

    const input = { ...result, ticketId: 'any_ticket_id', eventId: 'any_event_id', price: '300' }
    const transaction = sut.save(input)

    await expect(transaction).resolves.toBeUndefined()
  })
})
