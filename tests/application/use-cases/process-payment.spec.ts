import { ProcessPaymentUseCase } from '@/application/use-cases'
import { type MakePayment } from '@/application/contracts/gateways'
import { type GetCard, type GetUser, type SaveTransaction } from '@/application/contracts/repositories'
import { type Publish, type UUIDGenerator } from '@/application/contracts/adapters'
import { Transaction } from '@/domain/entities'
import { PaymentProcessed } from '@/domain/event'
import { CardNotFoundError } from '@/application/errors'

import { mock, type MockProxy } from 'jest-mock-extended'
import MockDate from 'mockdate'

jest.mock('@/domain/event/payment-processed')

describe('ProcessPaymentUseCase', () => {
  let ticketId: string
  let transactionId: string
  let price: number
  let paymentType: string
  let userId: string
  let cardId: string
  let installments: number
  let dueDate: Date
  let id: string
  let name: string
  let document: string
  let email: string
  let zipcode: string
  let number: string
  let complements: string
  let mobilePhone: string
  let alias: string
  let token: string
  let tid: string
  let url: string
  let processorResponse: string
  let status: string
  let user: object
  let card: object

  let sut: ProcessPaymentUseCase
  let transaction: jest.SpyInstance
  let userRepository: MockProxy<GetUser>
  let cardRepository: MockProxy<GetCard>
  let transactionRepository: MockProxy<SaveTransaction>
  let paymentGateway: MockProxy<MakePayment>
  let crypto: MockProxy<UUIDGenerator>
  let queue: MockProxy<Publish>

  function getDueDate (): Date {
    const dueDate = new Date()
    dueDate.setDate(dueDate.getDate() + 10)
    return dueDate
  }

  beforeAll(() => {
    MockDate.set(new Date())

    ticketId = 'any_ticket_id'
    transactionId = 'any_transaction_id'
    price = 300
    paymentType = 'credit_card'
    userId = 'any_user_id'
    cardId = 'any_card_id'
    installments = 3
    dueDate = getDueDate()
    id = 'any_id'
    name = 'any_name'
    document = 'any_document'
    email = 'any_email'
    zipcode = 'any_zipcode'
    number = 'any_number'
    complements = 'any_complements'
    mobilePhone = 'any_mobile_phone'
    alias = 'any_alias'
    token = 'any_token'
    tid = 'any_tid'
    url = 'any_url'
    processorResponse = 'any_processor_response'
    status = 'approved'
    user = { id, name, document, email, zipcode, number, complements, mobile_phone: mobilePhone }
    card = { id, alias, token }

    transaction = jest.spyOn(Transaction, 'create')
    userRepository = mock()
    userRepository.get.mockResolvedValue({ id, name, document, email, zipcode, number, complements, mobile_phone: mobilePhone })
    cardRepository = mock()
    cardRepository.get.mockResolvedValue({ id, alias, token })
    transactionRepository = mock()
    paymentGateway = mock()
    paymentGateway.makePayment.mockResolvedValue({ transactionId: tid, status, url, processorResponse })
    crypto = mock()
    crypto.uuid.mockReturnValue(transactionId)
    queue = mock()
  })

  beforeEach(() => {
    sut = new ProcessPaymentUseCase(userRepository, cardRepository, transactionRepository, paymentGateway, crypto, queue)
  })

  afterAll(() => {
    MockDate.reset()
  })

  it('should call TransactionEntity with correct values', async () => {
    await sut.execute({ ticketId, price, paymentType, userId, cardId, installments })

    expect(transaction).toHaveBeenCalledWith({ ticketId, paymentType, cardId, total: price, installments }, crypto)
    expect(transaction).toHaveBeenCalledTimes(1)
  })

  it('should call UserRepository with correct values', async () => {
    await sut.execute({ ticketId, price, paymentType, userId, cardId, installments })

    expect(userRepository.get).toHaveBeenCalledWith({ id: userId })
    expect(userRepository.get).toHaveBeenCalledTimes(1)
  })

  it('should call CardRepository with correct values', async () => {
    await sut.execute({ ticketId, price, paymentType, userId, cardId, installments })

    expect(cardRepository.get).toHaveBeenCalledWith({ id: cardId })
    expect(cardRepository.get).toHaveBeenCalledTimes(1)
  })

  it('should not call CardRepository if TypePayment is billet', async () => {
    await sut.execute({ ticketId, price, paymentType: 'billet', userId, cardId: null, installments })

    expect(cardRepository.get).not.toHaveBeenCalled()
  })

  it('should throw CardNotFoundError if CardRepository return undefined', async () => {
    cardRepository.get.mockResolvedValueOnce(undefined)

    const promise = sut.execute({ ticketId, price, paymentType, userId, cardId, installments })

    await expect(promise).rejects.toThrow(new CardNotFoundError())
  })

  it('should call method makePayment of PaymentGateway with correct values', async () => {
    await sut.execute({ ticketId, price, paymentType, userId, cardId, installments })

    expect(paymentGateway.makePayment).toHaveBeenCalledWith({ transactionId, user, card, total: price, paymentType, installments, dueDate })
    expect(paymentGateway.makePayment).toHaveBeenCalledTimes(1)
  })

  it('should call TransactionRepository with instance of TransactionEntity', async () => {
    await sut.execute({ ticketId, price, paymentType, userId, cardId, installments })

    expect(transactionRepository.save).toHaveBeenCalledWith(expect.any(Transaction))
    expect(transactionRepository.save).toHaveBeenCalledTimes(1)
  })

  it('should call PaymentProcessed with correct values', async () => {
    await sut.execute({ ticketId, price, paymentType, userId, cardId, installments })

    expect(PaymentProcessed).toHaveBeenCalledWith(paymentType, ticketId, url, status)
    expect(PaymentProcessed).toHaveBeenCalledTimes(1)
  })

  it('should call QueueAdapter with correct values', async () => {
    await sut.execute({ ticketId, price, paymentType, userId, cardId, installments })

    expect(queue.publish).toHaveBeenCalledWith({ queueName: 'paymentProcessed', data: expect.any(PaymentProcessed) })
    expect(queue.publish).toHaveBeenCalledTimes(1)
  })
})
