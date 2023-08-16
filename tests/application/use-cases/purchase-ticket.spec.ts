import { PurchaseTicket } from '@/applications/use-cases'
import { type EventRepository } from '@/domain/contracts/repos'

import { type MockProxy, mock } from 'jest-mock-extended'

describe('PurchaseTicket', () => {
  let sut: PurchaseTicket
  let eventRepository: MockProxy<EventRepository>

  beforeAll(() => {
    eventRepository = mock()
  })

  beforeEach(() => {
    sut = new PurchaseTicket(eventRepository)
  })

  it('should call EventRepository with correct value', async () => {
    await sut.execute({ eventId: 'any_event_id', email: 'any_email', creditCardToken: 'any_credit_card_token' })

    expect(eventRepository.get).toHaveBeenCalledWith({ id: 'any_event_id' })
    expect(eventRepository.get).toHaveBeenCalledTimes(1)
  })
})
