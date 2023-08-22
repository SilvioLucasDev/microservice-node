import { type MakePayment } from '@/application/contracts/gateways'
import { type UUIDGenerator } from '@/application/contracts/adapters'

export class FakePaymentGateway implements MakePayment {
  constructor (private readonly crypto: UUIDGenerator) {}

  async makePayment (input: MakePayment.Input): Promise<MakePayment.Output> {
    const tid = this.crypto.uuid()
    return { tid, status: 'approved' }
  }
}
