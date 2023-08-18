import { PurchaseTicket } from '@/application/use-cases'
import { makePgEventRepository, makePgTicketRepository } from '@/main/factories/infra/repositories/postgres'
import { makeRabbitMQAdapter, makeUUIDAdapter } from '@/main/factories/infra/adapters'

export const makePurchaseTicketUseCase = (): PurchaseTicket => {
  return new PurchaseTicket(
    makePgEventRepository(),
    makePgTicketRepository(),
    makeUUIDAdapter(),
    makeRabbitMQAdapter()
  )
}
