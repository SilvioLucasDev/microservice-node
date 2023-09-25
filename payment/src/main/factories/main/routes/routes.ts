import { makeExpressAdapter } from '@/main/factories/presentation/adapters'
import { CardRouter, WebHookRouter } from '@/main/routes'

import { type Application } from 'express'
import { type Server } from 'http'

export const makeHttpServer = (app: Application): Server => {
  const httpServer = makeExpressAdapter(app)
  new CardRouter(httpServer)
  new WebHookRouter(httpServer)
  return httpServer.listen()
}
