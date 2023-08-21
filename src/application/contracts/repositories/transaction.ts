import { type Transaction } from '@/domain/entities'

export interface SaveTransaction {
  save: (ticket: SaveTransaction.Input) => Promise<void>
}

export namespace SaveTransaction {
  export type Input = Transaction
}
