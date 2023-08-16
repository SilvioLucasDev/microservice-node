import { type EventRepository } from '@/domain/contracts/repos'
import { Ticket } from '@/domain/entities'
import { EventNotFound } from '@/domain/errors'

export class PurchaseTicket {
  constructor (
    private readonly eventRepository: EventRepository
  ) {}

  async execute ({ eventId, email, creditCardToken }: Input): Promise<any> {
    const event = await this.eventRepository.get({ id: eventId })
    if (event === undefined) throw new EventNotFound()
    Ticket.create({ eventId, email })
  }
}

type Input = {
  eventId: string
  email: string
  creditCardToken: string
}
