import { makePgCardRepository } from '@/main/factories/infra/repositories/postgres'
import { makeAsaasGateway } from '@/main/factories/infra/adapters/gateways'
import { makeAxiosAdapter, makeUUIDAdapter } from '@/main/factories/infra/adapters'
import { TokenizeCardUseCase } from '@/application/use-cases'

export const makeTokenizeCardUseCase = (): TokenizeCardUseCase => {
  return new TokenizeCardUseCase(
    makePgCardRepository(),
    makeAxiosAdapter(),
    makeAsaasGateway(),
    makeUUIDAdapter()
  )
}
