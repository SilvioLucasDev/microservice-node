export class Ticket {
  constructor (
    private readonly ticketId: string,
    private readonly eventId: string,
    private readonly email: string,
    private readonly status: string
  ) {}

  static create ({ eventId, email }: Input): Ticket {
    const ticketId = 'hash'
    const initialStatus = 'reserved'
    return new Ticket(ticketId, eventId, email, initialStatus)
  }
}

type Input = {
  eventId: string
  email: string
}
