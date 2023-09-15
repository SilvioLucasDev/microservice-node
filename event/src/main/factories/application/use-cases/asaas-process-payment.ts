import { makeRabbitMQAdapter } from '@/main/factories/infra/adapters/queue'
import { makePgTransactionRepository } from '@/main/factories/infra/repositories/postgres'
import { AsaasProcessPaymentUseCase } from '@/application/use-cases'

export const makeAsaasProcessPaymentUseCase = (): AsaasProcessPaymentUseCase => {
  return new AsaasProcessPaymentUseCase(
    makePgTransactionRepository(),
    makeRabbitMQAdapter()
  )
}
