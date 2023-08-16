import { type SaveTicket, type GetEvent } from '@/domain/contracts/repos'
import { Ticket } from '@/domain/entities'
import { EventNotFound } from '@/domain/errors'
import { TicketReserved } from '@/domain/event'

export class PurchaseTicket {
  constructor (
    private readonly eventRepository: GetEvent,
    private readonly ticketRepository: SaveTicket
  ) {}

  async execute ({ eventId, email, creditCardToken }: Input): Promise<any> {
    const event = await this.eventRepository.get({ id: eventId })
    if (event === undefined) throw new EventNotFound()
    const ticket = Ticket.create({ eventId, email })
    await this.ticketRepository.save(ticket)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const ticketReserved = new TicketReserved(ticket.id, event.id, creditCardToken, event.price)
  }
}

type Input = {
  eventId: string
  email: string
  creditCardToken: string
}
