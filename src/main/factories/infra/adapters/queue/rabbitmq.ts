import { RabbitMQAdapter } from '@/infra/adapters/queue'

export const makeRabbitMQAdapter = (): RabbitMQAdapter => {
  return new RabbitMQAdapter()
}
