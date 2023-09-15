export interface OnServer {
  on: (input: OnServer.Input) => void
}

export namespace OnServer {
  export type Input = {
    method: string
    url: string
    callback: (params: object, body: string) => Promise<{ statusCode: number, data: any }>
  }
}

export interface ListenServer {
  listen: () => void
}
