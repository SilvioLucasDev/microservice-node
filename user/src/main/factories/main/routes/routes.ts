import { makeExpressAdapter } from '@/main/factories/presentation/adapters'
import { UserRouter } from '@/main/routes'

import { type Application } from 'express'
import { type Server } from 'http'

export const makeHttpServer = (app: Application): Server => {
  const httpServer = makeExpressAdapter(app)
  new UserRouter(httpServer)
  return httpServer.listen()
}
