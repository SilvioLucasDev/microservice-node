import { RabbitMQAdapter } from '@/infra/adapters/queue'

import amqp from 'mock-amqplib'

describe('RabbitMQAdapter', () => {
  let queueName: string
  let data: string

  let sut: RabbitMQAdapter

  beforeAll(() => {
    queueName = 'any_queue'
    data = 'any_data'
  })

  beforeEach(() => {
    sut = new RabbitMQAdapter()
  })

  it('should publish a message to a queue', async () => {
    sut['connection'] = await amqp.connect()
    await sut.publish({ queueName, data })
    sut['connection'] = await amqp.connect()
    const channel = await sut['connection']?.createChannel()
    const queue = await channel!.checkQueue(queueName)
    const message = await channel!.get(queueName)

    if (message !== false) {
      expect(queue).toBeDefined()
      expect(message.content).toBeDefined()
      expect(JSON.parse(message.content.toString())).toBe(data)
    }
  })

  it('should consume a message from the queue', async () => {
    sut['connection'] = await amqp.connect()
    await sut.publish({ queueName, data })

    sut['connection'] = await amqp.connect()
    await sut.consume({
      queueName,
      callback: async (input: any) => {
        expect(input).toBe(data)
      }
    })
  })
})
