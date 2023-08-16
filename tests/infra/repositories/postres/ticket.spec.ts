import { prismaMock } from '@/tests/infra/repositories/postres/mocks'
import { PgTicketRepository } from '@/infra/repositories/postgres'

describe('PgTicketRepository', () => {
  let sut: PgTicketRepository

  beforeEach(() => {
    sut = new PgTicketRepository()
  })

  afterAll(async () => {
    await prismaMock.$disconnect()
  })

  it('should return undefined an create new ticket', async () => {
    const result = { id: 'any_id', event_id: 'any_event_id', email: 'any_email@hotmail.com', status: 'any_status' }
    prismaMock.ticket.create.mockResolvedValue(result)

    const input = { ...result, eventId: 'any_event_id' }
    const event = sut.save(input)

    await expect(event).resolves.toBeUndefined()
  })
})
