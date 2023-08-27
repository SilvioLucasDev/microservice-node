import { type Send } from '@/application/contracts/adapters'

import nodemailer from 'nodemailer'

export class NodeMailerAdapter implements Send {
  async send ({ from, to, subject, body }: Send.Input): Promise<void> {
    const transport = nodemailer.createTransport({
      host: 'sandbox.smtp.mailtrap.io',
      port: 2525,
      auth: {
        user: '93a7e76897c842',
        pass: '1dde78557ced7b'
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
