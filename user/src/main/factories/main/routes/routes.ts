import { UserRouter } from '@/main/routes'
import { makeExpressAdapter } from '@/main/factories/presentation/adapters'

export const makeHttpServer = (app: any): void => {
  const httpServer = makeExpressAdapter(app)
  new UserRouter(httpServer)
  httpServer.listen()
}
