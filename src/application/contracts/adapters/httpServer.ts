export interface On {
  on: (input: On.Input) => void
}

export namespace On {
  export type Input = {
    method: string
    url: string
    callback: (params: any, body: any) => Promise<any>
  }
}

export interface Listen {
  listen: () => void
}
