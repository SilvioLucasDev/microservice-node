import { type MakePayment, type UUIDGenerator } from '@/application/contracts/adapters'
import { FakePaymentGateway } from '@/infra/adapters/gateways'

import { mock, type MockProxy } from 'jest-mock-extended'

describe('FakePaymentGateway', () => {
  let transactionId: string
  let eventName: string
  let total: number
  let paymentType: string
  let installments: number
  let dueDate: Date
  let tid: string
  let status: string
  let url: string
  let processorResponse: string
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
  let user: MakePayment.User
  let card: MakePayment.Card

  let sut: FakePaymentGateway
  let crypto: MockProxy<UUIDGenerator>

  beforeAll(() => {
    transactionId = 'any_transaction_id'
    eventName = 'any_event_name'
    total = 300
    paymentType = 'credit_card'
    installments = 3
    dueDate = new Date()
    tid = 'any_tid'
    status = 'approved'
    url = 'any_url'
    processorResponse = 'Retorno do gateway'
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
    user = { id, name, document, email, mobilePhone, zipcode, address, number, complement, neighborhood }
    card = { id, alias, token }

    crypto = mock()
    crypto.uuid.mockReturnValue(tid)
  })

  beforeEach(() => {
    sut = new FakePaymentGateway(crypto)
  })

  it('should return tid, status, url and processorResponse when payment is processed', async () => {
    const result = await sut.makePayment({ transactionId, user, card, eventName, total, paymentType, installments, dueDate })

    expect(result.transactionId).toBe(tid)
    expect(result.status).toBe(status)
    expect(result.url).toBe(url)
    expect(result.processorResponse).toBe(processorResponse)
  })
})
