export interface GetClient {
  get: <T = any> (input: GetClient.Input) => Promise<T>
}

export namespace GetClient {
  export type Input = {
    url: string
    params: object
  }
}
