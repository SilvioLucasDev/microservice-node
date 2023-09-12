export class TicketReserved {
  constructor (
    private readonly paymentType: string,
    private readonly price: number,
    private readonly ticketId: string,
    private readonly userId: string,
    private readonly cardId: string | null,
    private readonly installments: number | null
  ) {}
}
