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

  static create ({ userId, alias, number, brand, token }: Input, crypto: UUIDGenerator): Card {
    const id = crypto.uuid()

    return new Card(id, userId, alias, number, brand, token)
  }
}

type Input = {
  readonly userId: string
  readonly alias: string
  readonly number: string
  readonly brand: string
  readonly token: string
}
