import { type Consume, type Publish } from '@/application/contracts/adapters'
import { PaymentError } from '@/domain/event'
import { makeProcessPaymentUseCase } from '@/main/factories/application/use-cases'

export class QueueController {
  constructor (private readonly queue: Consume & Publish) {
    this.queue.consume({
      queueName: 'ticketReserved',
      callback: async (input: any) => {
        try {
          await makeProcessPaymentUseCase().execute(input)
        } catch (error) {
          if (error instanceof Error) {
            const paymentError = new PaymentError(input.ticketId, error.message)
            await this.queue.publish({ queueName: 'paymentError', data: paymentError, init: false })
          }
        }
      }
    })
  }
}
