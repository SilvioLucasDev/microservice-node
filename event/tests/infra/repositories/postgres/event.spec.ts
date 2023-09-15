import { prismaMock } from '@/tests/infra/repositories/postgres/mocks'
import { PgEventRepository } from '@/infra/repositories/postgres'

import { type Prisma, type Event as EventPrisma } from '@prisma/client'

describe('PgEventRepository', () => {
  let id: string
  let name: string
  let price: number

  let sut: PgEventRepository

  beforeEach(() => {
    id = 'any_id'
    name = 'any_name'
    price = 300

    sut = new PgEventRepository()
  })

  afterAll(async () => {
    await prismaMock.$disconnect()
  })

  it('should return event if exists', async () => {
    prismaMock.event.findUnique.mockResolvedValueOnce({ id, name, price } as unknown as Prisma.Prisma__EventClient<EventPrisma>)

    const event = await sut.get({ id })

    expect(event).toEqual({ id, name, price })
  })

  it('should return undefined if event not exists', async () => {
    prismaMock.event.findUnique.mockResolvedValueOnce(null)

    const event = await sut.get({ id })

    expect(event).toBeUndefined()
  })
})
