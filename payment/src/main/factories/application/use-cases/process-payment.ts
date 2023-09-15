import { makeAxiosAdapter, makeUUIDAdapter } from '@/main/factories/infra/adapters'
import { makeRabbitMQAdapter } from '@/main/factories/infra/adapters/queue'
import { makeAsaasGateway } from '@/main/factories/infra/adapters/gateways'
import { ProcessPaymentUseCase } from '@/application/use-cases'
import { makePgCardRepository, makePgTransactionRepository } from '@/main/factories/infra/repositories/postgres'
import { env } from '@/main/config/env'

export const makeProcessPaymentUseCase = (): ProcessPaymentUseCase => {
  return new ProcessPaymentUseCase(
    env.userMsUrl,
    makePgCardRepository(),
    makePgTransactionRepository(),
    makeAxiosAdapter(),
    makeAsaasGateway(),
    makeUUIDAdapter(),
    makeRabbitMQAdapter()
  )
}
