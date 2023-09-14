import { type UUIDGenerator } from '@/application/contracts/adapters'

export class Card {
  constructor (
    readonly id: string,
    readonly userId: string,
    readonly alias: string,
    readonly number: string,
    readonly brand: string,
    readonly token: string
  ) { }

  static create ({ alias, number, brand, token, userId }: Input, crypto: UUIDGenerator): Card {
    const id = crypto.uuid()

    return new Card(id, userId, alias, number, brand, token)
  }
}

type Input = {
  readonly alias: string
  readonly number: string
  readonly brand: string
  readonly token: string
  readonly userId: string
}
