import { type MakePayment } from '@/application/contracts/gateways'

export class ProcessPaymentUseCase {
  constructor (private readonly paymentGateway: MakePayment) {}

  async execute ({ ticketId, email, eventId, price, creditCardToken }: Input): Promise<void> {
    await this.paymentGateway.makePayment({ email, creditCardToken, price })
  }
}

type Input = {
  ticketId: string
  eventId: string
  email: string
  price: string
  creditCardToken: string
}
