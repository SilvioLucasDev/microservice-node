import { FakePaymentGateway } from '@/infra/gateways'
import { makeUUIDAdapter } from '@/main/factories/infra/adapters'

export const makeFakePaymentGateway = (): FakePaymentGateway => {
  return new FakePaymentGateway(makeUUIDAdapter())
}
