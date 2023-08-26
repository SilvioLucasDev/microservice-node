import { type FindDetailsByIdTicket, type UpdateStatusTicket } from '@/application/contracts/repositories'
import { Email, Ticket } from '@/domain/entities'

export class ProcessTicketUseCase {
  constructor (
    private readonly ticketRepository: UpdateStatusTicket & FindDetailsByIdTicket
  ) {}

  async execute ({ ticketId, status }: Input): Promise<void> {
    const ticketStatus = status === 'approved' ? Ticket.approve() : Ticket.cancel()
    await this.ticketRepository.updateStatus({ id: ticketId, status: ticketStatus })
    const { email, eventName } = await this.ticketRepository.findDetailsById({ id: ticketId })
    Email.create({ ticketId, email, eventName, ticketStatus })
  }
}

type Input = {
  ticketId: string
  status: string
}
