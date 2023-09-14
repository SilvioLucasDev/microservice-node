import { type Transaction } from '@/domain/entities'

export interface SaveTransaction {
  save: (input: SaveTransaction.Input) => Promise<void>
}

export namespace SaveTransaction {
  export type Input = Transaction
}
