import { type FindDetailsByIdTicket, type UpdateStatusTicket } from '@/application/contracts/repositories'
import { Email, Ticket } from '@/domain/entities'
import { TicketProcessed } from '@/domain/event'
import { env } from '@/main/config/env'
import { type Publish } from '@/application/contracts/adapters'
export class ProcessTicketUseCase {
  constructor (
    private readonly ticketRepository: UpdateStatusTicket & FindDetailsByIdTicket,
    private readonly queue: Publish
  ) {}

  async execute ({ ticketId, status }: Input): Promise<void> {
    const ticketStatus = status === 'approved' ? Ticket.approve() : Ticket.cancel()
    await this.ticketRepository.updateStatus({ id: ticketId, status: ticketStatus })
    const { email, eventName } = await this.ticketRepository.findDetailsById({ id: ticketId })
    const emailData = Email.create({ ticketId, email, eventName, ticketStatus })
    const ticketProcessed = new TicketProcessed(env.emailService, emailData.subject, emailData.email, emailData.body)
    await this.queue.publish({ queueName: 'ticketProcessed', data: ticketProcessed })
  }
}

type Input = {
  ticketId: string
  status: string
}
