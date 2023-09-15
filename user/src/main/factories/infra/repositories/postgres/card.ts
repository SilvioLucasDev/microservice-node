import { PgCardRepository } from '@/infra/repositories/postgres'

export const makePgCardRepository = (): PgCardRepository => {
  return new PgCardRepository()
}
