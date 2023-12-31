export interface GetEvent {
  get: (input: GetEvent.Input) => Promise<GetEvent.Output>
}

export namespace GetEvent {
  export type Input = {
    id: string
  }

  export type Output = {
    id: string
    name: string
    price: number
  } | undefined
}
