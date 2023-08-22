import { ProcessPaymentUseCase } from '@/application/use-cases'
import { makeUUIDAdapter } from '@/main/factories/infra/adapters'
import { makeRabbitMQAdapter } from '@/main/factories/infra/adapters/queue'
import { makeFakePaymentGateway } from '@/main/factories/infra/gateways/fake-payment'
import { makePgTransactionRepository } from '@/main/factories/infra/repositories/postgres/transaction'

export const makeProcessPaymentUseCase = (): ProcessPaymentUseCase => {
  return new ProcessPaymentUseCase(
    makeFakePaymentGateway(),
    makeUUIDAdapter(),
    makePgTransactionRepository(),
    makeRabbitMQAdapter()
  )
}