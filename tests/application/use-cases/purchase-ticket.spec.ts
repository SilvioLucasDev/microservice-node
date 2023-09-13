import { PurchaseTicketUseCase } from '@/application/use-cases'
import { type UUIDGenerator, type Publish } from '@/application/contracts/adapters'
import { type SaveTicket, type GetEvent } from '@/application/contracts/repositories'
import { EventNotFoundError } from '@/application/errors'
import { Ticket } from '@/domain/entities'
import { TicketReserved } from '@/domain/event'

import { type MockProxy, mock } from 'jest-mock-extended'

jest.mock('@/domain/event/ticket-reserved')

describe('PurchaseTicketUseCase', () => {
  let paymentType: string
  let eventId: string
  let userId: string
  let cardId: string
  let installments: number
  let ticketId: string
  let price: number

  let sut: PurchaseTicketUseCase
  let eventRepository: MockProxy<GetEvent>
  let ticketRepository: MockProxy<SaveTicket>
  let crypto: MockProxy<UUIDGenerator>
  let ticket: jest.SpyInstance
  let queue: MockProxy<Publish>

  beforeAll(() => {
    paymentType = 'any_payment_type'
    eventId = 'any_event_id'
    userId = 'any_user_id'
    cardId = 'any_card_id'
    installments = 3
    ticketId = 'any_ticket_id'
    price = 300

    ticket = jest.spyOn(Ticket, 'create')
    eventRepository = mock()
    eventRepository.get.mockResolvedValue({ id: eventId, price })
    ticketRepository = mock()
    crypto = mock()
    crypto.uuid.mockReturnValue(ticketId)
    queue = mock()
  })

  beforeEach(() => {
    sut = new PurchaseTicketUseCase(eventRepository, ticketRepository, crypto, queue)
  })

  it('should call method get of EventRepository with correct value', async () => {
    await sut.execute({ paymentType, eventId, userId, cardId, installments })

    expect(eventRepository.get).toHaveBeenCalledWith({ id: eventId })
    expect(eventRepository.get).toHaveBeenCalledTimes(1)
  })

  it('should rethrow EventNotFoundError if EventRepository return undefined', async () => {
    eventRepository.get.mockResolvedValueOnce(undefined)

    const promise = sut.execute({ paymentType, eventId, userId, cardId, installments })

    await expect(promise).rejects.toThrow(new EventNotFoundError())
  })

  it('should call method create of TicketEntity with correct values', async () => {
    await sut.execute({ paymentType, eventId, userId, cardId, installments })

    expect(ticket).toHaveBeenCalledWith({ eventId, userId }, crypto)
    expect(ticket).toHaveBeenCalledTimes(1)
  })

  it('should call method save of TicketRepository with instance of TicketEntity', async () => {
    await sut.execute({ paymentType, eventId, userId, cardId, installments })

    expect(ticketRepository.save).toHaveBeenCalledWith(expect.any(Ticket))
    expect(ticketRepository.save).toHaveBeenCalledTimes(1)
  })

  it('should call TicketReservedEvent with correct values', async () => {
    await sut.execute({ paymentType, eventId, userId, cardId, installments })

    expect(TicketReserved).toHaveBeenCalledWith(paymentType, price, ticketId, userId, cardId, installments)
    expect(TicketReserved).toHaveBeenCalledTimes(1)
  })

  it('should call QueueAdapter with correct values', async () => {
    await sut.execute({ paymentType, eventId, userId, cardId, installments })

    expect(queue.publish).toHaveBeenCalledWith({ queueName: 'ticketReserved', data: expect.any(TicketReserved) })
    expect(queue.publish).toHaveBeenCalledTimes(1)
  })
})
