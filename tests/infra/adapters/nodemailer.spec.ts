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

    expect(sendMailMock).toHaveBeenCalledWith({ from, to, subject, html: body })
  })
})
