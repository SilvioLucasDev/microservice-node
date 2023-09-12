import { prismaMock } from '@/tests/infra/repositories/postgres/mocks'
import { PgCardRepository } from '@/infra/repositories/postgres'

import { type Prisma, type Card as CardPrisma } from '@prisma/client'

describe('PgCardRepository', () => {
  let id: string
  let alias: string
  let token: string

  let sut: PgCardRepository

  beforeEach(() => {
    id = 'any_id'
    alias = 'any_alias'
    token = 'any_token'

    sut = new PgCardRepository()
  })

  afterAll(async () => {
    await prismaMock.$disconnect()
  })

  it('should return card if exists', async () => {
    prismaMock.card.findFirst.mockResolvedValueOnce({ id, alias, token } as unknown as Prisma.Prisma__CardClient<CardPrisma>)

    const card = await sut.get({ id })

    expect(card).toEqual({ id, alias, token })
  })

  it('should return undefined if card not exists', async () => {
    prismaMock.card.findFirst.mockResolvedValueOnce(null)

    const card = await sut.get({ id })

    expect(card).toBeUndefined()
  })
})
