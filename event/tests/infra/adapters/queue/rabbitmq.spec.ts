import { RabbitMQAdapter } from '@/infra/adapters/queue'

import amqp from 'mock-amqplib'

describe('RabbitMQAdapter', () => {
  let queueName: string
  let data: string
  let rabbitMQUrl: string

  let sut: RabbitMQAdapter

  beforeAll(() => {
    queueName = 'any_queue'
    data = 'any_data'
    rabbitMQUrl = 'any_url'
  })

  beforeEach(() => {
    sut = new RabbitMQAdapter(rabbitMQUrl)
  })

  it('should publish a message to a queue and create and close connection if init is true', async () => {
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

  it('should publish a message to a queue and not create and close connection if init is false', async () => {
    const connectQueueSpy = jest.spyOn(sut as any, 'connectQueue')
    const closeSpy = jest.spyOn(sut as any, 'close')

    sut['connection'] = await amqp.connect()
    sut['channel'] = await sut['connection']?.createChannel()
    await sut.publish({ queueName, data, init: false })

    expect(connectQueueSpy).not.toHaveBeenCalled()
    expect(closeSpy).not.toHaveBeenCalled()
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
