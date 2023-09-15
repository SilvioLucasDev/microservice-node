import { prismaMock } from '@/tests/infra/repositories/postgres/mocks'
import { PgCardRepository } from '@/infra/repositories/postgres'
import { type UUIDGenerator } from '@/application/contracts/adapters'
import { Card } from '@/domain/entities'

import { type Prisma, type Card as CardPrisma } from '@prisma/client'
import { mock, type MockProxy } from 'jest-mock-extended'

describe('PgCardRepository', () => {
  let userId: string
  let id: string
  let alias: string
  let number: string
  let brand: string
  let token: string
  let createdAt: Date
  let updatedAt: Date

  let sut: PgCardRepository
  let crypto: MockProxy<UUIDGenerator>

  beforeEach(() => {
    userId = 'any_user_id'
    id = 'any_id'
    alias = 'any_alias'
    number = 'any_number'
    brand = 'any_brand'
    token = 'any_token'
    createdAt = new Date()
    updatedAt = new Date()

    sut = new PgCardRepository()
    crypto = mock()
  })

  afterAll(async () => {
    await prismaMock.$disconnect()
  })

  it('should return undefined an create new card', async () => {
    prismaMock.card.create.mockResolvedValue({ id, user_id: userId, alias, number, brand, token, created_at: createdAt, updated_at: updatedAt })
    const cardEntity = Card.create({ userId, alias, number, brand, token }, crypto)

    const result = sut.save(cardEntity)

    await expect(result).resolves.toBeUndefined()
  })

  it('should return card if exists', async () => {
    prismaMock.card.findUnique.mockResolvedValueOnce({ id, alias, token } as unknown as Prisma.Prisma__CardClient<CardPrisma>)

    const card = await sut.get({ id })

    expect(card).toEqual({ id, alias, token })
  })

  it('should return undefined if card not exists', async () => {
    prismaMock.card.findUnique.mockResolvedValueOnce(null)

    const card = await sut.get({ id })

    expect(card).toBeUndefined()
  })
})
