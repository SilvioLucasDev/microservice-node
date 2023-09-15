import { makeNodeMailerAdapter } from '@/main/factories/infra/adapters'
import { SendEmailUseCase } from '@/application/use-cases'

export const makeSendEmailUseCase = (): SendEmailUseCase => {
  return new SendEmailUseCase(
    makeNodeMailerAdapter()
  )
}
