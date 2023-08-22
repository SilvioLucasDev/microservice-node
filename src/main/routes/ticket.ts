import { type On } from '@/application/contracts/adapters'
import { makePurchaseTicketController } from '@/main/factories/presentation/controllers'

export class TicketRouter {
  constructor (httpServer: On) {
    httpServer.on({
      method: 'post',
      url: '/ticket/purchase',
      callback: async (params: any, body: any) => {
        return await makePurchaseTicketController().handle(body)
      }
    })
  }
}
