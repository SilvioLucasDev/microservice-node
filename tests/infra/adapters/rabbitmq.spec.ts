import { RabbitMQAdapter } from '@/infra/adapters'

import amqp from 'mock-amqplib'

describe('RabbitMQAdapter', () => {
  let sut: RabbitMQAdapter
  let queueName: string
  let data: string

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

  // it('should rethrow if connect throw', async () => {
  //   jest.doMock('mock-amqplib', () => ({
  //     connect: jest.fn().mockResolvedValueOnce(new Error('connection_error'))
  //   }))

  //   const promise = sut.publish({ queueName, data })

  //   await expect(promise).rejects.toThrow(new QueueConnectionError())
  // })
})
