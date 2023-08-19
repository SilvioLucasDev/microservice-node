import { PurchaseTicketUseCase } from '@/application/use-cases'
import { type UUIDGenerator, type Publish } from '@/application/contracts/adapters'
import { type SaveTicket, type GetEvent } from '@/application/contracts/repositories'
import { Ticket } from '@/domain/entities'
import { EventNotFoundError } from '@/application/errors'
import { TicketReserved } from '@/domain/event'

import { type MockProxy, mock } from 'jest-mock-extended'

jest.mock('@/domain/event/ticket-reserved')

describe('PurchaseTicketUseCase', () => {
  let sut: PurchaseTicketUseCase
  let eventRepository: MockProxy<GetEvent>
  let ticketRepository: MockProxy<SaveTicket>
  let crypto: MockProxy<UUIDGenerator>
  let ticket: jest.SpyInstance
  let queue: MockProxy<Publish>
  let eventId: string
  let email: string
  let creditCardToken: string

  beforeAll(() => {
    eventRepository = mock()
    eventRepository.get.mockResolvedValue({ id: 'any_event_id', price: 'any_price' })
    ticketRepository = mock()
    crypto = mock()
    crypto.uuid.mockReturnValue('any_ticket_id')
    ticket = jest.spyOn(Ticket, 'create')
    queue = mock()
    eventId = 'any_event_id'
    email = 'any_email'
    creditCardToken = 'any_credit_card_token'
  })

  beforeEach(() => {
    sut = new PurchaseTicketUseCase(eventRepository, ticketRepository, crypto, queue)
  })

  it('should call method get of EventRepository with correct value', async () => {
    await sut.execute({ eventId, email, creditCardToken })

    expect(eventRepository.get).toHaveBeenCalledWith({ id: 'any_event_id' })
    expect(eventRepository.get).toHaveBeenCalledTimes(1)
  })

  it('should throw EventNotFoundError if EventRepository returns undefined', async () => {
    eventRepository.get.mockResolvedValueOnce(undefined)

    const promise = sut.execute({ eventId, email, creditCardToken })

    await expect(promise).rejects.toThrow(new EventNotFoundError())
  })

  it('should calls Ticket with correct values', async () => {
    await sut.execute({ eventId, email, creditCardToken })

    expect(ticket).toHaveBeenCalledWith({ eventId, email }, crypto)
    expect(ticket).toHaveBeenCalledTimes(1)
  })

  it('should calls TicketRepository with instance of Ticket', async () => {
    await sut.execute({ eventId, email, creditCardToken })

    expect(ticketRepository.save).toHaveBeenCalledWith(expect.any(Ticket))
    expect(ticketRepository.save).toHaveBeenCalledTimes(1)
  })

  it('should calls TicketReserved with correct values', async () => {
    await sut.execute({ eventId, email, creditCardToken })

    expect(TicketReserved).toHaveBeenCalledWith(
      'any_ticket_id',
      'any_event_id',
      'any_credit_card_token',
      'any_price'
    )
    expect(TicketReserved).toHaveBeenCalledTimes(1)
  })

  it('should calls Queue with correct values', async () => {
    await sut.execute({ eventId, email, creditCardToken })

    expect(queue.publish).toHaveBeenCalledWith({ queueName: 'ticketReserved', data: expect.any(TicketReserved) })
    expect(queue.publish).toHaveBeenCalledTimes(1)
  })
})
