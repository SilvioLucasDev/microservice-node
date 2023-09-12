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
  let number: string
  let complements: string

  let sut: PgUserRepository

  beforeEach(() => {
    id = 'any_id'
    name = 'any_name'
    document = 'any_document'
    email = 'any_email'
    mobilePhone = 'any_mobile_phone'
    zipcode = 'any_zipcode'
    number = 'any_number'
    complements = 'any_complements'

    sut = new PgUserRepository()
  })

  afterAll(async () => {
    await prismaMock.$disconnect()
  })

  it('should return user if exists', async () => {
    prismaMock.user.findFirst.mockResolvedValueOnce({
      id, name, document, email, mobile_phone: mobilePhone, addresses: [{ zipcode, number, complements }]
    } as unknown as Prisma.Prisma__UserClient<UserPrisma>)

    const user = await sut.get({ id })

    expect(user).toEqual({ id, name, document, email, mobilePhone, zipcode, number, complements })
  })

  it('should return undefined if user not exists', async () => {
    prismaMock.user.findFirst.mockResolvedValueOnce(null)

    const user = await sut.get({ id })

    expect(user).toBeUndefined()
  })
})
