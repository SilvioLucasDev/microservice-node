import { AxiosAdapter } from '@/infra/adapters'

export const makeAxiosAdapter = (): AxiosAdapter => {
  return new AxiosAdapter()
}
