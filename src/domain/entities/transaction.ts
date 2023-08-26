import { type UUIDGenerator } from '@/application/contracts/adapters'

export class Transaction {
  constructor (
    readonly id: string,
    readonly eventId: string,
    readonly ticketId: string,
    readonly tid: string,
    readonly price: string,
    readonly status: string
  ) {}

  static create ({ eventId, ticketId, tid, price, status }: Input, crypto: UUIDGenerator): Transaction {
    const id = crypto.uuid()
    return new Transaction(id, eventId, ticketId, tid, price, status)
  }
}

type Input = {
  eventId: string
  ticketId: string
  tid: string
  price: string
  status: string
}
