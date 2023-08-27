export interface On {
  on: (input: On.Input) => void
}

export namespace On {
  export type Input = {
    method: string
    url: string
    callback: (params: object, body: string) => Promise<{ statusCode: number, data: any }>
  }
}

export interface Listen {
  listen: () => void
}
