import { UUIDAdapter } from '@/infra/adapters'

export const makeUUIDAdapter = (): UUIDAdapter => {
  return new UUIDAdapter()
}
