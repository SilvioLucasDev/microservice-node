import { ExpressAdapter } from '@/presentation/adapters'

export const makeExpressAdapter = (): ExpressAdapter => {
  return new ExpressAdapter()
}
