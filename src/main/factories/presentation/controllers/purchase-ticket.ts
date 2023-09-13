import { makePurchaseTicketUseCase } from '@/main/factories/application/use-cases'
import { PurchaseTicketController } from '@/presentation/controllers'

export const makePurchaseTicketController = (): PurchaseTicketController => {
  return new PurchaseTicketController(makePurchaseTicketUseCase())
}
