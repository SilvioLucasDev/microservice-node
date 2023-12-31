import { getDueDate } from '@/tests/helpers'
import { ProcessPaymentUseCase } from '@/application/use-cases'
import { type GetClient, type MakePayment, type UUIDGenerator } from '@/application/contracts/adapters'
import { type GetCard, type SaveTransaction } from '@/application/contracts/repositories'
import { CardNotFoundError } from '@/application/errors'
import { Transaction } from '@/domain/entities'

import { mock, type MockProxy } from 'jest-mock-extended'
import MockDate from 'mockdate'

jest.mock('@/domain/event/payment-processed')

describe('ProcessPaymentUseCase', () => {
  let ticketId: string
  let transactionId: string
  let eventName: string
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
  let mobilePhone: string
  let zipcode: string
  let address: string
  let number: string
  let complement: string
  let neighborhood: string
  let alias: string
  let token: string
  let tid: string
  let url: string
  let processorResponse: string
  let status: string
  let userMsUrl: string
  let user: object
  let card: object

  let sut: ProcessPaymentUseCase
  let transactionEntity: jest.SpyInstance
  let cardRepository: MockProxy<GetCard>
  let transactionRepository: MockProxy<SaveTransaction>
  let httpClient: MockProxy<GetClient>
  let paymentGateway: MockProxy<MakePayment>
  let crypto: MockProxy<UUIDGenerator>

  beforeAll(() => {
    MockDate.set(new Date())

    ticketId = 'any_ticket_id'
    transactionId = 'any_transaction_id'
    eventName = 'any_event_name'
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
    mobilePhone = 'any_mobile_phone'
    zipcode = 'any_zipcode'
    address = 'any_address'
    number = 'any_number'
    complement = 'any_complement'
    neighborhood = 'any_neighborhood'
    alias = 'any_alias'
    token = 'any_token'
    tid = 'any_tid'
    url = 'any_url'
    processorResponse = 'any_processor_response'
    status = 'approved'
    userMsUrl = 'any_url'
    user = { id, name, document, email, mobilePhone, zipcode, address, number, complement, neighborhood }
    card = { id, alias, token }

    transactionEntity = jest.spyOn(Transaction, 'create')
    cardRepository = mock()
    cardRepository.get.mockResolvedValue({ id, alias, token })
    transactionRepository = mock()
    httpClient = mock()
    httpClient.get.mockResolvedValue({ id, name, document, email, mobilePhone, zipcode, address, number, complement, neighborhood })
    paymentGateway = mock()
    paymentGateway.makePayment.mockResolvedValue({ transactionId: tid, status, url, processorResponse })
    crypto = mock()
    crypto.uuid.mockReturnValue(transactionId)
  })

  beforeEach(() => {
    sut = new ProcessPaymentUseCase(userMsUrl, cardRepository, transactionRepository, httpClient, paymentGateway, crypto)
  })

  afterAll(() => {
    MockDate.reset()
  })

  it('should call method create of TransactionEntity with correct values', async () => {
    await sut.execute({ ticketId, eventName, price, paymentType, userId, cardId, installments })

    expect(transactionEntity).toHaveBeenCalledWith({ ticketId, paymentType, cardId, total: price, installments }, crypto)
    expect(transactionEntity).toHaveBeenCalledTimes(1)
  })

  it('should call method get of HttpClient with correct values', async () => {
    await sut.execute({ ticketId, eventName, price, paymentType, userId, cardId, installments })

    expect(httpClient.get).toHaveBeenCalledWith({ url: `${userMsUrl}/users/${userId}` })
    expect(httpClient.get).toHaveBeenCalledTimes(1)
  })

  it('should call method get of CardRepository with correct values', async () => {
    await sut.execute({ ticketId, eventName, price, paymentType, userId, cardId, installments })

    expect(cardRepository.get).toHaveBeenCalledWith({ id: cardId })
    expect(cardRepository.get).toHaveBeenCalledTimes(1)
  })

  it('should not call method get of CardRepository if TypePayment is billet', async () => {
    await sut.execute({ ticketId, eventName, price, paymentType: 'billet', userId, cardId: null, installments })

    expect(cardRepository.get).not.toHaveBeenCalled()
  })

  it('should rethrow CardNotFoundError if CardRepository return undefined', async () => {
    cardRepository.get.mockResolvedValueOnce(undefined)

    const promise = sut.execute({ ticketId, eventName, price, paymentType, userId, cardId, installments })

    await expect(promise).rejects.toThrow(new CardNotFoundError())
  })

  it('should call method makePayment of PaymentGateway with correct values', async () => {
    await sut.execute({ ticketId, eventName, price, paymentType, userId, cardId, installments })

    expect(paymentGateway.makePayment).toHaveBeenCalledWith({ user, card, eventName, total: price, paymentType, installments, dueDate, externalReference: `${transactionId}&${ticketId}` })
    expect(paymentGateway.makePayment).toHaveBeenCalledTimes(1)
  })

  it('should call method save of TransactionRepository with instance of TransactionEntity', async () => {
    await sut.execute({ ticketId, eventName, price, paymentType, userId, cardId, installments })

    expect(transactionRepository.save).toHaveBeenCalledWith(expect.any(Transaction))
    expect(transactionRepository.save).toHaveBeenCalledTimes(1)
  })
})
