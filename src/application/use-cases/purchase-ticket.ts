import { type UUIDGenerator, type Publish } from '@/application/contracts/adapters'
import { type SaveTicket, type GetEvent } from '@/application/contracts/repositories'
import { EventNotFoundError } from '@/application/errors'
import { Ticket } from '@/domain/entities'
import { TicketReserved } from '@/domain/event'

export class PurchaseTicketUseCase {
  constructor (
    private readonly eventRepository: GetEvent,
    private readonly ticketRepository: SaveTicket,
    private readonly crypto: UUIDGenerator,
    private readonly queue: Publish
  ) {}

  async execute ({ paymentType, eventId, userId, cardId, installments }: Input): Promise<void> {
    const event = await this.eventRepository.get({ id: eventId })
    if (event === undefined) throw new EventNotFoundError()
    const ticket = Ticket.create({ eventId, userId }, this.crypto)
    await this.ticketRepository.save(ticket)
    const ticketReserved = new TicketReserved(paymentType, event.price, ticket.id, userId, cardId, installments)
    await this.queue.publish({ queueName: 'ticketReserved', data: ticketReserved })
  }
}

type Input = {
  paymentType: string
  eventId: string
  userId: string
  cardId: string | null
  installments: number | null
}
