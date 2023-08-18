import { PurchaseTicketUseCase } from '@/application/use-cases'
import { makePgEventRepository, makePgTicketRepository } from '@/main/factories/infra/repositories/postgres'
import { makeRabbitMQAdapter, makeUUIDAdapter } from '@/main/factories/infra/adapters'

export const makePurchaseTicketUseCase = (): PurchaseTicketUseCase => {
  return new PurchaseTicketUseCase(
    makePgEventRepository(),
    makePgTicketRepository(),
    makeUUIDAdapter(),
    makeRabbitMQAdapter()
  )
}
