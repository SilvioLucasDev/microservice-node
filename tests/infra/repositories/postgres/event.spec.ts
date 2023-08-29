import { prismaMock } from '@/tests/infra/repositories/postgres/mocks'
import { PgEventRepository } from '@/infra/repositories/postgres'

import { type Prisma, type Event as EventPrisma } from '@prisma/client'

describe('PgEventRepository', () => {
  let id: string

  let sut: PgEventRepository

  beforeEach(() => {
    id = 'any_id'

    sut = new PgEventRepository()
  })

  afterAll(async () => {
    await prismaMock.$disconnect()
  })

  it('should return event if exists', async () => {
    prismaMock.event.findFirst.mockResolvedValueOnce({ id, price: 300 } as unknown as Prisma.Prisma__EventClient<EventPrisma>)

    const event = await sut.get({ id })

    expect(event).toEqual({ id, price: '300' })
  })

  it('should return undefined if event not exists', async () => {
    prismaMock.event.findFirst.mockResolvedValueOnce(null)

    const event = await sut.get({ id })

    expect(event).toBeUndefined()
  })
})
