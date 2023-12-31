import { type GetClient, type PostClient, type MakePayment, type User } from '@/application/contracts/adapters'
import { AsaasGateway } from '@/infra/adapters/gateways'

import { mock, type MockProxy } from 'jest-mock-extended'

describe('AsaasGateway', () => {
  let transactionId: string
  let ticketId: string
  let eventName: string
  let total: number
  let paymentType: string
  let installments: number
  let dueDate: Date
  let tid: string
  let status: string
  let url: string
  let processorResponse: string
  let invoiceUrl: string
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
  let brand: string
  let holderName: string
  let expiryMonth: string
  let expiryYear: string
  let cvv: string
  let baseUrl: string
  let apiKey: string
  let user: User
  let card: MakePayment.Card

  let sut: AsaasGateway
  let httpClient: MockProxy<GetClient & PostClient>

  beforeAll(() => {
    transactionId = 'any_transaction_id'
    ticketId = 'any_ticket_id'
    eventName = 'any_event_name'
    total = 300
    paymentType = 'credit_card'
    installments = 3
    dueDate = new Date()
    tid = 'any_tid'
    status = 'approved'
    url = 'any_url'
    processorResponse = '{"id":"any_tid","status":"CONFIRMED","invoiceUrl":"any_url"}'
    invoiceUrl = 'any_url'
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
    brand = 'any_brand'
    holderName = 'any_holder_name'
    expiryMonth = 'any_expiry_month'
    expiryYear = 'any_expiry_year'
    cvv = 'any_cvv'
    baseUrl = 'any_api_key'
    apiKey = 'any_api_key'
    user = { id, name, document, email, mobilePhone, zipcode, address, number, complement, neighborhood }
    card = { id, alias, token }

    httpClient = mock()
    httpClient.get.mockResolvedValue({ data: [{ id }] })
    httpClient.post.mockResolvedValue({ id: tid, status: 'CONFIRMED', invoiceUrl })
  })

  beforeEach(() => {
    sut = new AsaasGateway(httpClient, baseUrl, apiKey)
  })

  describe('MakePayment', () => {
    it('should return tid, status, url and processorResponse when payment is processed', async () => {
      const result = await sut.makePayment({ user, card, eventName, total, paymentType, installments, dueDate, externalReference: `${transactionId}&${ticketId}` })

      expect(result.transactionId).toBe(tid)
      expect(result.status).toBe(status)
      expect(result.url).toBe(url)
      expect(result.processorResponse).toBe(processorResponse)
    })

    it('should create new user if user not exists', async () => {
      httpClient.get.mockResolvedValueOnce({ data: [] })
      httpClient.post
        .mockResolvedValueOnce({ id })
        .mockResolvedValueOnce({ id: tid, status: 'CONFIRMED', invoiceUrl })

      const result = await sut.makePayment({ user, card, eventName, total, paymentType, installments, dueDate, externalReference: `${transactionId}&${ticketId}` })

      expect(result.transactionId).toBe(tid)
      expect(result.status).toBe(status)
      expect(result.url).toBe(url)
      expect(result.processorResponse).toBe(processorResponse)
    })

    it('should return status as error when the request fails', async () => {
      httpClient.get.mockImplementationOnce(() => { throw new Error('http_error') })

      const result = await sut.makePayment({ user, card, eventName, total, paymentType, installments, dueDate, externalReference: `${transactionId}&${ticketId}` })

      expect(result.status).toBe('error')
    })
  })

  describe('TokenizeCard', () => {
    it('should return number, brand and token when tokenize is succeeds', async () => {
      httpClient.get.mockResolvedValueOnce({ data: [{ id }] })
      httpClient.post.mockResolvedValueOnce({ creditCardNumber: number, creditCardBrand: brand, creditCardToken: token })

      const result = await sut.tokenizeCard({ user, holderName, number, expiryMonth, expiryYear, cvv })

      expect(result.number).toBe(number)
      expect(result.brand).toBe(brand)
      expect(result.token).toBe(token)
    })

    it('should create new user if user not exists', async () => {
      httpClient.get.mockResolvedValueOnce({ data: [] })
      httpClient.post
        .mockResolvedValueOnce({ id })
        .mockResolvedValueOnce({ creditCardNumber: number, creditCardBrand: brand, creditCardToken: token })

      const result = await sut.tokenizeCard({ user, holderName, number, expiryMonth, expiryYear, cvv })

      expect(result.number).toBe(number)
      expect(result.brand).toBe(brand)
      expect(result.token).toBe(token)
    })
  })
})
