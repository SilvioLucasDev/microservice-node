import { makePgCardRepository } from '@/main/factories/infra/repositories/postgres'
import { makeAsaasGateway } from '@/main/factories/infra/adapters/gateways'
import { makeAxiosAdapter, makeUUIDAdapter } from '@/main/factories/infra/adapters'
import { TokenizeCardUseCase } from '@/application/use-cases'
import { env } from '@/main/config/env'

export const makeTokenizeCardUseCase = (): TokenizeCardUseCase => {
  return new TokenizeCardUseCase(
    env.userMsUrl,
    makePgCardRepository(),
    makeAxiosAdapter(),
    makeAsaasGateway(),
    makeUUIDAdapter()
  )
}
