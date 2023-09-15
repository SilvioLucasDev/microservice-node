import { TokenizeCardUseCase } from '@/application/use-cases'
import { type TokenizeCard, type UUIDGenerator } from '@/application/contracts/adapters'
import { type SaveCard, type GetUser } from '@/application/contracts/repositories'

import { mock, type MockProxy } from 'jest-mock-extended'
import { Card } from '@/domain/entities'

describe('TokenizeCardUseCase', () => {
  let cardId: string
  let alias: string
  let holderName: string
  let number: string
  let expiryMonth: string
  let expiryYear: string
  let cvv: string
  let userId: string
  let name: string
  let document: string
  let email: string
  let mobilePhone: string
  let zipcode: string
  let address: string
  let complement: string
  let neighborhood: string
  let user: object

  let brand: string
  let token: string

  let sut: TokenizeCardUseCase
  let cardEntity: jest.SpyInstance
  let userRepository: MockProxy<GetUser>
  let cardRepository: MockProxy<SaveCard>
  let paymentGateway: MockProxy<TokenizeCard>
  let crypto: MockProxy<UUIDGenerator>

  beforeAll(() => {
    cardId = 'any_card_id'
    alias = 'any_alias'
    holderName = 'any_holder_name'
    expiryMonth = 'any_expiry_month'
    expiryYear = 'any_expiry_year'
    cvv = 'any_cvv'
    userId = 'any_user_id'
    name = 'any_name'
    document = 'any_document'
    email = 'any_email'
    mobilePhone = 'any_mobile_phone'
    zipcode = 'any_zipcode'
    address = 'any_address'
    complement = 'any_complement'
    neighborhood = 'any_neighborhood'
    user = { id: userId, name, document, email, mobilePhone, zipcode, address, number, complement, neighborhood }
    brand = 'any_brand'
    token = 'any_token'

    cardEntity = jest.spyOn(Card, 'create')
    userRepository = mock()
    userRepository.get.mockResolvedValue({ id: userId, name, document, email, mobilePhone, zipcode, address, number, complement, neighborhood })
    cardRepository = mock()
    paymentGateway = mock()
    paymentGateway.tokenizeCard.mockResolvedValue({ number, brand, token })
    crypto = mock()
    crypto.uuid.mockReturnValue(cardId)
  })

  beforeEach(() => {
    sut = new TokenizeCardUseCase(userRepository, cardRepository, paymentGateway, crypto)
  })
  it('should call method get of UserRepository with correct values', async () => {
    await sut.execute({ alias, holderName, number, expiryMonth, expiryYear, cvv, userId })

    expect(userRepository.get).toHaveBeenCalledWith({ id: userId })
    expect(userRepository.get).toHaveBeenCalledTimes(1)
  })

  it('should call method tokenizeCard of PaymentGateway with correct values', async () => {
    await sut.execute({ alias, holderName, number, expiryMonth, expiryYear, cvv, userId })

    expect(paymentGateway.tokenizeCard).toHaveBeenCalledWith({ user, holderName, number, expiryMonth, expiryYear, cvv })
    expect(paymentGateway.tokenizeCard).toHaveBeenCalledTimes(1)
  })

  it('should call method create of cardEntity with correct values', async () => {
    await sut.execute({ alias, holderName, number, expiryMonth, expiryYear, cvv, userId })

    expect(cardEntity).toHaveBeenCalledWith({ alias, number, brand, token, userId }, crypto)
    expect(cardEntity).toHaveBeenCalledTimes(1)
  })

  it('should call method save of CardRepository with instance of cardEntity', async () => {
    await sut.execute({ alias, holderName, number, expiryMonth, expiryYear, cvv, userId })

    expect(cardRepository.save).toHaveBeenCalledWith(expect.any(Card))
    expect(cardRepository.save).toHaveBeenCalledTimes(1)
  })

  it('should return an cardId on success', async () => {
    const result = await sut.execute({ alias, holderName, number, expiryMonth, expiryYear, cvv, userId })

    expect(result).toEqual({ cardId })
  })
})
