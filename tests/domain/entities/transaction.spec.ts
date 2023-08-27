import { type UUIDGenerator } from '@/application/contracts/adapters'
import { Transaction } from '@/domain/entities'

import { mock, type MockProxy } from 'jest-mock-extended'

describe('TransactionEntity', () => {
  let eventId: string
  let ticketId: string
  let tid: string
  let price: string
  let status: string
  let transactionId: string

  let sut: Transaction
  let crypto: MockProxy<UUIDGenerator>

  beforeAll(() => {
    eventId = 'any_event_id'
    ticketId = 'any_ticket_id'
    tid = 'any_tid'
    price = 'any_price'
    status = 'any_status'
    transactionId = 'any_transaction_id'

    crypto = mock()
    crypto.uuid.mockReturnValue(transactionId)
  })

  beforeEach(() => {
    sut = Transaction.create({ eventId, ticketId, tid, price, status }, crypto)
  })

  it('should return instance of TransactionEntity with correct values', () => {
    expect(sut).toStrictEqual(new Transaction(transactionId, eventId, ticketId, tid, price, status))
  })
})
