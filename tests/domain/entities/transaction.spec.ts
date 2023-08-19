import { type UUIDGenerator } from '@/application/contracts/adapters'
import { Transaction } from '@/domain/entities'

import { mock, type MockProxy } from 'jest-mock-extended'

describe('TransactionEntity', () => {
  let sut: Transaction
  let crypto: MockProxy<UUIDGenerator>

  beforeAll(() => {
    crypto = mock()
    crypto.uuid.mockReturnValue('any_transaction_id')
  })

  beforeEach(() => {
    sut = Transaction.create({ eventId: 'any_event_id', ticketId: 'any_ticket_id', price: 'any_price' }, crypto)
  })

  it('should return instance of Transaction with correct values', () => {
    expect(sut).toStrictEqual(new Transaction(
      'any_transaction_id',
      'any_event_id',
      'any_ticket_id',
      'any_price',
      'processing'
    ))
  })
})
