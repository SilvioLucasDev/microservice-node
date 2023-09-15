import { serverError, type HttpResponse, accepted } from '@/presentation/helpers'
import { type Controller } from '@/presentation/controllers'
import { type AsaasProcessPaymentUseCase } from '@/application/use-cases'

export class AsaasProcessPaymentController implements Controller {
  constructor (private readonly asaasProcessPaymentUseCase: AsaasProcessPaymentUseCase) { }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse<Model>> {
    try {
      const { status, externalReference, billingType, invoiceUrl } = httpRequest.payment
      await this.asaasProcessPaymentUseCase.execute({ status, externalReference, paymentType: billingType, url: invoiceUrl })
      return accepted()
    } catch (error) {
      return serverError(error as Error)
    }
  }
}
type HttpRequest = {
  payment: {
    status: string
    externalReference: string
    billingType: string
    invoiceUrl: string
  }
}

type Model = Error | undefined
