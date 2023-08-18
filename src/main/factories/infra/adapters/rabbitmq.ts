import { RabbitMQAdapter } from '@/infra/adapters'

export const makeRabbitMQAdapter = (): RabbitMQAdapter => {
  return new RabbitMQAdapter()
}
