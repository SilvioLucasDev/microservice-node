import { type Consume } from '@/application/contracts/adapters'
import { makeProcessPaymentUseCase } from '@/main/factories/application/use-cases'
import { makeProcessTicketUseCase } from '@/main/factories/application/use-cases/process-ticket'

export class QueueController {
  constructor (private readonly queue: Consume) {
    this.queue.consume({
      queueName: 'ticketReserved',
      callback: async (input: any) => {
        await makeProcessPaymentUseCase().execute(input)
      }
    })

    this.queue.consume({
      queueName: 'paymentProcessed',
      callback: async (input: any) => {
        await makeProcessTicketUseCase().execute(input)
      }
    })
  }
}
