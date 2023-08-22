import { type Consume, type Publish } from '@/application/contracts/adapters'

import amqp, { type Message, type Channel, type Connection } from 'amqplib'

export class RabbitMQAdapter implements Publish, Consume {
  private connection?: Connection
  private channel?: Channel

  private async connectQueue (queueName: string): Promise<void> {
    if (!this.connection) this.connection = await amqp.connect('amqp://localhost')
    this.channel = await this.connection.createChannel()
    await this.channel.assertQueue(queueName, { durable: true })
  }

  private async close (): Promise<void> {
    if (this.channel) await this.channel.close()
    this.channel = undefined
    if (this.connection) await this.connection.close()
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

  async consume ({ queueName, callback }: Consume.Input): Promise<void> {
    await this.connectQueue(queueName)

    await this.channel!.consume(queueName, async (msg: Message | null) => {
      if (!msg) return
      const input = JSON.parse(msg.content.toString())
      try {
        await callback(input)
        this.channel!.ack(msg)
      } catch (e: any) {
        console.log(e.message)
      }
    })
  }
}
