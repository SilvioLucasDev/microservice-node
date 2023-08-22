import { TicketRouter } from '@/main/routes'
import { makeExpressAdapter } from '@/main/factories/express'

export const makeHttpServer = (): void => {
  const httpServer = makeExpressAdapter()
  new TicketRouter(httpServer)

  httpServer.listen()
}
