import { makePgTicketRepository } from '@/main/factories/infra/repositories/postgres'
import { makeAxiosAdapter } from '@/main/factories/infra/adapters'
import { makeRabbitMQAdapter } from '@/main/factories/infra/adapters/queue'
import { ProcessTicketUseCase } from '@/application/use-cases'

export const makeProcessTicketUseCase = (): ProcessTicketUseCase => {
  return new ProcessTicketUseCase(
    makePgTicketRepository(),
    makeAxiosAdapter(),
    makeRabbitMQAdapter()
  )
}
