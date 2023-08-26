import { prismaMock } from '@/tests/infra/repositories/postres/mocks'
import { PgEventRepository } from '@/infra/repositories/postgres'

describe('PgEventRepository', () => {
  let sut: PgEventRepository
  let id: string

  beforeEach(() => {
    sut = new PgEventRepository()
    id = 'any_id'
  })

  afterAll(async () => {
    await prismaMock.$disconnect()
  })

  it('should return event if exists', async () => {
    const result = {
      id,
      name: 'any_name',
      description: 'any_description',
      price: 300,
      capacity: 10000
    }
    prismaMock.event.findFirst.mockResolvedValueOnce(result)

    const event = await sut.get({ id })

    expect(event).toEqual({
      id,
      price: '300'
    })
  })

  it('should return undefined if event not exists', async () => {
    prismaMock.event.findFirst.mockResolvedValueOnce(null)

    const event = await sut.get({ id })

    expect(event).toBeUndefined()
  })
})
