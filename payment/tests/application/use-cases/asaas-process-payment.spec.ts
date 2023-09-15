import { AsaasProcessPaymentUseCase } from '@/application/use-cases'
import { type Publish } from '@/application/contracts/adapters'
import { type UpdateStatusTransaction } from '@/application/contracts/repositories'
import { PaymentProcessed } from '@/domain/event'

import { mock, type MockProxy } from 'jest-mock-extended'

jest.mock('@/domain/event/payment-processed')

describe('AsaasProcessPaymentUseCase', () => {
  let status: string
  let transactionId: string
  let ticketId: string
  let externalReference: string
  let paymentType: string
  let url: string

  let sut: AsaasProcessPaymentUseCase
  let transactionRepository: MockProxy<UpdateStatusTransaction>
  let queue: MockProxy<Publish>

  beforeAll(() => {
    status = 'CONFIRMED'
    transactionId = '1234'
    ticketId = '5678'
    externalReference = `${transactionId}&${ticketId}`
    paymentType = 'BOLETO'
    url = 'any_url'

    transactionRepository = mock()
    queue = mock()
  })

  beforeEach(() => {
    sut = new AsaasProcessPaymentUseCase(transactionRepository, queue)
  })

  it('should call method updateStatus of TransactionRepository with correct values', async () => {
    await sut.execute({ status, externalReference, paymentType, url })

    expect(transactionRepository.updateStatus).toHaveBeenCalledWith({ id: transactionId, status: 'approved' })
    expect(transactionRepository.updateStatus).toHaveBeenCalledTimes(1)
  })

  it('should call PaymentProcessedEvent with correct values', async () => {
    await sut.execute({ status, externalReference, paymentType, url })

    expect(PaymentProcessed).toHaveBeenCalledWith(paymentType = 'billet', ticketId, url, status = 'approved')
    expect(PaymentProcessed).toHaveBeenCalledTimes(1)
  })

  it('should call QueueAdapter with correct values', async () => {
    await sut.execute({ status, externalReference, paymentType, url })

    expect(queue.publish).toHaveBeenCalledWith({ queueName: 'paymentProcessed', data: expect.any(PaymentProcessed) })
    expect(queue.publish).toHaveBeenCalledTimes(1)
  })
})
