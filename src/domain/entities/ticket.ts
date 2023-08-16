export class Ticket {
  constructor (
    readonly id: string,
    readonly eventId: string,
    readonly email: string,
    readonly status: string
  ) {}

  static create ({ eventId, email }: Input): Ticket {
    const id = 'hash'
    const initialStatus = 'reserved'
    return new Ticket(id, eventId, email, initialStatus)
  }
}

type Input = {
  eventId: string
  email: string
}
