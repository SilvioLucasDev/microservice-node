import { type Card } from '@/domain/entities'

export interface SaveCard {
  save: (input: SaveCard.Input) => Promise<void>
}

export namespace SaveCard {
  export type Input = Card
}

export interface GetCard {
  get: (input: GetCard.Input) => Promise<GetCard.Output>
}

export namespace GetCard {
  export type Input = {
    id: string
  }

  export type Output = {
    id: string
    alias: string
    token: string
  } | undefined
}
