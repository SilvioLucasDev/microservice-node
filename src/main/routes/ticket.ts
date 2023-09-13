import { makePurchaseTicketController } from '@/main/factories/presentation/controllers'
import { type On } from '@/application/contracts/adapters'

export class TicketRouter {
  constructor (httpServer: On) {
    httpServer.on({
      method: 'post',
      url: '/purchase-tickets',
      callback: async (params: any, body: any) => {
        return await makePurchaseTicketController().handle(body)
      }
    })
  }
}
