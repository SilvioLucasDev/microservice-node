import { makePurchaseTicketController } from '@/main/factories/presentation/controllers'
import { expressRouterAdapter as adapt } from '@/main/adapters'

import { type Router } from 'express'

export default (router: Router): void => {
  router.post('/ticket/purchase', adapt(makePurchaseTicketController()))
}
