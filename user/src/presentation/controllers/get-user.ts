import { badRequest, serverError, type HttpResponse, ok } from '@/presentation/helpers'
import { ValidationComposite, ValidationBuilder as Builder } from '@/presentation/validation'
import { type Controller } from '@/presentation/controllers'
import { type GetUserUseCase } from '@/application/use-cases'

export class GetUserController implements Controller {
  constructor (private readonly getUserUseCase: GetUserUseCase) { }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse<Model>> {
    try {
      const error = this.validate(httpRequest)
      if (error !== undefined) return badRequest(error)
      const user = await this.getUserUseCase.execute({ userId: httpRequest.userId })
      return ok(user)
    } catch (error) {
      return serverError(error as Error)
    }
  }

  private validate ({ userId }: HttpRequest): Error | undefined {
    return new ValidationComposite([
      ...Builder.of({ value: userId, fieldName: 'userId' }).required().requiredString().build()
    ]).validate()
  }
}
type HttpRequest = {
  userId: string
}

type Model = Error | object | undefined
