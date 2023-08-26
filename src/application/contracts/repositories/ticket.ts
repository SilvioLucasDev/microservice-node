import { type Ticket } from '@/domain/entities'

export interface SaveTicket {
  save: (ticket: SaveTicket.Input) => Promise<void>
}

export namespace SaveTicket {
  export type Input = Ticket
}

export interface UpdateStatusTicket {
  updateStatus: (id: UpdateStatusTicket.Input) => Promise<void>
}

export namespace UpdateStatusTicket {
  export type Input = {
    id: string
    status: string
  }
}
