import { type Ticket } from '@/domain/entities'

export interface SaveTicket {
  save: (ticket: SaveTicket.Input) => Promise<void>
}

export namespace SaveTicket {
  export type Input = Ticket
}

export interface FindByIdTicket {
  findById: (id: FindByIdTicket.Input) => Promise<void>
}

export namespace FindByIdTicket {
  export type Input = {
    id: string
  }

  export type Output = Ticket
}
