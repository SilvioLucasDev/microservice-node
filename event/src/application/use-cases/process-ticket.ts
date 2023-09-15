import { type FindDetailsByIdTicket, type UpdateStatusTicket } from '@/application/contracts/repositories'
import { type GetClient, type Publish } from '@/application/contracts/adapters'
import { Email, Ticket } from '@/domain/entities'
import { TicketProcessed } from '@/domain/event'
import { env } from '@/main/config/env'

export class ProcessTicketUseCase {
  constructor (
    private readonly ticketRepository: UpdateStatusTicket & FindDetailsByIdTicket,
    private readonly httpClient: GetClient,
    private readonly queue: Publish
  ) { }

  async execute ({ ticketId, paymentType, url, userId, status }: Input): Promise<void> {
    const ticketStatus = Ticket.statusMap(status)
    await this.ticketRepository.updateStatus({ id: ticketId, status: ticketStatus })
    const { eventName } = await this.ticketRepository.findDetailsById({ id: ticketId })
    const user = await this.httpClient.get({ url: `${env.userMsUrl}/users/${userId}` })
    const emailData = Email.create({ ticketId, ticketStatus, paymentType, url, email: user.email, eventName })
    const ticketProcessed = new TicketProcessed(env.emailSender, emailData.email, emailData.subject, emailData.body)
    await this.queue.publish({ queueName: 'ticketProcessed', data: ticketProcessed })
  }
}

type Input = {
  ticketId: string
  paymentType: string
  url: string
  userId: string
  status: string
}
