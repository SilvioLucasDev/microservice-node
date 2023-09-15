import { PgTicketRepository } from '@/infra/repositories/postgres'

export const makePgTicketRepository = (): PgTicketRepository => {
  return new PgTicketRepository()
}
