import { makeAsaasProcessPaymentUseCase } from '@/main/factories/application/use-cases'
import { AsaasProcessPaymentController } from '@/presentation/controllers'

export const makeAsaasProcessPaymentController = (): AsaasProcessPaymentController => {
  return new AsaasProcessPaymentController(makeAsaasProcessPaymentUseCase())
}
