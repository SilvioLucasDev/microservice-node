import { env } from '@/main/config/env'
import { ExpressAdapter } from '@/presentation/adapters'

import { type Application } from 'express'

export const makeExpressAdapter = (app: Application): ExpressAdapter => {
  return new ExpressAdapter(env.port, app)
}
