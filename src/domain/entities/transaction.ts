import { type UUIDGenerator } from '@/application/contracts/adapters'

export class Transaction {
  constructor (
    readonly id: string,
    readonly eventId: string,
    readonly ticketId: string,
    readonly price: string,
    readonly status: string
  ) {}

  static create ({ eventId, ticketId, price }: Input, crypto: UUIDGenerator): Transaction {
    const id = crypto.uuid()
    const initialStatus = 'processing'
    return new Transaction(id, eventId, ticketId, price, initialStatus)
  }
}

type Input = {
  eventId: string
  ticketId: string
  price: string
}
