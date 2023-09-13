import { type MakePayment, type UUIDGenerator } from '@/application/contracts/adapters'

export class FakePaymentGateway implements MakePayment {
  constructor (private readonly crypto: UUIDGenerator) { }

  async makePayment (input: MakePayment.Input): Promise<MakePayment.Output> {
    const transactionId = this.crypto.uuid()
    return { transactionId, status: 'approved', url: 'any_url', processorResponse: 'Retorno do gateway' }
  }
}
