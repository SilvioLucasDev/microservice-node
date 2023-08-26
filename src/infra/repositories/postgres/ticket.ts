import { type UpdateStatusTicket, type SaveTicket, type FindDetailsByIdTicket } from '@/application/contracts/repositories'
import prisma from '@/infra/repositories/postgres/helpers/connection'

export class PgTicketRepository implements SaveTicket, UpdateStatusTicket, FindDetailsByIdTicket {
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

  async findDetailsById ({ id }: FindDetailsByIdTicket.Input): Promise<FindDetailsByIdTicket.Output> {
    const ticket = await prisma.ticket.findFirst({
      where: { id },
      select: {
        email: true,
        event: {
          select: { name: true }
        }
      }
    })
    return {
      email: ticket!.email,
      eventName: ticket!.event.name
    }
  }
}
