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

export interface FindDetailsByIdTicket {
  findDetailsById: (id: FindDetailsByIdTicket.Input) => Promise<FindDetailsByIdTicket.Output>
}

export namespace FindDetailsByIdTicket {
  export type Input = {
    id: string
  }

  export type Output = {
    eventName: string
  }
}
