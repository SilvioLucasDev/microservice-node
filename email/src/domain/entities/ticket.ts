import { TicketStatus } from '@/domain/enums'
import { type UUIDGenerator } from '@/application/contracts/adapters'

export class Ticket {
  constructor (
    readonly id: string,
    readonly eventId: string,
    readonly userId: string,
    readonly status: string
  ) { }

  static create ({ eventId, userId }: Input, crypto: UUIDGenerator): Ticket {
    const id = crypto.uuid()
    const initialStatus = TicketStatus.RESERVED
    return new Ticket(id, eventId, userId, initialStatus)
  }

  static statusMap (status: string): string {
    const statusMap: Record<string, string> = {
      started: TicketStatus.RESERVED,
      processing: TicketStatus.RESERVED,
      pending: TicketStatus.RESERVED,
      approved: TicketStatus.APPROVED,
      refused: TicketStatus.CANCELLED,
      refunded: TicketStatus.CANCELLED,
      chargeback: TicketStatus.CANCELLED,
      error: TicketStatus.CANCELLED
    }
    // TODO: Se o status que for recebido não ter mapeamento deve estourar uma exception e gerar um log
    return statusMap[status]
  }
}

type Input = {
  eventId: string
  userId: string
}
