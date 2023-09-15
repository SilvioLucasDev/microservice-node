import { makePgCardRepository, makePgUserRepository } from '@/main/factories/infra/repositories/postgres'
import { makeAsaasGateway } from '@/main/factories/infra/adapters/gateways'
import { makeUUIDAdapter } from '@/main/factories/infra/adapters'
import { TokenizeCardUseCase } from '@/application/use-cases'

export const makeTokenizeCardUseCase = (): TokenizeCardUseCase => {
  return new TokenizeCardUseCase(
    makePgUserRepository(),
    makePgCardRepository(),
    makeAsaasGateway(),
    makeUUIDAdapter()
  )
}
