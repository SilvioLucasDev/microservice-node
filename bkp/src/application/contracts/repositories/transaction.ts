import { type Transaction } from '@/domain/entities'

export interface SaveTransaction {
  save: (input: SaveTransaction.Input) => Promise<void>
}

export namespace SaveTransaction {
  export type Input = Transaction
}

export interface UpdateStatusTransaction {
  updateStatus: (input: UpdateStatusTransaction.Input) => Promise<void>
}

export namespace UpdateStatusTransaction {
  export type Input = {
    id: string
    status: string
  }
}
