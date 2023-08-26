export class TicketProcessed {
  constructor (
    private readonly to: string,
    private readonly subject: string,
    private readonly email: string,
    private readonly body: string
  ) {
  }
}
