import { PgEventRepository } from '@/infra/repositories/postgres'

export const makePgEventRepository = (): PgEventRepository => {
  return new PgEventRepository()
}
