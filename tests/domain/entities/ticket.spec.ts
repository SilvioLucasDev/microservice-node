import { type UUIDGenerator } from '@/application/contracts/adapters'
import { Ticket } from '@/domain/entities'

import { mock, type MockProxy } from 'jest-mock-extended'

describe('TicketEntity', () => {
  let eventId: string
  let ticketId: string
  let email: string

  let sut: Ticket
  let crypto: MockProxy<UUIDGenerator>

  beforeAll(() => {
    eventId = 'any_event_id'
    ticketId = 'any_ticket_id'
    email = 'any_email'

    crypto = mock()
    crypto.uuid.mockReturnValue(ticketId)
  })

  beforeEach(() => {
    sut = Ticket.create({ eventId, email }, crypto)
  })

  it('should return instance of TicketEntity with correct values', () => {
    expect(sut).toStrictEqual(new Ticket(ticketId, eventId, email, 'reserved'))
  })

  it('should return instance of TicketEntity with status approved', () => {
    const statusTicket = Ticket.approve()

    expect(statusTicket).toBe('approved')
  })

  it('should return instance of TicketEntity with status approved', () => {
    const statusTicket = Ticket.cancel()

    expect(statusTicket).toBe('cancelled')
  })
})
