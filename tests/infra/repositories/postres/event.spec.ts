import { type GetEvent } from '@/domain/contracts/repos'
import { prismaMock } from '@/tests/infra/repositories/postres/helpers'
import prisma from '@/infra/repositories/postgres/helpers/connection'

class PgEventRepository implements GetEvent {
  async get ({ id }: GetEvent.Input): Promise<GetEvent.Output> {
    const event = await prisma.event.findFirst({
      where: {
        id
      },
      select: {
        id: true,
        price: true
      }
    })

    if (event !== null) {
      return {
        id: event.id,
        price: event.price.toString()
      }
    }
  }
}

describe('PgEventRepository', () => {
  const sut = new PgEventRepository()

  it('should return event if exists', async () => {
    const result = {
      id: 'any_id',
      description: 'any_description',
      price: 300,
      capacity: 10000
    }
    prismaMock.event.findFirst.mockResolvedValueOnce(result)

    const event = await sut.get({ id: 'any_id' })

    expect(event).toEqual({
      id: 'any_id',
      price: '300'
    })
  })

  it('should return undefined if event not exists', async () => {
    prismaMock.event.findFirst.mockResolvedValueOnce(null)

    const event = await sut.get({ id: 'any_id' })

    expect(event).toBeUndefined()
  })
})
