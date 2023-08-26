import { prismaMock } from '@/tests/infra/repositories/postres/mocks'
import { PgTicketRepository } from '@/infra/repositories/postgres'
import { Ticket } from '@/domain/entities'
import { type UUIDGenerator } from '@/application/contracts/adapters'

import { mock, type MockProxy } from 'jest-mock-extended'

describe('PgTicketRepository', () => {
  let sut: PgTicketRepository
  let crypto: MockProxy<UUIDGenerator>
  let id: string
  let eventId: string
  let email: string
  let status: string
  // let eventName: string
  let createdAt: Date
  let updatedAt: Date

  beforeAll(() => {
    crypto = mock()
    id = 'any_id'
    eventId = 'any_event_id'
    email = 'any_email@hotmail.com'
    status = 'any_status'
    // eventName = 'any_event_name'
    createdAt = new Date()
    updatedAt = new Date()
  })

  beforeEach(() => {
    sut = new PgTicketRepository()
  })

  afterAll(async () => {
    await prismaMock.$disconnect()
  })

  it('should return undefined an create new ticket', async () => {
    prismaMock.ticket.create.mockResolvedValue({ id, event_id: eventId, email, status, created_at: createdAt, updated_at: updatedAt })

    const ticket = Ticket.create({ eventId, email }, crypto)
    const result = sut.save(ticket)

    await expect(result).resolves.toBeUndefined()
  })

  it('should return undefined an update ticket', async () => {
    prismaMock.ticket.update.mockResolvedValue({ id, event_id: eventId, email, status, created_at: createdAt, updated_at: updatedAt })

    const result = sut.updateStatus({ id, status })

    await expect(result).resolves.toBeUndefined()
  })

  // it('should return email and name of event an select ticket', async () => {
  //   prismaMock.event.findFirst.mockResolvedValue({ id, name: 'any_name', description: 'any_desc', price: 300, capacity: 100, created_at: createdAt, updated_at: updatedAt })
  //   prismaMock.ticket.findFirst.mockResolvedValue({ id, event_id: eventId, email, status, created_at: createdAt, updated_at: updatedAt })

  //   const result = sut.findDetailsById({ id })

  //   await expect(result).resolves.toEqual({
  //     email,
  //     eventName
  //   })
  // })
})
