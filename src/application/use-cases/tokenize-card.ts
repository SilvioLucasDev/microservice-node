import { type TokenizeCard, type UUIDGenerator } from '@/application/contracts/adapters'
import { type GetUser, type SaveCard } from '@/application/contracts/repositories'
import { Card } from '@/domain/entities'

export class TokenizeCardUseCase {
  constructor (
    private readonly userRepository: GetUser,
    private readonly cardRepository: SaveCard,
    private readonly paymentGateway: TokenizeCard,
    private readonly crypto: UUIDGenerator
  ) {}

  async execute ({ alias, holderName, number, expiryDate, cvv, userId }: Input): Promise<Output> {
    const user = await this.userRepository.get({ id: userId }) // TODO Isso deve ser uma requisição HTTP para o service de usuários.
    const tokenCard = await this.paymentGateway.tokenizeCard({ user, holderName, number, expiryDate, cvv })
    const card = Card.create({ alias, number: tokenCard.number, brand: tokenCard.brand, token: tokenCard.token, userId }, this.crypto)
    await this.cardRepository.save(card)
    return { cardId: card.id }
  }
}

type Input = {
  alias: string
  holderName: string
  number: string
  expiryDate: string
  cvv: string
  userId: string
}

type Output = {
  cardId: string
}
