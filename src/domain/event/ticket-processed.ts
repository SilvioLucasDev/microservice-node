export class TicketProcessed {
  constructor (
    private readonly from: string,
    private readonly to: string,
    private readonly subject: string,
    private readonly body: string
  ) {
  }
}
