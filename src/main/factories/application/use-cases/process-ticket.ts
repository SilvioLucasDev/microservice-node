import { ProcessTicketUseCase } from '@/application/use-cases'
import { makePgTicketRepository, makePgUserRepository } from '@/main/factories/infra/repositories/postgres'
import { makeRabbitMQAdapter } from '@/main/factories/infra/adapters/queue'

export const makeProcessTicketUseCase = (): ProcessTicketUseCase => {
  return new ProcessTicketUseCase(
    makePgTicketRepository(),
    makePgUserRepository(),
    makeRabbitMQAdapter()
  )
}
