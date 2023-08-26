import { type FindDetailsByIdTicket, type UpdateStatusTicket } from '@/application/contracts/repositories'
import { Ticket } from '@/domain/entities'

export class ProcessTicketUseCase {
  constructor (
    private readonly ticketRepository: UpdateStatusTicket & FindDetailsByIdTicket
  ) {}

  async execute ({ ticketId, status }: Input): Promise<void> {
    const statusTicket = status === 'approved' ? Ticket.approve() : Ticket.cancel()
    await this.ticketRepository.updateStatus({ id: ticketId, status: statusTicket })
    this.ticketRepository.findDetailsById({ id: ticketId })
    console.log('Email enviado para ??')
  }
}

type Input = {
  ticketId: string
  status: string
  email: string
}
