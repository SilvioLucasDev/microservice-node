export class Ticket {
  constructor (
    private readonly ticketId: string,
    private readonly eventId: string,
    private readonly email: string,
    private readonly status: string
  ) {}
}
