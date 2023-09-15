import { type Consume } from '@/application/contracts/adapters'

import { makeProcessTicketUseCase } from '@/main/factories/application/use-cases'

export class QueueController {
  constructor (private readonly queue: Consume) {
    this.queue.consume({
      queueName: 'paymentProcessed',
      callback: async (input: any) => {
        await makeProcessTicketUseCase().execute(input)
      }
    })
  }
}
