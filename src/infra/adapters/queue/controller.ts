import { type Consume } from '@/application/contracts/adapters'
import { makeProcessPaymentUseCase } from '@/main/factories/application/use-cases'

export class QueueController {
  constructor (private readonly queue: Consume) {
    this.queue.consume({
      queueName: 'ticketReserved',
      callback: async (input: any) => {
        await makeProcessPaymentUseCase().execute(input)
      }
    })
  }
}
