import { type UpdateStatusTicket, type SaveTicket } from '@/application/contracts/repositories'
import prisma from '@/infra/repositories/postgres/helpers/connection'

export class PgTicketRepository implements SaveTicket, UpdateStatusTicket {
  async save ({ id, email, eventId, status }: SaveTicket.Input): Promise<void> {
    await prisma.ticket.create({
      data: { id, email, event_id: eventId, status }
    })
  }

  async updateStatus ({ id, status }: UpdateStatusTicket.Input): Promise<any> {
    await prisma.ticket.update({
      where: { id }, data: { status }
    })
  }
}
