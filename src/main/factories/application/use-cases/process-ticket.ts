import { ProcessTicketUseCase } from '@/application/use-cases'
import { makePgTicketRepository } from '@/main/factories/infra/repositories/postgres'

export const makeProcessTicketUseCase = (): ProcessTicketUseCase => {
  return new ProcessTicketUseCase(
    makePgTicketRepository()
  )
}
