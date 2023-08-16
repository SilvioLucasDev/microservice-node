import { PurchaseTicket } from '@/applications/use-cases'
import { type Publish } from '@/domain/contracts/adapters'
import { type SaveTicket, type GetEvent } from '@/domain/contracts/repos'
import { Ticket } from '@/domain/entities'
import { EventNotFound } from '@/domain/errors'
import { TicketReserved } from '@/domain/event'

import { type MockProxy, mock } from 'jest-mock-extended'

jest.mock('@/domain/event/ticket-reserved')

describe('PurchaseTicket', () => {
  let sut: PurchaseTicket
  let eventRepository: MockProxy<GetEvent>
  let ticketRepository: MockProxy<SaveTicket>
  let ticket: jest.SpyInstance
  let queue: MockProxy<Publish>

  beforeAll(() => {
    eventRepository = mock()
    eventRepository.get.mockResolvedValue({ id: 'any_event_id', price: 'any_price' })
    ticketRepository = mock()
    ticket = jest.spyOn(Ticket, 'create')
    ticket.mockReturnValue(new Ticket(
      'any_ticket_id',
      'any_event_id',
      'any_email',
      'reserved'
    ))
    queue = mock()
  })

  beforeEach(() => {
    sut = new PurchaseTicket(eventRepository, ticketRepository, queue)
  })

  it('should call EventRepository with correct value', async () => {
    await sut.execute({ eventId: 'any_event_id', email: 'any_email', creditCardToken: 'any_credit_card_token' })

    expect(eventRepository.get).toHaveBeenCalledWith({ id: 'any_event_id' })
    expect(eventRepository.get).toHaveBeenCalledTimes(1)
  })

  it('should throw EventNotFound if EventRepository returns undefined', async () => {
    eventRepository.get.mockResolvedValueOnce(undefined)

    const promise = sut.execute({ eventId: 'any_event_id', email: 'any_email', creditCardToken: 'any_credit_card_token' })

    await expect(promise).rejects.toThrow(new EventNotFound())
  })

  it('should call Ticket with correct values', async () => {
    await sut.execute({ eventId: 'any_event_id', email: 'any_email', creditCardToken: 'any_credit_card_token' })

    expect(ticket).toHaveBeenCalledWith({ eventId: 'any_event_id', email: 'any_email' })
    expect(ticket).toHaveBeenCalledTimes(1)
  })

  it('should call TicketRepository with Ticket', async () => {
    await sut.execute({ eventId: 'any_event_id', email: 'any_email', creditCardToken: 'any_credit_card_token' })

    expect(ticketRepository.save).toHaveBeenCalledWith(expect.any(Ticket))
    expect(ticketRepository.save).toHaveBeenCalledTimes(1)
  })

  it('should call TicketReserved with correct values', async () => {
    await sut.execute({ eventId: 'any_event_id', email: 'any_email', creditCardToken: 'any_credit_card_token' })

    expect(TicketReserved).toHaveBeenCalledWith(
      'any_ticket_id',
      'any_event_id',
      'any_credit_card_token',
      'any_price'
    )
    expect(TicketReserved).toHaveBeenCalledTimes(1)
  })

  it('should call Queue with correct values', async () => {
    await sut.execute({ eventId: 'any_event_id', email: 'any_email', creditCardToken: 'any_credit_card_token' })

    expect(queue.publish).toHaveBeenCalledWith({ queueName: 'ticketReserved', data: jest.mocked(TicketReserved).mock.instances[0] })
    expect(queue.publish).toHaveBeenCalledTimes(1)
  })
})
