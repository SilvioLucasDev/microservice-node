import { makeRabbitMQAdapter } from '@/main/factories/infra/adapters/queue'
import { QueueController } from '@/infra/adapters/queue'

export const makeQueueController = (): QueueController => {
  return new QueueController(
    makeRabbitMQAdapter()
  )
}
