import { type UUIDGenerator } from '@/domain/contracts/adapters'
import { Ticket } from '@/domain/entities'

import { mock, type MockProxy } from 'jest-mock-extended'

describe('Ticket', () => {
  let sut: Ticket
  let crypto: MockProxy<UUIDGenerator>

  beforeAll(() => {
    crypto = mock()
    crypto.uuid.mockReturnValue('any_ticket_id')
  })

  beforeEach(() => {
    sut = Ticket.create({ eventId: 'any_event_id', email: 'any_email' }, crypto)
  })

  it('should return instance of Ticket with correct values', () => {
    expect(sut).toStrictEqual(new Ticket(
      'any_ticket_id',
      'any_event_id',
      'any_email',
      'reserved'
    ))
  })
})
