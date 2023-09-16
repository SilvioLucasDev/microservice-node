import { AsaasProcessPaymentController } from '@/presentation/controllers'
import { ServerError } from '@/presentation/errors'
import { type AsaasProcessPaymentUseCase } from '@/application/use-cases'

import { mock, type MockProxy } from 'jest-mock-extended'

describe('AsaasProcessPaymentController', () => {
  let statusTransaction: string
  let payment: {
    status: string
    externalReference: string
    billingType: string
    invoiceUrl: string
  }

  let sut: AsaasProcessPaymentController
  let asaasProcessPaymentUseCase: MockProxy<AsaasProcessPaymentUseCase>

  beforeAll(() => {
    statusTransaction = 'approved'
    payment = { status: 'CONFIRMED', externalReference: 'any_external_reference', billingType: 'BOLETO', invoiceUrl: 'any_url' }

    asaasProcessPaymentUseCase = mock()
    asaasProcessPaymentUseCase.execute.mockResolvedValue({ statusTransaction })
  })

  beforeEach(() => {
    sut = new AsaasProcessPaymentController(asaasProcessPaymentUseCase)
  })

  it('should call method execute of AsaasProcessPaymentUseCase with correct params', async () => {
    await sut.handle({ payment })

    expect(asaasProcessPaymentUseCase.execute).toHaveBeenCalledWith({ status: payment.status, externalReference: payment.externalReference, paymentType: payment.billingType, url: payment.invoiceUrl })
    expect(asaasProcessPaymentUseCase.execute).toHaveBeenCalledTimes(1)
  })

  it('should return 500 if process payment throws', async () => {
    const error = new Error('app_error')
    asaasProcessPaymentUseCase.execute.mockRejectedValueOnce(error)

    const httpResponse = await sut.handle({ payment })

    expect(httpResponse).toEqual({
      statusCode: 500,
      data: new ServerError(error)
    })
  })

  it('should return 200 and status transaction if process payment succeeds', async () => {
    const httpResponse = await sut.handle({ payment })

    expect(httpResponse).toEqual({
      statusCode: 200,
      data: { statusTransaction }
    })
  })
})
