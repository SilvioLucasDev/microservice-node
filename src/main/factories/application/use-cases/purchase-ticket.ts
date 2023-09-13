import { makePgEventRepository, makePgTicketRepository } from '@/main/factories/infra/repositories/postgres'
import { makeUUIDAdapter } from '@/main/factories/infra/adapters'
import { makeRabbitMQAdapter } from '@/main/factories/infra/adapters/queue'
import { PurchaseTicketUseCase } from '@/application/use-cases'

export const makePurchaseTicketUseCase = (): PurchaseTicketUseCase => {
  return new PurchaseTicketUseCase(
    makePgEventRepository(),
    makePgTicketRepository(),
    makeUUIDAdapter(),
    makeRabbitMQAdapter()
  )
}
