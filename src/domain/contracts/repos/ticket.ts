import { type Ticket } from '@/domain/entities'

export interface TicketRepository {
  save: (ticket: Input) => Promise<void>
}

type Input = Ticket
