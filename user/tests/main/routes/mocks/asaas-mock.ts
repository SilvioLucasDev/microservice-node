import { type TokenizeCard } from '@/application/contracts/adapters'

export class AsaasGatewayMock implements TokenizeCard {
  async tokenizeCard (input: TokenizeCard.Input): Promise<TokenizeCard.Output> {
    return { number: 'any_number', brand: 'any_brand', token: 'any_token' }
  }
}
