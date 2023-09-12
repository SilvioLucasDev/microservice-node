import { type UUIDGenerator } from '@/application/contracts/adapters'
import { Ticket } from '@/domain/entities'
import { TicketStatus } from '@/domain/enums'

import { mock, type MockProxy } from 'jest-mock-extended'

describe('TicketEntity', () => {
  let eventId: string
  let userId: string
  let ticketId: string
  let initialStatus: string

  let sut: Ticket | any
  let crypto: MockProxy<UUIDGenerator>

  beforeAll(() => {
    eventId = 'any_event_id'
    userId = 'any_user_id'
    ticketId = 'any_ticket_id'
    initialStatus = 'reserved'

    crypto = mock()
    crypto.uuid.mockReturnValue(ticketId)
  })

  describe('create', () => {
    it('should return instance of TicketEntity with correct values', () => {
      sut = Ticket.create({ eventId, userId }, crypto)

      expect(sut).toStrictEqual(new Ticket(ticketId, eventId, userId, initialStatus))
    })
  })

  describe('statusMap', () => {
    it('should return statuses correctly', () => {
      sut = Ticket.statusMap('approved')

      expect(sut).toBe(TicketStatus.APPROVED)
    })
  })
})
