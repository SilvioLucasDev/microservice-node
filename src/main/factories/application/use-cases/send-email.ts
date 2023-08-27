import { SendEmailUseCase } from '@/application/use-cases'
import { makeNodeMailerAdapter } from '@/main/factories/infra/adapters'

export const makeSendEmailUseCase = (): SendEmailUseCase => {
  return new SendEmailUseCase(
    makeNodeMailerAdapter()
  )
}
