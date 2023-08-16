import { PurchaseTicket } from '@/applications/use-cases'
import { type EventRepository } from '@/domain/contracts/repos'
import { Ticket } from '@/domain/entities'
import { EventNotFound } from '@/domain/errors'

import { type MockProxy, mock } from 'jest-mock-extended'

describe('PurchaseTicket', () => {
  let sut: PurchaseTicket
  let eventRepository: MockProxy<EventRepository>
  let ticketCreateMock: jest.SpyInstance

  beforeAll(() => {
    eventRepository = mock()
    eventRepository.get.mockResolvedValue({ id: 'any_id', price: 'any_price' })

    ticketCreateMock = jest.spyOn(Ticket, 'create')
  })

  beforeEach(() => {
    sut = new PurchaseTicket(eventRepository)
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

    expect(ticketCreateMock).toHaveBeenCalledWith({ eventId: 'any_event_id', email: 'any_email' })
    expect(ticketCreateMock).toHaveBeenCalledTimes(1)
  })
})
