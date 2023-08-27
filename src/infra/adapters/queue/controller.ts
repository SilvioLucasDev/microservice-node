import { type Consume } from '@/application/contracts/adapters'
import { makeProcessPaymentUseCase, makeProcessTicketUseCase, makeSendEmailUseCase } from '@/main/factories/application/use-cases'

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

    this.queue.consume({
      queueName: 'ticketProcessed',
      callback: async (input: any) => {
        await makeSendEmailUseCase().execute(input)
      }
    })
  }
}
