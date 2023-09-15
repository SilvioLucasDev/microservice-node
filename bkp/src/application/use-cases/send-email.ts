import { type Send } from '@/application/contracts/adapters'

export class SendEmailUseCase {
  constructor (private readonly emailAdapter: Send) {}

  async execute ({ from, to, subject, body }: Input): Promise<void> {
    // TODO: Descobrir se esse e-mail foi enviado de alguma forma e salvar em alguma tabela
    await this.emailAdapter.send({ from, to, subject, body })
  }
}

type Input = {
  from: string
  to: string
  subject: string
  body: string
}
