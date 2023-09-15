import { makeTokenizeCardController } from '@/main/factories/presentation/controllers'
import { type OnServer } from '@/application/contracts/adapters'

export class CardRouter {
  constructor (httpServer: OnServer) {
    httpServer.on({
      method: 'post',
      url: '/tokenize-cards',
      callback: async (params: any, body: any) => {
        return await makeTokenizeCardController().handle(body)
      }
    })
  }
}
