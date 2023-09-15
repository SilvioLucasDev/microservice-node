import { PgTransactionRepository } from '@/infra/repositories/postgres'

export const makePgTransactionRepository = (): PgTransactionRepository => {
  return new PgTransactionRepository()
}
