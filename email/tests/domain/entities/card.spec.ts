import { Card } from '@/domain/entities'
import { type UUIDGenerator } from '@/application/contracts/adapters'

import { mock, type MockProxy } from 'jest-mock-extended'

describe('CardEntity', () => {
  let cardId: string
  let userId: string
  let alias: string
  let number: string
  let brand: string
  let token: string

  let sut: Card
  let crypto: MockProxy<UUIDGenerator>

  beforeAll(() => {
    cardId = 'any_card_id'
    userId = 'any_user_id'
    alias = 'any_alias'
    number = 'any_number'
    brand = 'any_brand'
    token = 'any_token'

    crypto = mock()
    crypto.uuid.mockReturnValue(cardId)
  })

  it('should return instance of CardEntity with correct values', () => {
    sut = Card.create({ userId, alias, number, brand, token }, crypto)

    expect(sut).toStrictEqual(new Card(cardId, userId, alias, number, brand, token))
  })
})
