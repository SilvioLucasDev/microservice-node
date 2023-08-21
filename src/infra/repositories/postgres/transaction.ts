import { type SaveTransaction } from '@/application/contracts/repositories'
import prisma from '@/infra/repositories/postgres/helpers/connection'

export class PgTransactionRepository implements SaveTransaction {
  async save ({ id, ticketId, eventId, tid, price, status }: SaveTransaction.Input): Promise<void> {
    await prisma.transaction.create({
      data: { id, ticket_id: ticketId, event_id: eventId, tid, price: Number(price), status }
    })
  }
}
