import { prismaMock } from '@/tests/infra/repositories/postgres/mocks'
import { PgTicketRepository } from '@/infra/repositories/postgres'
import { Ticket } from '@/domain/entities'
import { type UUIDGenerator } from '@/application/contracts/adapters'

import { type Prisma, type Ticket as TicketPrisma } from '@prisma/client'
import { mock, type MockProxy } from 'jest-mock-extended'

describe('PgTicketRepository', () => {
  let id: string
  let eventId: string
  let userId: string
  let status: string
  let eventName: string
  let createdAt: Date
  let updatedAt: Date

  let sut: PgTicketRepository
  let crypto: MockProxy<UUIDGenerator>

  beforeAll(() => {
    id = 'any_id'
    eventId = 'any_event_id'
    userId = 'any_user_id'
    status = 'any_status'
    eventName = 'any_event_name'
    createdAt = new Date()
    updatedAt = new Date()

    crypto = mock()
  })

  beforeEach(() => {
    sut = new PgTicketRepository()
  })

  afterAll(async () => {
    await prismaMock.$disconnect()
  })

  it('should return undefined an create new ticket', async () => {
    prismaMock.ticket.create.mockResolvedValue({ id, event_id: eventId, user_id: userId, status, created_at: createdAt, updated_at: updatedAt })
    const ticketEntity = Ticket.create({ eventId, userId }, crypto)

    const result = sut.save(ticketEntity)

    await expect(result).resolves.toBeUndefined()
  })

  it('should return undefined an update ticket', async () => {
    prismaMock.ticket.update.mockResolvedValue({ id, event_id: eventId, user_id: userId, status, created_at: createdAt, updated_at: updatedAt })

    const result = sut.updateStatus({ id, status })

    await expect(result).resolves.toBeUndefined()
  })

  it('should return the name and userId of the ticket event entered', async () => {
    prismaMock.ticket.findFirst.mockResolvedValue({ user_id: userId, event: { name: eventName } } as unknown as Prisma.Prisma__TicketClient<TicketPrisma>)

    const result = sut.findDetailsById({ id })

    await expect(result).resolves.toEqual({ eventName, userId })
  })
})
