import { type GetClient, type TokenizeCard, type UUIDGenerator } from '@/application/contracts/adapters'
import { type SaveCard } from '@/application/contracts/repositories'
import { Card } from '@/domain/entities'
import { env } from '@/main/config/env'

export class TokenizeCardUseCase {
  constructor (
    private readonly cardRepository: SaveCard,
    private readonly httpClient: GetClient,
    private readonly paymentGateway: TokenizeCard,
    private readonly crypto: UUIDGenerator
  ) {}

  async execute ({ alias, holderName, number, expiryMonth, expiryYear, cvv, userId }: Input): Promise<Output> {
    const user = await this.httpClient.get({ url: `${env.userMsUrl}/users/${userId}` })
    const tokenCard = await this.paymentGateway.tokenizeCard({ user, holderName, number, expiryMonth, expiryYear, cvv })
    const card = Card.create({ alias, number: tokenCard.number, brand: tokenCard.brand, token: tokenCard.token, userId }, this.crypto)
    await this.cardRepository.save(card)
    return { cardId: card.id }
  }
}

type Input = {
  alias: string
  holderName: string
  number: string
  expiryMonth: string
  expiryYear: string
  cvv: string
  userId: string
}

type Output = {
  cardId: string
}
