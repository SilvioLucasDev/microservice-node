export class TicketReserved {
  constructor (
    private readonly ticketId: string,
    private readonly eventId: string,
    private readonly creditCardToken: string,
    private readonly price: string,
    private readonly email: string
  ) {
  }
}
