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
      html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Email Notification</title>
        </head>
        <body style="font-family: Arial, sans-serif; background-color: #f5f5f5; margin: 0; padding: 20px;">
          <table style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-collapse: collapse; box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);">
            <tr>
              <td style="padding: 20px; text-align: center; background-color: #007bff; color: #ffffff;">
                <h1>Email Notification</h1>
              </td>
            </tr>
            <tr>
              <td style="padding: 20px;">
                <p style="font-size: 16px;">
                  ${body}
                </p>
              </td>
            </tr>
            <tr>
              <td style="padding: 20px; text-align: center; background-color: #f5f5f5;">
                <p style="font-size: 12px; color: #888888;">This is an automated email, please do not reply.</p>
              </td>
            </tr>
          </table>
        </body>
        </html>
      `
    })
  }
}
