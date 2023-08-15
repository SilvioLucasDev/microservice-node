import { type MockProxy, mock } from 'jest-mock-extended'

class PurchaseTicket {
  constructor (
    private readonly eventRepository: EventRepository
  ) {}

  async execute ({ eventId, email, creditCardToken }: Input): Promise<void> {
    await this.eventRepository.get(eventId)
  }
}

type Input = {
  eventId: string
  email: string
  creditCardToken: string
}

interface EventRepository {
  get: (id: string) => Promise<Output>
}

type Output = {
  id: string
  price: string
}

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

    expect(eventRepository.get).toHaveBeenCalledWith('any_event_id')
  })
})
