import { prismaMock } from '@/tests/infra/repositories/postgres/mocks'
import { PgUserRepository } from '@/infra/repositories/postgres'

import { type Prisma, type User as UserPrisma } from '@prisma/client'

describe('PgUserRepository', () => {
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

  let sut: PgUserRepository

  beforeEach(() => {
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

    sut = new PgUserRepository()
  })

  afterAll(async () => {
    await prismaMock.$disconnect()
  })

  it('should return user if exists', async () => {
    prismaMock.user.findFirst.mockResolvedValueOnce({
      id, name, document, email, mobile_phone: mobilePhone, addresses: [{ zipcode, address, number, complement, neighborhood }]
    } as unknown as Prisma.Prisma__UserClient<UserPrisma>)

    const user = await sut.get({ id })

    expect(user).toEqual({ id, name, document, email, mobilePhone, zipcode, address, number, complement, neighborhood })
  })

  it('should return undefined if user not exists', async () => {
    prismaMock.user.findFirst.mockResolvedValueOnce(null)

    const user = await sut.get({ id })

    expect(user).toBeUndefined()
  })
})
