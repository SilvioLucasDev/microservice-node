import { type SaveTicket } from '@/domain/contracts/repos'
import prisma from '@/infra/repositories/postgres/helpers/connection'

export class PgTicketRepository implements SaveTicket {
  async save (input: SaveTicket.Input): Promise<void> {
    await prisma.ticket.create({
      data: { ...input, event_id: input.eventId }
    })
  }
}