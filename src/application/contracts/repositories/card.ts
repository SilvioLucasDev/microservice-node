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
