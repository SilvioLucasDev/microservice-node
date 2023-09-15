import { GetUserUseCase } from '@/application/use-cases'
import { type GetUser } from '@/application/contracts/repositories'

import { mock, type MockProxy } from 'jest-mock-extended'

describe('GetUserUseCase', () => {
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
  let user: GetUser.Output

  let sut: GetUserUseCase
  let userRepository: MockProxy<GetUser>

  beforeAll(() => {
    userId = 'any_user_id'
    name = 'any_name'
    document = 'any_document'
    email = 'any_email'
    mobilePhone = 'any_mobile_phone'
    zipcode = 'any_zipcode'
    address = 'any_address'
    number = 'any_number'
    complement = 'any_complement'
    neighborhood = 'any_neighborhood'
    user = { id: userId, name, document, email, mobilePhone, zipcode, address, number, complement, neighborhood }

    userRepository = mock()
    userRepository.get.mockResolvedValue(user)
  })

  beforeEach(() => {
    sut = new GetUserUseCase(userRepository)
  })
  it('should call method get of UserRepository with correct values', async () => {
    await sut.execute({ userId })

    expect(userRepository.get).toHaveBeenCalledWith({ id: userId })
    expect(userRepository.get).toHaveBeenCalledTimes(1)
  })

  it('should return an user data on success', async () => {
    const result = await sut.execute({ userId })

    expect(result).toEqual({ user })
  })
})
