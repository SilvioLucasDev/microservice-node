import { type MakePayment } from '@/application/contracts/gateways'

export class FakePaymentGateway implements MakePayment {
  async makePayment (input: MakePayment.Input): Promise<MakePayment.Output> {
    return { tid: '123456789', status: 'approved' }
  }
}
