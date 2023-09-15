import { ExpressAdapter } from '@/presentation/adapters'

export const makeExpressAdapter = (app: any): ExpressAdapter => {
  return new ExpressAdapter(app)
}
