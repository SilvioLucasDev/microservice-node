import prisma from '@/infra/repositories/postgres/helpers/connection'
import { type SaveCard, type GetCard } from '@/application/contracts/repositories'

export class PgCardRepository implements GetCard, SaveCard {
  async save ({ id, userId, alias, number, brand, token }: SaveCard.Input): Promise<void> {
    await prisma.card.create({
      data: { id, user_id: userId, alias, number, brand, token }
    })
  }

  async get ({ id }: GetCard.Input): Promise<GetCard.Output> {
    const card = await prisma.card.findUnique({
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
