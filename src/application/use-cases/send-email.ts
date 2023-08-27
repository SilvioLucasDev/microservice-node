import { type Send } from '@/application/contracts/adapters'

export class SendEmailUseCase {
  constructor (
    private readonly emailAdapter: Send
  ) {}

  async execute ({ from, to, subject, body }: Input): Promise<void> {
    await this.emailAdapter.send({ from, to, subject, body })
  }
}

type Input = {
  from: string
  to: string
  subject: string
  body: string
}
