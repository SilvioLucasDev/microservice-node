export class TicketProcessed {
  constructor (
    private readonly from: string,
    private readonly subject: string,
    private readonly email: string,
    private readonly body: string
  ) {
  }
}
