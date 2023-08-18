import { type Publish } from '@/domain/contracts/adapters'

import amqp, { type Channel, type Connection } from 'amqplib'

export class RabbitMQAdapter implements Publish {
  private connection?: Connection
  private channel?: Channel

  private async connectQueue (queueName: string): Promise<void> {
    if (!this.connection) this.connection = await amqp.connect('amqp://localhost')
    this.channel = await this.connection.createChannel()
    await this.channel.assertQueue(queueName, { durable: true })
  }

  private async close (): Promise<void> {
    await this.channel!.close()
    this.channel = undefined
    await this.connection!.close()
    this.connection = undefined
  }

  async publish ({ queueName, data }: Publish.Input): Promise<void> {
    try {
      await this.connectQueue(queueName)
      this.channel!.sendToQueue(queueName, Buffer.from(JSON.stringify(data)))
    } finally {
      await this.close()
    }
  }
}
