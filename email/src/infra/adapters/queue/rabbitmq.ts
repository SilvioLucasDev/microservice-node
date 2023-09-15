import { type Consume, type Publish } from '@/application/contracts/adapters'

import amqp, { type Channel, type Connection } from 'amqplib'

export class RabbitMQAdapter implements Publish, Consume {
  private connection?: Connection
  private channel?: Channel

  constructor (private readonly rabbitMQUrl: string) { }

  private async connectQueue (queueName: string): Promise<void> {
    if (!this.connection) this.connection = await amqp.connect(this.rabbitMQUrl)
    this.channel = await this.connection.createChannel()
    await this.channel.assertQueue(queueName, { durable: true })
  }

  private async close (): Promise<void> {
    if (this.channel) await this.channel.close()
    this.channel = undefined
    if (this.connection) await this.connection.close()
    this.connection = undefined
  }

  async publish ({ queueName, data, init = true }: Publish.Input): Promise<void> {
    if (init) await this.connectQueue(queueName)
    this.channel!.sendToQueue(queueName, Buffer.from(JSON.stringify(data)))
    if (init) await this.close()
  }

  async consume ({ queueName, callback }: Consume.Input): Promise<void> {
    await this.connectQueue(queueName)
    await this.channel!.consume(queueName, async (msg: any) => {
      const input = JSON.parse(msg.content.toString())
      await callback(input)
      this.channel!.ack(msg)
    })
  }
}
