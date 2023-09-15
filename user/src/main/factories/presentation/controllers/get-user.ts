import { makeGetUserUseCase } from '@/main/factories/application/use-cases'
import { GetUserController } from '@/presentation/controllers'

export const makeGetUserController = (): GetUserController => {
  return new GetUserController(makeGetUserUseCase())
}
