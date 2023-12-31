import { type Consume } from '@/application/contracts/adapters'
import { makeSendEmailUseCase } from '@/main/factories/application/use-cases'

export class QueueController {
  constructor (private readonly queue: Consume) {
    this.queue.consume({
      queueName: 'ticketProcessed',
      callback: async (input: any) => {
        await makeSendEmailUseCase().execute(input)
      }
    })
  }
}
