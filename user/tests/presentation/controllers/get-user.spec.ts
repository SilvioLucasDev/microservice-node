import { GetUserController } from '@/presentation/controllers'
import { Required, RequiredString, ValidationComposite } from '@/presentation/validation'
import { ServerError } from '@/presentation/errors'
import { type GetUserUseCase } from '@/application/use-cases'

import { mock, type MockProxy } from 'jest-mock-extended'

jest.mock('@/presentation/validation/composite')

describe('GetUserController', () => {
  let userId: string
  let name: string
  let document: string
  let email: string
  let mobilePhone: string
  let zipcode: string
  let address: string
  let number: string
  let complement: string
  let neighborhood: string
  let user: object

  let sut: GetUserController
  let getUserUseCase: MockProxy<GetUserUseCase>

  beforeAll(() => {
    userId = '443315ee-4c25-11ee-be56-0242ac120002'
    name = 'Any User Test'
    document = '60062039016'
    email = 'any_user@hotmail.com'
    mobilePhone = 'any_mobile_phone'
    zipcode = '77006516'
    address = 'Quadra 408 Norte Avenida'
    number = '8'
    complement = 'a'
    neighborhood = 'Plano Diretor Norte'
    user = { id: userId, name, document, email, mobilePhone, zipcode, address, number, complement, neighborhood }

    getUserUseCase = mock()
    getUserUseCase.execute.mockResolvedValue({ user })
  })

  beforeEach(() => {
    sut = new GetUserController(getUserUseCase)
  })

  it('should return 400 if validation fails', async () => {
    const error = new Error('validation_error')
    const ValidationCompositeSpy = jest.fn().mockImplementationOnce(() => ({
      validate: jest.fn().mockReturnValueOnce(error)
    }))
    jest.mocked(ValidationComposite).mockImplementationOnce(ValidationCompositeSpy)

    const httpResponse = await sut.handle({ userId })

    expect(ValidationComposite).toHaveBeenCalledWith([
      new Required(userId, 'userId'),
      new RequiredString(userId, 'userId')
    ])
    expect(httpResponse).toEqual({
      statusCode: 400,
      data: error
    })
  })

  it('should call method execute of GetUserUseCase with correct params', async () => {
    await sut.handle({ userId })

    expect(getUserUseCase.execute).toHaveBeenCalledWith({ userId })
    expect(getUserUseCase.execute).toHaveBeenCalledTimes(1)
  })

  it('should return 500 if get user throws', async () => {
    const error = new Error('app_error')
    getUserUseCase.execute.mockRejectedValueOnce(error)

    const httpResponse = await sut.handle({ userId })

    expect(httpResponse).toEqual({
      statusCode: 500,
      data: new ServerError(error)
    })
  })

  it('should return 200 if get user succeeds', async () => {
    const httpResponse = await sut.handle({ userId })

    expect(httpResponse).toEqual({
      statusCode: 200,
      data: { user }
    })
  })
})
