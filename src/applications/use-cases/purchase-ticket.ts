import { type EventRepository } from '@/domain/contracts/repos'

export class PurchaseTicket {
  constructor (
    private readonly eventRepository: EventRepository
  ) {}

  async execute ({ eventId, email, creditCardToken }: Input): Promise<void> {
    await this.eventRepository.get({ id: eventId })
  }
}

type Input = {
  eventId: string
  email: string
  creditCardToken: string
}
