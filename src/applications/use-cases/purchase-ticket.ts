import { type Publish } from '@/domain/contracts/adapters'
import { type SaveTicket, type GetEvent } from '@/domain/contracts/repos'
import { Ticket } from '@/domain/entities'
import { EventNotFound } from '@/domain/errors'
import { TicketReserved } from '@/domain/event'

export class PurchaseTicket {
  constructor (
    private readonly eventRepository: GetEvent,
    private readonly ticketRepository: SaveTicket,
    private readonly queue: Publish
  ) {}

  async execute ({ eventId, email, creditCardToken }: Input): Promise<any> {
    const event = await this.eventRepository.get({ id: eventId })
    if (event === undefined) throw new EventNotFound()
    const ticket = Ticket.create({ eventId, email })
    await this.ticketRepository.save(ticket)
    const ticketReserved = new TicketReserved(ticket.id, event.id, creditCardToken, event.price)
    await this.queue.publish({ queueName: 'ticketReserved', data: ticketReserved })
  }
}

type Input = {
  eventId: string
  email: string
  creditCardToken: string
}
