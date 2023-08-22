import { makePurchaseTicketController } from '@/main/factories/presentation/controllers'
import { type ExpressAdapter } from '@/presentation/adapters/express'

export class TicketRouter {
  constructor (httpServer: ExpressAdapter) {
    httpServer.on({
      method: 'post',
      url: '/ticket/purchase',
      callback: async (params: any, body: any) => {
        return await makePurchaseTicketController().handle(body)
      }
    })
  }
}
