import { NodeMailerAdapter } from '@/infra/adapters'

import nodemailer from 'nodemailer'

jest.mock('nodemailer')

describe('NodeMailerAdapter', () => {
  let sut: NodeMailerAdapter
  let from: string
  let to: string
  let subject: string
  let body: string

  let sendMailMock: jest.Mock

  beforeAll(() => {
    from = 'any_from'
    to = 'any_to'
    subject = 'any_subject'
    body = 'any_body'

    sendMailMock = jest.fn()
    jest.mocked(nodemailer.createTransport).mockReturnValue({
      sendMail: sendMailMock
    } as any)
  })

  beforeEach(() => {
    sut = new NodeMailerAdapter()
  })

  it('should call method sendMail with correct values', async () => {
    await sut.send({ from, to, subject, body })

    expect(sendMailMock).toHaveBeenCalledWith({
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
  })
})
