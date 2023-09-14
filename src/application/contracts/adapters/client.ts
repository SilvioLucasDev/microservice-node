export interface GetClient {
  get: <T = any> (input: GetClient.Input) => Promise<T>
}

export namespace GetClient {
  export type Input = {
    url: string
    headers?: object
    params?: object
  }
}

export interface PostClient {
  post: <T = any> (input: PostClient.Input) => Promise<T>
}

export namespace PostClient {
  export type Input = {
    url: string
    data?: object
    headers?: object
  }
}
