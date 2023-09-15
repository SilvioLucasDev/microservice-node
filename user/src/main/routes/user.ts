import { makeGetUserController } from '@/main/factories/presentation/controllers'
import { type OnServer } from '@/application/contracts/adapters'

export class UserRouter {
  constructor (httpServer: OnServer) {
    httpServer.on({
      method: 'get',
      url: '/users/:userId',
      callback: async (params: any) => {
        return await makeGetUserController().handle(params)
      }
    })
  }
}
