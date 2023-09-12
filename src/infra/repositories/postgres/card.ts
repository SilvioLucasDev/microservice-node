import { type GetCard } from '@/application/contracts/repositories'
import prisma from '@/infra/repositories/postgres/helpers/connection'

export class PgCardRepository implements GetCard {
  async get ({ id }: GetCard.Input): Promise<GetCard.Output> {
    const card = await prisma.card.findFirst({
      where: {
        id
      },
      select: {
        id: true,
        alias: true,
        token: true
      }
    })
    if (card !== null && card !== undefined) {
      return {
        id: card.id,
        alias: card.alias,
        token: card.token
      }
    }
  }
}
