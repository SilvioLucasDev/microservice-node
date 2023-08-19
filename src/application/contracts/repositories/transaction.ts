import { type Transaction } from '@/domain/entities'

export interface SaveTransaction {
  save: (ticket: SaveTicket.Input) => Promise<void>
}

export namespace SaveTicket {
  export type Input = Transaction
}
