import { ProcessTicketUseCase } from '@/application/use-cases'
import { makePgTicketRepository } from '@/main/factories/infra/repositories/postgres'
import { makeRabbitMQAdapter } from '../../infra/adapters/queue'

export const makeProcessTicketUseCase = (): ProcessTicketUseCase => {
  return new ProcessTicketUseCase(
    makePgTicketRepository(),
    makeRabbitMQAdapter()
  )
}
