import { makePgUserRepository } from '@/main/factories/infra/repositories/postgres'
import { GetUserUseCase } from '@/application/use-cases'

export const makeGetUserUseCase = (): GetUserUseCase => {
  return new GetUserUseCase(makePgUserRepository())
}
