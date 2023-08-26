import { type UpdateStatusTicket } from '@/application/contracts/repositories'
import { Ticket } from '@/domain/entities'

export class ProcessTicketUseCase {
  constructor (
    private readonly ticketRepository: UpdateStatusTicket
  ) {}

  async execute ({ ticketId, statusPayment }: Input): Promise<void> {
    const statusTicket = statusPayment === 'approved' ? Ticket.approve() : Ticket.cancel()
    await this.ticketRepository.updateStatus({ id: ticketId, status: statusTicket })
    // Mandar e-mail para cliente
  }
}

type Input = {
  ticketId: string
  statusPayment: string
}
