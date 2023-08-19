import { type GetEvent } from '@/application/contracts/repositories'
import prisma from '@/infra/repositories/postgres/helpers/connection'

export class PgEventRepository implements GetEvent {
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
