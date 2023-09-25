import { makeExpressAdapter } from '@/main/factories/presentation/adapters'
import { TicketRouter } from '@/main/routes'

import { type Application } from 'express'
import { type Server } from 'http'

export const makeHttpServer = (app: Application): Server => {
  const httpServer = makeExpressAdapter(app)
  new TicketRouter(httpServer)
  return httpServer.listen()
}
