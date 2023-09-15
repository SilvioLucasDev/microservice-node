import { NodeMailerAdapter } from '@/infra/adapters'

export const makeNodeMailerAdapter = (): NodeMailerAdapter => {
  return new NodeMailerAdapter()
}
