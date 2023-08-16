import { type Ticket } from '@/domain/entities'

export interface SaveTicket {
  save: (ticket: Input) => Promise<void>
}

type Input = Ticket
