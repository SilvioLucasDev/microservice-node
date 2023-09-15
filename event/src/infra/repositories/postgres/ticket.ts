import prisma from '@/infra/repositories/postgres/helpers/connection'
import { type UpdateStatusTicket, type SaveTicket, type FindDetailsByIdTicket } from '@/application/contracts/repositories'

export class PgTicketRepository implements SaveTicket, UpdateStatusTicket, FindDetailsByIdTicket {
  async save ({ id, eventId, userId, status }: SaveTicket.Input): Promise<void> {
    await prisma.ticket.create({
      data: { id, event_id: eventId, user_id: userId, status }
    })
  }

  async updateStatus ({ id, status }: UpdateStatusTicket.Input): Promise<void> {
    await prisma.ticket.update({
      where: { id }, data: { status }
    })
  }

  async findDetailsById ({ id }: FindDetailsByIdTicket.Input): Promise<FindDetailsByIdTicket.Output> {
    const ticket = await prisma.ticket.findFirst({
      where: { id },
      select: {
        user_id: true,
        event: {
          select: { name: true }
        }
      }
    })
    return {
      eventName: ticket!.event.name,
      userId: ticket!.user_id
    }
  }
}
