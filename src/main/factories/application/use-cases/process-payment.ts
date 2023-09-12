import { ProcessPaymentUseCase } from '@/application/use-cases'
import { makeUUIDAdapter } from '@/main/factories/infra/adapters'
import { makeRabbitMQAdapter } from '@/main/factories/infra/adapters/queue'
import { makeFakePaymentGateway } from '@/main/factories/infra/gateways'
import { makePgCardRepository, makePgTransactionRepository, makePgUserRepository } from '@/main/factories/infra/repositories/postgres'

export const makeProcessPaymentUseCase = (): ProcessPaymentUseCase => {
  return new ProcessPaymentUseCase(
    makePgUserRepository(),
    makePgCardRepository(),
    makePgTransactionRepository(),
    makeFakePaymentGateway(),
    makeUUIDAdapter(),
    makeRabbitMQAdapter()
  )
}
