import prisma from '@/infra/repositories/postgres/helpers/connection'
import { type SaveTransaction } from '@/application/contracts/repositories'

export class PgTransactionRepository implements SaveTransaction {
  async save ({ id, ticketId, paymentType, cardId, total, installments, dueDate, processorResponse, transactionId, status }: SaveTransaction.Input): Promise<void> {
    await prisma.transaction.create({
      data: { id, ticket_id: ticketId, payment_type: paymentType, card_id: cardId, total: Number(total), due_date: dueDate, installments, processor_response: processorResponse, transaction_id: transactionId, status }
    })
  }
}
