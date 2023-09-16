import { badRequest, serverError, type HttpResponse, ok } from '@/presentation/helpers'
import { ValidationBuilder as Builder, ValidationComposite } from '@/presentation/validation'
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
      return serverError(error as Error)
    }
  }

  private validate ({ alias, holderName, number, expiryMonth, expiryYear, cvv, userId }: HttpRequest): Error | undefined {
    return new ValidationComposite([
      ...Builder.of({ value: alias, fieldName: 'alias' }).required().requiredString().build(),
      ...Builder.of({ value: holderName, fieldName: 'holderName' }).required().requiredString().build(),
      ...Builder.of({ value: number, fieldName: 'number' }).required().requiredString().build(),
      ...Builder.of({ value: expiryMonth, fieldName: 'expiryMonth' }).required().requiredString().build(),
      ...Builder.of({ value: expiryYear, fieldName: 'expiryYear' }).required().requiredString().build(),
      ...Builder.of({ value: cvv, fieldName: 'cvv' }).required().requiredString().build(),
      ...Builder.of({ value: userId, fieldName: 'userId' }).required().requiredString().build()
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
