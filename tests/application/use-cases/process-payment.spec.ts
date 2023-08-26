import { ProcessPaymentUseCase } from '@/application/use-cases'
import { type MakePayment } from '@/application/contracts/gateways'
import { type Publish, type UUIDGenerator } from '@/application/contracts/adapters'
import { Transaction } from '@/domain/entities'
import { type SaveTransaction } from '@/application/contracts/repositories'
import { PaymentProcessed } from '@/domain/event'

import { mock, type MockProxy } from 'jest-mock-extended'

jest.mock('@/domain/event/payment-processed')

describe('ProcessPaymentUseCase', () => {
  let sut: ProcessPaymentUseCase
  let paymentGateway: MockProxy<MakePayment>
  let crypto: MockProxy<UUIDGenerator>
  let transaction: jest.SpyInstance
  let transactionRepository: MockProxy<SaveTransaction>
  let queue: MockProxy<Publish>
  let ticketId: string
  let email: string
  let eventId: string
  let tid: string
  let price: string
  let creditCardToken: string

  beforeAll(() => {
    paymentGateway = mock()
    paymentGateway.makePayment.mockResolvedValue({ tid: 'any_tid', status: 'approved' })
    crypto = mock()
    crypto.uuid.mockReturnValue('any_ticket_id')
    transaction = jest.spyOn(Transaction, 'create')
    transactionRepository = mock()
    queue = mock()
    ticketId = 'any_ticket_id'
    email = 'any_email'
    eventId = 'any_event_id'
    tid = 'any_tid'
    price = 'any_price'
    creditCardToken = 'any_credit_card_token'
  })

  beforeEach(() => {
    sut = new ProcessPaymentUseCase(paymentGateway, crypto, transactionRepository, queue)
  })

  it('should call method makePayment of PaymentGateway with correct values', async () => {
    await sut.execute({ ticketId, email, eventId, price, creditCardToken })

    expect(paymentGateway.makePayment).toHaveBeenCalledWith({ email, creditCardToken, price })
    expect(paymentGateway.makePayment).toHaveBeenCalledTimes(1)
  })

  it('should calls Transaction with correct values', async () => {
    await sut.execute({ ticketId, email, eventId, price, creditCardToken })

    expect(transaction).toHaveBeenCalledWith({ eventId, ticketId, tid, price, status: 'approved' }, crypto)
    expect(transaction).toHaveBeenCalledTimes(1)
  })

  it('should calls TransactionRepository with instance of Transaction', async () => {
    await sut.execute({ ticketId, email, eventId, price, creditCardToken })

    expect(transactionRepository.save).toHaveBeenCalledWith(expect.any(Transaction))
    expect(transactionRepository.save).toHaveBeenCalledTimes(1)
  })

  it('should calls PaymentProcessed with correct values', async () => {
    await sut.execute({ ticketId, email, eventId, price, creditCardToken })

    expect(PaymentProcessed).toHaveBeenCalledWith(
      'any_ticket_id',
      'any_email',
      'approved'
    )
    expect(PaymentProcessed).toHaveBeenCalledTimes(1)
  })

  it('should calls Queue with correct values', async () => {
    await sut.execute({ ticketId, email, eventId, price, creditCardToken })

    expect(queue.publish).toHaveBeenCalledWith({ queueName: 'paymentProcessed', data: expect.any(PaymentProcessed) })
    expect(queue.publish).toHaveBeenCalledTimes(1)
  })
})
