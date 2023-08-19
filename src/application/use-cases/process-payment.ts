import { type MakePayment } from '@/application/contracts/gateways'
import { UnprocessedPaymentError } from '@/application/errors/payment'

export class ProcessPaymentUseCase {
  constructor (private readonly paymentGateway: MakePayment) {}

  async execute ({ ticketId, email, eventId, price, creditCardToken }: Input): Promise<void> {
    const payment = await this.paymentGateway.makePayment({ email, creditCardToken, price })
    if (payment.status !== 'approved') throw new UnprocessedPaymentError()
  }
}

type Input = {
  ticketId: string
  eventId: string
  email: string
  price: string
  creditCardToken: string
}
