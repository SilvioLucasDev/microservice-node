import { env } from '@/main/config/env'
import { makeExpressAdapter } from '@/main/factories/presentation/adapters'
import { CardRouter, WebHookRouter } from '@/main/routes'

import { type Application } from 'express'

export const makeHttpServer = (app: Application): void => {
  const httpServer = makeExpressAdapter(app)
  new CardRouter(httpServer)
  new WebHookRouter(httpServer)
  if (env.nodeEnv !== 'test') httpServer.listen()
}
