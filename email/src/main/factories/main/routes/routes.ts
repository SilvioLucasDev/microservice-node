import { env } from '@/main/config/env'
import { makeExpressAdapter } from '@/main/factories/presentation/adapters'

import { type Application } from 'express'

export const makeHttpServer = (app: Application): void => {
  const httpServer = makeExpressAdapter(app)
  if (env.nodeEnv !== 'test') httpServer.listen()
}
