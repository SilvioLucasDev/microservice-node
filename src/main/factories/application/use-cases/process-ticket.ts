import { makePgTicketRepository, makePgUserRepository } from '@/main/factories/infra/repositories/postgres'
import { makeRabbitMQAdapter } from '@/main/factories/infra/adapters/queue'
import { ProcessTicketUseCase } from '@/application/use-cases'

export const makeProcessTicketUseCase = (): ProcessTicketUseCase => {
  return new ProcessTicketUseCase(
    makePgTicketRepository(),
    makePgUserRepository(),
    makeRabbitMQAdapter()
  )
}
