import { ExpressAdapter } from '../adapters'

export const makeExpressAdapter = (): ExpressAdapter => {
  return new ExpressAdapter()
}
