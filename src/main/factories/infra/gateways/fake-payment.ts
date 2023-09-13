import { makeUUIDAdapter } from '@/main/factories/infra/adapters'
import { FakePaymentGateway } from '@/infra/gateways'

export const makeFakePaymentGateway = (): FakePaymentGateway => {
  return new FakePaymentGateway(makeUUIDAdapter())
}
