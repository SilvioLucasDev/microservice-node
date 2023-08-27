import { PurchaseTicketUseCase } from '@/application/use-cases'
import { type UUIDGenerator, type Publish } from '@/application/contracts/adapters'
import { type SaveTicket, type GetEvent } from '@/application/contracts/repositories'
import { EventNotFoundError } from '@/application/errors'
import { Ticket } from '@/domain/entities'
import { TicketReserved } from '@/domain/event'

import { type MockProxy, mock } from 'jest-mock-extended'

jest.mock('@/domain/event/ticket-reserved')

describe('PurchaseTicketUseCase', () => {
  let eventId: string
  let ticketId: string
  let price: string
  let email: string
  let creditCardToken: string

  let sut: PurchaseTicketUseCase
  let eventRepository: MockProxy<GetEvent>
  let ticketRepository: MockProxy<SaveTicket>
  let crypto: MockProxy<UUIDGenerator>
  let ticket: jest.SpyInstance
  let queue: MockProxy<Publish>

  beforeAll(() => {
    eventId = 'any_event_id'
    ticketId = 'any_ticket_id'
    price = 'any_price'
    email = 'any_email'
    creditCardToken = 'any_credit_card_token'

    eventRepository = mock()
    eventRepository.get.mockResolvedValue({ id: eventId, price })
    ticketRepository = mock()
    crypto = mock()
    crypto.uuid.mockReturnValue(ticketId)
    ticket = jest.spyOn(Ticket, 'create')
    queue = mock()
  })

  beforeEach(() => {
    sut = new PurchaseTicketUseCase(eventRepository, ticketRepository, crypto, queue)
  })

  it('should call method get of EventRepository with correct value', async () => {
    await sut.execute({ eventId, email, creditCardToken })

    expect(eventRepository.get).toHaveBeenCalledWith({ id: eventId })
    expect(eventRepository.get).toHaveBeenCalledTimes(1)
  })

  it('should throw EventNotFoundError if EventRepository return undefined', async () => {
    eventRepository.get.mockResolvedValueOnce(undefined)

    const promise = sut.execute({ eventId, email, creditCardToken })

    await expect(promise).rejects.toThrow(new EventNotFoundError())
  })

  it('should call TicketEntity with correct values', async () => {
    await sut.execute({ eventId, email, creditCardToken })

    expect(ticket).toHaveBeenCalledWith({ eventId, email }, crypto)
    expect(ticket).toHaveBeenCalledTimes(1)
  })

  it('should call TicketRepository with instance of TicketEntity', async () => {
    await sut.execute({ eventId, email, creditCardToken })

    expect(ticketRepository.save).toHaveBeenCalledWith(expect.any(Ticket))
    expect(ticketRepository.save).toHaveBeenCalledTimes(1)
  })

  it('should call TicketReserved with correct values', async () => {
    await sut.execute({ eventId, email, creditCardToken })

    expect(TicketReserved).toHaveBeenCalledWith(ticketId, eventId, creditCardToken, price, email)
    expect(TicketReserved).toHaveBeenCalledTimes(1)
  })

  it('should call QueueAdapter with correct values', async () => {
    await sut.execute({ eventId, email, creditCardToken })

    expect(queue.publish).toHaveBeenCalledWith({ queueName: 'ticketReserved', data: expect.any(TicketReserved) })
    expect(queue.publish).toHaveBeenCalledTimes(1)
  })
})
