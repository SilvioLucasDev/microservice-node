import { badRequest, serverError, type HttpResponse, ok } from '@/presentation/helpers'
import { Required, RequiredNumber, RequiredString, ValidationComposite } from '@/presentation/validation'
import { type Controller } from '@/presentation/controllers'
import { type TokenizeCardUseCase } from '@/application/use-cases'

export class TokenizeCardController implements Controller {
  constructor (private readonly tokenizeCardUseCase: TokenizeCardUseCase) { }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse<Model>> {
    try {
      const error = this.validate(httpRequest)
      if (error !== undefined) return badRequest(error)
      const { alias, holderName, number, expiryMonth, expiryYear, cvv, userId } = httpRequest
      const { cardId } = await this.tokenizeCardUseCase.execute({ alias, holderName, number, expiryMonth, expiryYear, cvv, userId })
      return ok({ cardId })
    } catch (error) {
      console.log('TokenizeCardController', error)
      return serverError(error as Error)
    }
  }

  private validate ({ alias, holderName, number, expiryMonth, expiryYear, cvv, userId }: HttpRequest): Error | undefined {
    return new ValidationComposite([
      new Required(alias, 'alias'),
      new RequiredString(alias, 'alias'),
      new Required(holderName, 'holderName'),
      new RequiredString(holderName, 'holderName'),
      new Required(number, 'number'),
      new RequiredString(number, 'number'),
      new Required(expiryMonth, 'expiryMonth'),
      new RequiredString(expiryMonth, 'expiryMonth'),
      new Required(expiryYear, 'expiryYear'),
      new RequiredString(expiryYear, 'expiryYear'),
      new Required(cvv, 'cvv'),
      new RequiredNumber(cvv, 'cvv'),
      new Required(userId, 'userId'),
      new RequiredString(userId, 'userId')
    ]).validate()
  }
}
type HttpRequest = {
  alias: string
  holderName: string
  number: string
  expiryMonth: string
  expiryYear: string
  cvv: string
  userId: string
}

type Model = Error | {
  cardId: string
}
