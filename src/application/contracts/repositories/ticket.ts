import { type Ticket } from '@/domain/entities'

export interface SaveTicket {
  save: (ticket: SaveTicket.Input) => Promise<void>
}

export namespace SaveTicket {
  export type Input = Ticket
}
