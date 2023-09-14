import { makeTokenizeCardUseCase } from '@/main/factories/application/use-cases'
import { TokenizeCardController } from '@/presentation/controllers'

export const makeTokenizeCardController = (): TokenizeCardController => {
  return new TokenizeCardController(makeTokenizeCardUseCase())
}
