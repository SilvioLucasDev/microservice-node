import { TokenizeCardController } from '@/presentation/controllers'
import { Required, RequiredNumber, RequiredString, ValidationComposite } from '@/presentation/validation'
import { ServerError } from '@/presentation/errors'
import { type TokenizeCardUseCase } from '@/application/use-cases'

import { mock, type MockProxy } from 'jest-mock-extended'

jest.mock('@/presentation/validation/composite')

describe('TokenizeCardController', () => {
  let alias: string
  let holderName: string
  let number: string
  let expiryMonth: string
  let expiryYear: string
  let cvv: string
  let userId: string
  let cardId: string

  let sut: TokenizeCardController
  let tokenizeCardUseCase: MockProxy<TokenizeCardUseCase>

  beforeAll(() => {
    alias = 'any_alias'
    holderName = 'any_holder_Name'
    number = 'any_number'
    expiryMonth = 'any_expiry_Month'
    expiryYear = 'any_expiry_Year'
    cvv = 'any_cvv'
    userId = 'any_user_Id'
    cardId = 'any_card_Id'

    tokenizeCardUseCase = mock()
    tokenizeCardUseCase.execute.mockResolvedValue({ cardId })
  })

  beforeEach(() => {
    sut = new TokenizeCardController(tokenizeCardUseCase)
  })

  it('should return 400 if validation fails', async () => {
    const error = new Error('validation_error')
    const ValidationCompositeSpy = jest.fn().mockImplementationOnce(() => ({
      validate: jest.fn().mockReturnValueOnce(error)
    }))
    jest.mocked(ValidationComposite).mockImplementationOnce(ValidationCompositeSpy)

    const httpResponse = await sut.handle({ alias, holderName, number, expiryMonth, expiryYear, cvv, userId })

    expect(ValidationComposite).toHaveBeenCalledWith([
      new Required(alias, 'alias'),
      new RequiredString(alias, 'alias'),
      new Required(holderName, 'holderName'),
      new RequiredString(holderName, 'holderName'),
      new Required(number, 'number'),
      new RequiredString(number, 'number'),
      new Required(expiryMonth, 'expiryMonth'),
      new RequiredString(expiryMonth, 'expiryMonth'),
      new Required(expiryYear, 'expiryYear'),
      new RequiredString(expiryYear, 'expiryYear'),
      new Required(cvv, 'cvv'),
      new RequiredNumber(cvv, 'cvv'),
      new Required(userId, 'userId'),
      new RequiredString(userId, 'userId')
    ])
    expect(httpResponse).toEqual({
      statusCode: 400,
      data: error
    })
  })

  it('should call method execute of TokenizeCardUseCase with correct params', async () => {
    await sut.handle({ alias, holderName, number, expiryMonth, expiryYear, cvv, userId })

    expect(tokenizeCardUseCase.execute).toHaveBeenCalledWith({ alias, holderName, number, expiryMonth, expiryYear, cvv, userId })
    expect(tokenizeCardUseCase.execute).toHaveBeenCalledTimes(1)
  })

  it('should return 500 if tokenize card throws', async () => {
    const error = new Error('infra_error')
    tokenizeCardUseCase.execute.mockRejectedValueOnce(error)

    const httpResponse = await sut.handle({ alias, holderName, number, expiryMonth, expiryYear, cvv, userId })

    expect(httpResponse).toEqual({
      statusCode: 500,
      data: new ServerError(error)
    })
  })

  it('should return 200 if tokenize card succeeds', async () => {
    const httpResponse = await sut.handle({ alias, holderName, number, expiryMonth, expiryYear, cvv, userId })

    expect(httpResponse).toEqual({
      statusCode: 200,
      data: { cardId }
    })
  })
})
