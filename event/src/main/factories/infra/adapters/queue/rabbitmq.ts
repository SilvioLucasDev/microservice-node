import { RabbitMQAdapter } from '@/infra/adapters/queue'
import { env } from '@/main/config/env'

export const makeRabbitMQAdapter = (): RabbitMQAdapter => {
  return new RabbitMQAdapter(env.rabbitMQUrl)
}
