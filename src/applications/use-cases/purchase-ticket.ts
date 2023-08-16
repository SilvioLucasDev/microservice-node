import { type EventRepository } from '@/domain/contracts/repos'
import { EventNotFound } from '@/domain/errors'

export class PurchaseTicket {
  constructor (
    private readonly eventRepository: EventRepository
  ) {}

  async execute ({ eventId, email, creditCardToken }: Input): Promise<any> {
    const event = await this.eventRepository.get({ id: eventId })
    if (event === undefined) {
      throw new EventNotFound()
    }
  }
}

type Input = {
  eventId: string
  email: string
  creditCardToken: string
}
