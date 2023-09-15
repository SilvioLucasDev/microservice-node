import { CardRouter, WebHookRouter } from '@/main/routes'
import { makeExpressAdapter } from '@/main/factories/presentation/adapters'

export const makeHttpServer = (app: any): void => {
  const httpServer = makeExpressAdapter(app)
  new CardRouter(httpServer)
  new WebHookRouter(httpServer)
  httpServer.listen()
}
