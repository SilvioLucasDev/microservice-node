import { type SaveTicket, type FindByIdTicket } from '@/application/contracts/repositories'

export class ProcessTicketUseCase {
  constructor (
    private readonly ticketRepository: SaveTicket & FindByIdTicket
  ) {}

  async execute ({ ticketId, status }: Input): Promise<void> {
    await this.ticketRepository.findById({ id: ticketId })
  }
}

type Input = {
  ticketId: string
  status: string
}
