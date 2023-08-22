import { TicketRouter } from '../routes/ticket'
import { makeExpressAdapter } from '@/main/factories/express'

export const makeHttpServer = (): any => {
  const httpServer = makeExpressAdapter()
  new TicketRouter(httpServer)

  httpServer.listen()
}
