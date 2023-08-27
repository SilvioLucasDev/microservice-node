import { type Send } from '@/application/contracts/adapters'
import { env } from '@/main/config/env'

import nodemailer from 'nodemailer'

export class NodeMailerAdapter implements Send {
  async send ({ from, to, subject, body }: Send.Input): Promise<void> {
    const transport = nodemailer.createTransport({
      host: env.email.host,
      port: Number(env.email.port),
      auth: {
        user: env.email.user,
        pass: env.email.pass
      }
    })

    transport.sendMail({
      from,
      to,
      subject,
      html: body
    })
  }
}
