import { SendEmailUseCase } from '@/application/use-cases'
import { type Send } from '@/application/contracts/adapters'

import { mock, type MockProxy } from 'jest-mock-extended'

describe('SendEmailUseCase', () => {
  let from: string
  let to: string
  let subject: string
  let body: string

  let sut: SendEmailUseCase
  let emailAdapter: MockProxy<Send>

  beforeAll(() => {
    from = 'any_from'
    to = 'any_to'
    subject = 'any_subject'
    body = 'any_body'

    emailAdapter = mock()
  })

  beforeEach(() => {
    sut = new SendEmailUseCase(emailAdapter)
  })

  it('should call method send of EmailAdapter with correct values', async () => {
    await sut.execute({ from, to, subject, body })

    expect(emailAdapter.send).toHaveBeenCalledWith({ from, to, subject, body })
    expect(emailAdapter.send).toHaveBeenCalledTimes(1)
  })
})
