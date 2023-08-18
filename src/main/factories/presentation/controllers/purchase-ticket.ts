import { PurchaseTicketController } from '@/presentation/controllers'
import { makePurchaseTicketUseCase } from '@/main/factories/application/use-cases'

export const makePurchaseTicketController = (): PurchaseTicketController => {
  return new PurchaseTicketController(makePurchaseTicketUseCase())
}
