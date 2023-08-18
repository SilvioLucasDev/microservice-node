import { makePurchaseTicketController } from '@/main/factories/presentation/controllers'
import { ExpressRouterAdapter as Adapt } from '@/main/adapters'

import { type Router } from 'express'

export default (router: Router): void => {
  router.post('/ticket/purchase', new Adapt(makePurchaseTicketController()).adapt)
}
