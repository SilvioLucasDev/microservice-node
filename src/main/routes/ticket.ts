import { makePurchaseTicketController } from '../factories/presentation/controllers'
import { type ExpressAdapter } from '../adapters/express'

export class TicketRouter {
  constructor (httpServer: ExpressAdapter) {
    httpServer.on('post', '/ticket/purchase', async (params: any, body: any) => {
      return await makePurchaseTicketController().handle(body)
    })
  }
}
